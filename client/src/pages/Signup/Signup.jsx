import { useForm } from "react-hook-form";

import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useArea from "../../hooks/useArea.js";
import useAuth from "../../hooks/useAuth.js";
import useAxiosPublic from "../../hooks/useAxiosPublic.js";
import { getDistrictName, getUpazilaName } from "../../lib/getLocationName.js";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Signup = () => {
  const {
    districts,
    upazilas,
    isLoading,
    selectedDistrict,
    setSelectedDistrict,
  } = useArea();

  // hooks

  const { signup, updateUser } = useAuth();

  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  // from sublimation operation

  const onSubmit = async (data) => {
    const name = data.name;
    const password = data.password;
    const email = data.email;
    const confirmPassword = data.confirm;
    const bloodGroup = data.group;
    const upazila = getUpazilaName(data.upazila, upazilas);
    const district = getDistrictName(data.district, districts);
    const status = "active";
    const role = "donor";
    const imageFile = { image: data.image[0] };

    console.log(upazila, district);

    if (password !== confirmPassword) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Password and confirmation password do not match",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    // post the image in image bb

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      // image url from image bb

      const avatarImage = res.data.data.display_url;

      // signup user

      signup(email, password)
        .then(async () => {
          // console.log(result.user);
          updateUser(name, avatarImage);
          const userData = {
            name,
            email,
            avatarImage,
            bloodGroup,
            upazila,
            district,
            status,
            role,
          };

          const res = await axiosPublic.post("/user", userData);
          // console.log(res.data);

          if (res.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Registration successful",
              showConfirmButton: false,
              timer: 2000,
            });
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);

          Swal.fire({
            position: "center",
            icon: "error",
            title: "This email is already registered with another account",
            showConfirmButton: false,
            timer: 2000,
          });
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>LifeFlowDonor | Signup</title>
      </Helmet>
      <div className="py-10 px-5 text-sm">
        <div className="md:w-2/4 lg:w-5/12 xl:w-1/4 mx-auto">
          <div className="mb-10 border rounded-md shadow-red-950 shadow-xl">
            <div className="p-4">
              <h3 className="text-2xl mb-4 text-center font-semibold text-black">
                Join us and help us to save lives
              </h3>
              <form className="text-black" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-sm font-semibold mb-2 text-black">Name*</p>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Your Name"
                  className=" py-2 px-2 rounded-md  input-bordered md:w-1/2"
                />
                <p className="text-sm font-semibold mt-5 mb-2 text-black">
                  Email
                </p>
                <input
                  {...register("email", { required: true })}
                  type="text"
                  placeholder="Your Email Address"
                  className=" py-2 px-2 rounded-md  input-bordered md:w-1/2"
                />

                <p className="text-sm font-semibold mt-5 mb-2 text-black">
                  Password
                </p>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className=" py-2 px-2 rounded-md  input-bordered md:w-1/2"
                />
                <p className="text-sm font-semibold mt-5 mb-2 text-black">
                  Confirm Password
                </p>
                <input
                  {...register("confirm", { required: true })}
                  type="password"
                  className=" py-2 px-2 rounded-md  input-bordered md:w-1/2"
                />

                <p className="text-sm font-semibold mt-5 mb-2 text-black">
                  Your Photo*
                </p>

                <input
                  {...register("image", { required: true })}
                  type="file"
                  className="border rounded-md file-input-bordered px-2 py-2 text-black w-1/2 mb-4 max-w-xs"
                />
                <div className="flex gap-10 my-5">
                  <div className="md:w-1/2">
                    <p className="text-sm font-semibold mb-2 text-black">
                      Blood Group*
                    </p>
                    <select
                      defaultValue="default"
                      {...register("group", { required: true })}
                      className="py-2 px-2 rounded-md select-bordered bg-red-800 text-white w-full"
                    >
                      <option disabled value="default">
                        Select Your Blood Group
                      </option>
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

                <br />
                <button
                  type="submit"
                  className="text-red-500 shadow-lg py-1 transition delay-200 px-2 rounded-md bg-white border-0 mb-5 hover:bg-[#147C72] hover:text-black"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-black font-semibold text-xl text-center">
                Already Have an account ?{" "}
                <Link to="/login">
                  <span className="hover:text-blue-500">Log in here</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
