import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import useAuth from "../../hooks/useAuth.js";
import useAxiosSecure from "../../hooks/useAxiosSecure.js";

const CheckoutFrom = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  const axiosSecure = useAxiosSecure();

  const [transaction, setTransaction] = useState();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(0);
  const [customPrice, setCustomPrice] = useState(0);

  const options = [5, 10, 20, 50, 100];
  const totalDonation = selectedOption > 0 ? selectedOption : customPrice;

  useEffect(() => {
    if (totalDonation > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalDonation })
        .then((res) => {
          // console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalDonation]);

  const handleSelectChange = (event) => {
    setSelectedOption(Number(event.target.value));
    setCustomPrice(0);
  };

  const handleCustomPriceChange = (event) => {
    setSelectedOption(0);
    setCustomPrice(Number(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      // console.log(confirmError, "confirm error");
      Swal.fire({
        icon: "error",
        title: `${confirmError.message}`,
      });
    } else {
      // console.log(paymentIntent, "payment intent");
      if (paymentIntent.status === "succeeded") {
        // console.log("transaction id", paymentIntent.id);
        setTransaction(paymentMethod.id);

        //  now save the payment in the database
        const payment = {
          email: user.email,
          transactionId: paymentIntent.id,
          price: totalDonation,
          date: new Date(), // utc date convert. use moment js to
        };

        const res = await axiosSecure.post("/payments", payment);
        // console.log("payment saved", res.data);

        if (res.data.donationResult.insertedId) {
          //
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Donation successful",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/dashboard/paymentHistory");
          }, 2000);
        }
      }
    }
  };

  return (
    <div className=" bg-slate-100 text-black shadow-lg p-5 mx-auto">
      <div className="mb-10">
        <span className="my-5 text-xl font-bold">
          Select an amount for donation
        </span>
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value={0}>Custom</option>
          {options.map((option) => (
            <option key={option} value={option}>
              ${option}
            </option>
          ))}
        </select>

        {selectedOption === 0 && (
          <>
            {" "}
            <p className="my-2 font-bold">Or enter a custom amount</p>
            <input
              type="number"
              className="input input-bordered mt-2"
              placeholder="Enter custom amount"
              value={customPrice}
              onChange={handleCustomPriceChange}
            />
          </>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#000000",
                },
              },
              invalid: {
                color: "#F2484B",
              },
            },
          }}
        />
        <button
          className="btn btn-sm bg-white text-violet-500 my-5"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        {error && <p className="text-red-400">{error}</p>}
        {transaction && (
          <p className="text-green-600">
            Transaction Successful. Transaction id: {transaction}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutFrom;
