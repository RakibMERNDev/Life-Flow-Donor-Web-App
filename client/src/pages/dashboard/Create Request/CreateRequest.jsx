import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useArea from "../../../hooks/useArea";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCurrentUser from "../../../hooks/useCurrentUser";

const CreateRequest = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const {
    districts,
    upazilas,
    selectedDistrict,
    setSelectedDistrict,
    isLoading,
  } = useArea();

  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const requestTime = new Date();
    const requester = user?.displayName;
    const requesterEmail = user?.email;
    const donationStatus = "pending";
    const recipientName = data.name;
    const requiredBloodGroup = data.requiredGroup;
    const upazila = data.upazila;
    const district = data.district;
    const hospitalName = data.hospital;
    const fullAddress = data.address;
    const donationDate = data.donationDate;
    const donationTime = data.donationTime;
    const message = data.details;

    const requestData = {
      requester,
      requesterEmail,
      recipientName,
      requiredBloodGroup,
      upazila,
      district,
      hospitalName,
      fullAddress,
      donationDate,
      donationTime,
      message,
      donationStatus,
      requestTime,
    };

    const res = await axiosSecure.post("/request", requestData);
    // console.log(res.data);
    if (res.data.insertedId) {
      reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Request Added",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const { currentUser } = useCurrentUser();
  // console.log(currentUser)
  const status = currentUser[0]?.status;
  // console.log(status)

  return (
    <div>
      <Helmet>
        <title>LifeFlowDonor | Create</title>
      </Helmet>
      <div>
        {status === "blocked" ? (
          <div>
            <h2 className="text-red-500 font-bold text-2xl text-center">
              You Have been Blocked by the admin. You can not create any post
              here
            </h2>
            <h3 className="text-xl pt-5 text-center font-semibold">
              if this is a mistake then please contact us
            </h3>
          </div>
        ) : (
          <section>
            <div className="bg-blue-500 shadow-lg">
              <div className="p-4">
                <h3 className="text-xl lg:text-3xl mb-2 text-center font-bold text-white">
                  Create A request for Donor
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p className="text-xl font-semibold mb-1 text-black">
                    Requester Name : {user?.displayName}
                  </p>

                  <p className="text-xl font-semibold mt-5 mb-1 text-black">
                    Requester Email : {user?.email}
                  </p>
                  <p className="text-sm font-semibold mb-1 mt-5 text-black">
                    Recipient Name*
                  </p>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Recipient Name"
                    className="input input-bordered md:w-1/2"
                  />

                  <div className="flex gap-10 my-5">
                    <div className="md:w-1/2">
                      <p className="text-sm font-semibold mb-1 text-white">
                        Required Blood Group*
                      </p>
                      <select
                        {...register("requiredGroup", { required: true })}
                        className="select select-bordered w-full"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="md:w-1/2">
                      <p className="text-sm font-semibold mb-1 text-black">
                        District*
                      </p>
                      <select
                        {...register("district", { required: true })}
                        className="select select-bordered w-full"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                      >
                        <option>Select Your District</option>
                        {districts.map((district) => (
                          <option key={district._id} value={district.id}>
                            {district.name} ({district.bn_name})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:w-1/2">
                      <p className="text-sm font-semibold mb-1 text-black">
                        Upazila*
                      </p>
                      <select
                        {...register("upazila", { required: true })}
                        className="select select-bordered w-full"
                        disabled={!selectedDistrict || isLoading}
                      >
                        <option>
                          {isLoading
                            ? "⏳ Loading upazilas..."
                            : "-- Choose an Upazila --"}
                        </option>
                        {upazilas.map((upazila) => (
                          <option key={upazila._id} value={upazila.id}>
                            {upazila.name} ({upazila.bn_name})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className="text-sm font-semibold mb-1 mt-4 text-black">
                    Hospital Name*
                  </p>
                  <input
                    {...register("hospital", { required: true })}
                    type="text"
                    className="input input-bordered md:w-1/2"
                  />
                  <br />
                  <p className="text-sm font-semibold mb-1 mt-4 text-black">
                    Full Address*
                  </p>
                  <input
                    {...register("address", { required: true })}
                    type="text"
                    className="input input-bordered md:w-1/2"
                  />
                  <br />
                  <p className="text-sm font-semibold mb-1 mt-4 text-black">
                    Donation Date*
                  </p>
                  <input
                    {...register("donationDate", { required: true })}
                    type="date"
                    className="input input-bordered md:w-1/2"
                  />

                  <br />
                  <p className="text-sm font-semibold mb-1 mt-4 text-black">
                    Donation Time*
                  </p>
                  <input
                    {...register("donationTime", { required: true })}
                    type="time"
                    className="input input-bordered md:w-1/2"
                  />
                  <br />
                  <p className="text-sm font-semibold mb-1 mt-4 text-black">
                    Request message*
                  </p>
                  <textarea
                    placeholder="why do you need blood? Please give us details related it"
                    {...register("details", { required: true })}
                    type="text"
                    className="input input-bordered md:w-1/2"
                  ></textarea>
                  <br />
                  <button
                    type="submit"
                    className="text-blue-500 shadow-lg btn bg-white border-0 mb-2 mt-5 hover:bg-green-500 hover:text-black"
                  >
                    Add A Request
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreateRequest;
