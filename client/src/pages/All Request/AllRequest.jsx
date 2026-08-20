import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import Skeleton from "@mui/material/Skeleton";
import useAxiosPublic from "../../hooks/useAxiosPublic";

import { useState } from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const AllRequest = () => {
  const axiosPublic = useAxiosPublic();
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/request");
      return res.data;
    },
  });

  const [selectedFilter, setSelectedFilter] = useState("");

  const filteredRequests =
    selectedFilter === ""
      ? requests
      : requests.filter((request) => request.donationStatus === selectedFilter);

  const handleSelect = (e) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div className="max-w-screen-xl mx-auto my-10 border rounded-md">
      <Helmet>
        <title>LifeFlowDonor | All</title>
      </Helmet>

      <div className="text-black text-sm">
        <div className="flex flex-col md:flex-row justify-around items-center gap-5">
          <h3 className="text-xl font-semibold text-center py-10">
            All Requests
          </h3>
          <div className="mb-5 md:mb-0">
            <select
              name="select-request"
              onChange={handleSelect}
              className="py-1 px-1 rounded-md border w-full max-w-xs md:w-auto bg-[#8B0000] text-white"
            >
              <option value="">All</option>
              <option value="inprogress">Inprogress</option>
              <option value="canceled">Canceled</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-xs mb-7 w-full">
            <thead>
              <>
                {isLoading ? (
                  <Skeleton
                    width="100%"
                    height={30}
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                  />
                ) : (
                  <>
                    <tr className="text-black">
                      <th>No</th>
                      <th>Recipient Name</th>
                      <th>Require Blood Group</th>
                      <th>Location</th>
                      <th>Donation Date</th>
                      <th>Donation Time</th>
                      <th>Donation Status</th>
                    </tr>
                  </>
                )}
              </>
            </thead>
            <tbody>
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <>
                  {filteredRequests.map((request, index) => (
                    <tr key={request._id}>
                      <th>{index + 1}</th>
                      <td>{request.recipientName}</td>
                      <td>{request.requiredBloodGroup}</td>
                      <td>
                        {request.upazila}, {request.district}
                      </td>
                      <td>{request.donationDate}</td>
                      <td>{request.donationTime}</td>
                      <td>{request.donationStatus}</td>

                      <Link to={`/dashboard/details/${request._id}`}></Link>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllRequest;
