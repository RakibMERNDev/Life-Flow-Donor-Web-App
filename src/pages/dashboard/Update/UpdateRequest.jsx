
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useArea from "../../../hooks/useArea";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useParticularRequest from "../../../hooks/useParticularRequest";
import { Helmet } from "react-helmet";

const UpdateRequest = () => {
  const params = useParams();
  const axiosPublic = useAxiosPublic();

  const { register, handleSubmit, reset } = useForm();
  const { districts, upazilas } = useArea();
  const {requests,refetch} = useParticularRequest();


  const onSubmit = async (data) => {

    const recipientName = data.name;
    const requiredBloodGroup = data.requiredGroup;
    const upazila = data.upazila;
    const district = data.district;
    const hospitalName = data.hospital;
    const fullAddress = data.address;
    const donationDate = data.donationDate;
    const donationTime = data.donationTime;
    const message = data.details;

    const updatedData = {
      recipientName,
      requiredBloodGroup,
      upazila,
      district,
      hospitalName,
      fullAddress,
      donationDate,
      donationTime,
      message,
    };


    const res = await axiosPublic.patch(`/request/${params.id}`, updatedData);
    // console.log(res.data);
    if (res.data.modifiedCount > 0) {
        refetch();
      reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Request updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <Helmet>
      <title>Blood Donation | Update</title>
    </Helmet>
      <section>
        <div className="bg-violet-500 shadow-lg">
          <div className="p-4">
            <h3 className="text-xl lg:text-3xl mb-1 text-center font-bold text-white">
              Update the Request
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-sm font-semibold mb-1 mt-1 text-white">
                Recipient Name*
              </p>
              <input
                {...register("name", { required: true })}
                type="text"
                defaultValue={requests.recipientName}
                className="input input-bordered md:w-1/2"
              />

              <div className="flex gap-10 my-5">
                <div className="md:w-1/2">
                  <p className="text-sm font-semibold mb-1 text-white">
                    Required Blood Group*
                  </p>
                  <select
                    defaultValue={requests.requiredBloodGroup}
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
                  <p className="text-sm font-semibold mb-1 text-white">
                    Upazila*
                  </p>
                  <select
                    defaultValue={requests.upazila}
                    {...register("upazila", { required: true })}
                    className="select select-bordered w-full"
                  >
                    {upazilas.map((option, index) => (
                      <option key={index} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:w-1/2">
                  <p className="text-sm font-semibold mb-1 text-white">
                    District*
                  </p>
                  <select
                    defaultValue={requests.district}
                    {...register("district", { required: true })}
                    className="select select-bordered w-full"
                  >
                    {districts.map((option, index) => (
                      <option key={index} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-sm font-semibold mb-1 mt-4 text-white">
                Hospital Name*
              </p>
              <input
                defaultValue={requests.hospitalName}
                {...register("hospital", { required: true })}
                type="text"
                className="input input-bordered md:w-1/2"
              />
              <br />
              <p className="text-sm font-semibold mb-1 mt-4 text-white">
                Full Address*
              </p>
              <input
                defaultValue={requests.fullAddress}
                {...register("address", { required: true })}
                type="text"
                className="input input-bordered md:w-1/2"
              />
              <br />
              <p className="text-sm font-semibold mb-1 mt-4 text-white">
                Donation Date*
              </p>
              <input
                defaultValue={requests.donationDate}
                {...register("donationDate", { required: true })}
                type="date"
                className="input input-bordered md:w-1/2"
              />

              <br />
              <p className="text-sm font-semibold mb-1 mt-4 text-white">
                Donation Time*
              </p>
              <input
                defaultValue={requests.donationTime}
                {...register("donationTime", { required: true })}
                type="time"
                className="input input-bordered md:w-1/2"
              />
              <br />
              <p className="text-sm font-semibold mb-1 mt-4 text-white">
                Request message*
              </p>
              <textarea
                defaultValue={requests.message}
                {...register("details", { required: true })}
                type="text"
                className="input input-bordered md:w-1/2"
              ></textarea>
              <br />
              <button
                type="submit"
                className="text-violet-500 shadow-lg btn bg-white border-0 mb-2 mt-2 hover:bg-green-500 hover:text-white"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateRequest;
