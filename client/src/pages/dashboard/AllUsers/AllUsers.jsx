import { useState } from "react";
import Swal from "sweetalert2";

import { AiOutlineDelete } from "react-icons/ai";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import useUsers from "../../../hooks/useUsers.js";

const AllUsers = () => {
  const { users, refetch } = useUsers();

  const [status, setStatus] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleBlock = async (id) => {
    const res = await axiosSecure.patch(`/users/block/${id}`);

    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "user has been blocked",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleActive = async (id) => {
    const res = await axiosSecure.patch(`/users/active/${id}`);

    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "user has been unblocked",
        showConfirmButton: false,
        icon: "success",
        timer: 1500,
      });
    }
  };

  const handleVolunteer = (id) => {
    Swal.fire({
      title: "Do you want to make this user a volunteer?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/volunteer/${id}`);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "user has been added as a volunteer",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const handleAdmin = (id) => {
    Swal.fire({
      title: "Do you want to make this user an admin?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/admin/${id}`);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "user has been added as an admin",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const handleUserDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/user/delete/${id}`);
        // console.log(res.data)
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "user has been deleted",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const filteredUsers = users.filter(
    (user) => status === "" || user.status === status,
  );
  // console.log(filteredUsers)

  return (
    <div>
      <h3 className="mt-10 mb-10 text-2xl font-bold text-center">All Users</h3>
      <div className="mb-10">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user?.avatarImage} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">
                        {user?.upazila},{user?.district}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user?.email}</td>
                <td>{user.status}</td>

                <td>{user.role}</td>
                {user.status === "active" && (
                  <td>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleBlock(user._id)}
                    >
                      Block User
                    </button>
                  </td>
                )}
                {user.status === "blocked" && (
                  <td>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleActive(user._id)}
                    >
                      Unblock User
                    </button>
                  </td>
                )}

                <td>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleVolunteer(user._id)}
                  >
                    Make Volunteer
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleAdmin(user._id)}
                  >
                    Make Admin
                  </button>
                </td>

                <td
                  onClick={() => handleUserDelete(user._id)}
                  className="btn btn-md text-xl hover:bg-[#8B0000] mt-5"
                >
                  <AiOutlineDelete />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
