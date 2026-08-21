/* eslint-disable react/no-unescaped-entities */
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import useUserRequests from "../../../hooks/useUserRequests.js";

const DashboardHome = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const { sortedRequest, refetch } = useUserRequests();
  const selectedRequests = sortedRequest.slice(0, 3);

  const handleDone = async (id) => {
    // console.log("done btn clicked");
    const data = {
      donationStatus: "done",
    };
    const res = await axiosSecure.patch(`/done/${id}`, data);
    // console.log(res.data)
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };

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

  const handleDelete = (id) => {
    console.log("delete this", id);
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

  return (
    <div>
      <Helmet>
        <title>LifeFlowDonor | Dashboard</title>
      </Helmet>
      <h1 className="text-2xl font-semibold">Welcome {user?.displayName}</h1>

      {selectedRequests.length !== 0 ? (
        <section className="mt-10">
          <h2 className="text-xl mb-5">Recent Requests</h2>
          {/* 3 recent donation request */}

          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th></th>
                  <th> Recipient Name</th>
                  <th>Require Blood Group</th>
                  <th> Location</th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Donation Status</th>
                  <th>Donor Name</th>
                  <th>Donor Email</th>
                </tr>
              </thead>
              <tbody>
                {selectedRequests.map((request, index) => (
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
                      {request?.donationStatus === "inprogress" &&
                        request?.requesterEmail === user?.email && (
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
                        )}
                    </td>
                    <td className="flex gap-3">
                      {request?.requesterEmail === user?.email && (
                        <Link to={`/dashboard/update/${request._id}`}>
                          {" "}
                          <button className="btn btn-xs">Edit</button>
                        </Link>
                      )}
                      <Link to={`/dashboard/details/${request._id}`}>
                        <button className="btn btn-xs">view</button>
                      </Link>
                      {request?.requesterEmail === user?.email && (
                        <button
                          onClick={() => handleDelete(request._id)}
                          className="btn btn-xs"
                        >
                          delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <h1 className="text-2xl mt-5 ">You haven't created any request yet</h1>
      )}
      <div className="text-center mt-10">
        <Link to="/dashboard/my-donation-requests">
          <button className="btn-outline btn btn-sm mt-5">
            View All Request
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
