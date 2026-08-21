import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic.js";
import useCurrentUser from "../../../hooks/useCurrentUser.js";
import "./All.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";

const AllBgRequests = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data: allRequests = [], refetch } = useQuery({
    queryKey: ["all-requests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/request");
      return res.data;
    },
  });

  const [status, setStatus] = useState("");

  const { currentUser } = useCurrentUser();

  const handleCancel = async (id) => {
    //
    const data = {
      donationStatus: "canceled",
    };
    const res = await axiosSecure.patch(`/cancel/${id}`, data);
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };

  const handleDone = async (id) => {
    // console.log("done btn clicked");
    const data = {
      donationStatus: "done",
    };
    const res = await axiosSecure.patch(`/done/${id}`, data);
    // console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };

  const handleDelete = (id) => {
    // console.log("delete this", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const rest = await axiosSecure.delete(`/request/${id}`);

        if (rest.data.deletedCount > 0) {
          // console
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  const filteredRequest = allRequests.filter(
    (request) => status === "" || request.donationStatus === status
  );

  return (
    <div className="w-full mt-5">
      <Helmet>
        <title>LifeFlowDonor |All Requests</title>
      </Helmet>
      <div className="mb-10 MuiBox-root">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
          <option value="inprogress">In progress</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th> Recipient Name</th>
              <th>Required B.G.</th>
              <th> Location</th>

              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Donation Status</th>
              <th>Donor Name</th>
              <th>Donor Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequest.map((request, index) => (
              <tr key={request._id}>
                <th>{index + 1}</th>
                <td>{request.recipientName}</td>
                <td>{request.requiredBloodGroup}</td>
                <td>
                  {request.upazila},{request.district}
                </td>
                <td>{request.donationDate}</td>
                <td>{request.donationTime}</td>
                <td>{request.donationStatus}</td>
                <td>
                  {request?.donationStatus === "inprogress" ? (
                    <>{request.donorName}</>
                  ) : (
                    <>{request.donorName || "None"}</>
                  )}
                </td>
                <td>
                  {request?.donationStatus === "inprogress" ? (
                    <>{request.donorEmail}</>
                  ) : (
                    <>{request.donorEmail || "None"}</>
                  )}
                </td>
                <td>
                  <div className="flex gap-5">
                    <button
                      onClick={() => handleDone(request._id)}
                      className="btn btn-xs"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => handleCancel(request._id)}
                      className="btn btn-xs "
                    >
                      Cancel
                    </button>
                  </div>
                </td>
                {currentUser[0]?.role === "admin" && (
                  <td className="flex gap-3">
                    <Link to={`/dashboard/update/${request._id}`}>
                      {" "}
                      <button className="btn btn-xs">Edit</button>
                    </Link>

                    <button
                      onClick={() => handleDelete(request._id)}
                      className="btn btn-xs"
                    >
                      delete
                    </button>
                  </td>
                )}
                <td>
                  {" "}
                  <Link to={`/dashboard/details/${request._id}`}>
                    <button className="btn btn-xs">view</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBgRequests;
