import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import {
  FaCodePullRequest,
  FaHandHoldingDollar,
  FaUsers,
} from "react-icons/fa6";
import { TbDiscountCheck } from "react-icons/tb";
import useAuth from "../../../hooks/useAuth.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: totalData = {} } = useQuery({
    queryKey: ["totalData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  const { totalDonation } = totalData;
  const total = totalDonation?.reduce(
    (acc, transaction) => acc + transaction.price,
    0,
  );

  return (
    <div>
      <Helmet>
        <title>LifeFlowDonor | Dashboard</title>
      </Helmet>
      <h1 className="text-2xl font-semibold">Welcome {user?.displayName}</h1>
      <div className="mt-10">
        {/* cards */}
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 gap-5 text-black">
          <div className="card md:w-90 bg-blue-500 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">
                {" "}
                Total users <FaUsers className="text-3xl" />
              </h2>
              <p className="text-xl">{totalData.users}</p>
            </div>
          </div>
          <div className="card md:w-90  bg-[#8B0000] shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Total Requests <FaCodePullRequest className="text-3xl" />
              </h2>
              <p className="text-xl">{totalData.requests}</p>
            </div>
          </div>
          <div className="card md:w-90 bg-violet-500 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Total Funding Count <TbDiscountCheck className="text-3xl" />
              </h2>
              <p className="text-xl">{totalData.donationsCount}</p>
            </div>
          </div>
          <div className="card md:w-90 bg-green-500 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Total Funding Collected{" "}
                <FaHandHoldingDollar className="text-3xl" />
              </h2>
              <p className="text-xl">$ {total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
