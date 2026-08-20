import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

import { useForm } from "react-hook-form";

import { useState } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import useArea from "../../../hooks/useArea";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCurrentUser from "../../../hooks/useCurrentUser";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const { districts, upazilas } = useArea();
  const { register, handleSubmit } = useForm();
  const { user, updateUser } = useAuth();
  const [editProfile, setEditProfile] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { currentUser, refetch } = useCurrentUser();

  const onSubmit = async (data) => {
    const name = data.name;
    const bloodGroup = data.group;
    const upazila = data.upazila;
    const district = data.district;
    const imageFile = { image: data.image[0] };

    // post the image in image bb

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const avatar = res.data.data.display_url;
      updateUser(name, avatar);
      const updatedProfile = {
        name,
        bloodGroup,
        upazila,
        district,
        avatar,
      };

      const result = await axiosSecure.patch(
        `/user?email=${user?.email}`,
        updatedProfile
      );

      if (result.data.modifiedCount > 0) {
        refetch();
        setEditProfile(false);
        toast.success("Profile Updated", {
          position: "bottom-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  const loggedInUser = currentUser[0];

  return (
    <div>
      <Helmet>
        <title>LifeFlowDonor | Profile</title>
      </Helmet>
      <div>
        <div>
          <div className="flex flex-col md:flex-row gap-10">
            <div>
              <img
                src={loggedInUser?.avatarImage || user?.photoURL}
                alt="Avatar"
                style={{ maxWidth: "150px" }}
              />
            </div>
            <div className="pt-5 text-black">
              <h2 className="text-2xl font-semibold">
                Name: {loggedInUser?.name || user?.displayName}
              </h2>
              <p className="text-xl font-semibold">
                Email: {loggedInUser?.email || user?.email}
              </p>
              <p className="text-red-400 font-semibold">
                Blood Group: {loggedInUser?.bloodGroup}
              </p>
              <p className="font-semibold">Upazila: {loggedInUser?.upazila}</p>
              <p className="font-semibold">
                District: {loggedInUser?.district}
              </p>
              <p className="font-semibold">
                Status:{" "}
                <span
                  style={
                    loggedInUser?.status === "active"
                      ? { color: "black" }
                      : { color: "red" }
                  }
                >
                  {" "}
                  {loggedInUser?.status}
                </span>
              </p>
              <p className="font-semibold">Role: {loggedInUser?.role}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleEditProfile}
        className=" py-2 px-2 rounded-md transition delay-200 bg-red-800 hover:bg-slate-700 text-white mt-5"
      >
        {editProfile ? "Cancel" : "Edit Profile"}
      </button>
      {/* update profile section */}
      {editProfile && (
        <section className="mt-4 ">
          {currentUser.map((user) => (
            <div key={user._id}>
              <div className="bg-[#8B0000] shadow-lg px-3 rounded-md text-sm">
                <div className="p-2 py-6">
                  <h3 className="text-2xl  mb-2 text-center font-bold text-white">
                    Update your profile
                  </h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-sm font-semibold mb-1 text-white">
                      Name*
                    </p>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      defaultValue={user.name}
                      className=" py-2 px-2 rounded-md  input-bordered md:w-1/2"
                    />

                    <p className="text-sm font-semibold mt-5 mb-1 text-white">
                      Your Photo*
                    </p>

                    <input
                      {...register("image", { required: true })}
                      type="file"
                      className="file-input border-0 file-input-bordered file-input-sm w-full mb-4 max-w-xs"
                    />
                    <div className="flex gap-10 my-5">
                      <div className="md:w-1/2">
                        <p className="text-sm font-semibold mb-1 text-white">
                          Blood Group*
                        </p>
                        <select
                          defaultValue={user.group}
                          {...register("group", { required: true })}
                          className="py-2 px-2 rounded-md  select-bordered w-full"
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
                          defaultValue={user.upazila}
                          {...register("upazila", { required: true })}
                          className="py-2 px-2 rounded-md select-bordered w-full"
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
                          defaultValue={user.district}
                          {...register("district", { required: true })}
                          className="py-2 px-2 rounded-md  select-bordered w-full"
                        >
                          {districts.map((option, index) => (
                            <option key={index} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <br />
                    <button
                      type="submit"
                      className="text-red-500 shadow-lg px-2 py-1 rounded-md transition delay-200 bg-white border-0 mb-2 hover:bg-[#147C72] hover:text-white"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Profile;
