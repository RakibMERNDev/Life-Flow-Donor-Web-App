import { useState } from "react";
import { useForm } from "react-hook-form";
import useArea from "../../hooks/useArea.js";
import useAxiosPublic from "../../hooks/useAxiosPublic.js";

import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import useSearchedUser from "../../hooks/useSearchedUser.js";
import { getDistrictName, getUpazilaName } from "../../lib/getLocationName.js";

const Search = () => {
  const [searchedUser, setSearchedUser] = useState([]);

  const [userNumber, setUserNumber] = useState(false);

  const { users, isLoading } = useSearchedUser();
  const { register, handleSubmit } = useForm();
  const { districts, upazilas, selectedDistrict, setSelectedDistrict } =
    useArea();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    const requestData = {
      bloodGroup: data.bloodGroup,
      upazila: getUpazilaName(data.upazila, upazilas),
      district: getDistrictName(data.district, districts),
    };

    console.log(requestData);
    const res = await axiosPublic.get("/search", { params: requestData });
    if (res.data.length == 0) {
      setUserNumber(true);
    } else {
      setUserNumber(false);
    }
    setSearchedUser(res.data);
  };

  // console.log(searchedUser);

  return (
    <div className="container mx-auto">
      <div className="p-5 bg-violet-500 text-black min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-10 my-5">
            <div className="md:w-1/2">
              <p className="text-sm font-semibold mb-1 text-black">
                Required Blood Group*
              </p>
              <select
                {...register("bloodGroup", { required: true })}
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
              <p className="text-sm font-semibold mb-1 text-black">District*</p>
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
              <p className="text-sm font-semibold mb-1 text-black">Upazila*</p>
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
          <button className="btn bg-white text-violet-500">Search</button>
        </form>
        <div className="my-10">
          {searchedUser.length > 0 ? (
            <div key={searchedUser._id}>
              {searchedUser.map((searched) => (
                <div
                  className="border mt-10 p-4 text-black text-center md:w-1/2 mx-auto"
                  key={searched.id}
                >
                  <h1 className="text-xl">Donor Name: {searched?.name}</h1>
                  <p className="text-base font-semibold">
                    Blood Group : {searched?.bloodGroup}{" "}
                  </p>
                  <p className="text-base font-semibold">
                    Email : {searched?.email}{" "}
                  </p>
                  <p className="text-xl font-semibold ">
                    Address: {searched?.upazila}
                    {searched ? "," : ""}
                    {searched?.district}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <>
              {userNumber && (
                <h2 className="text-center text-black text-2xl font-bold border-2 md:w-1/2 mx-auto py-2 ">
                  Sorry, No user have been found with this criteria
                </h2>
              )}
            </>
          )}
        </div>
        <div>
          <div>
            <h3 className="mt-10 mb-10 text-2xl font-bold text-black text-center">
              All Users
            </h3>
            <div className="overflow-x-auto">
              <table className="table text-black">
                {/* head */}
                <thead className="text-black">
                  {isLoading ? (
                    <Stack>
                      <Skeleton
                        width="100vw"
                        height={30}
                        variant="text"
                        sx={{ fontSize: "1rem" }}
                      />
                    </Stack>
                  ) : (
                    <tr>
                      <th>
                        <label></label>
                      </th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Blood Group</th>
                      <th>Upazila</th>
                      <th>District</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {isLoading ? (
                    <>
                      <Stack>
                        <Skeleton
                          width="100vw"
                          height={30}
                          variant="text"
                          sx={{ fontSize: "1rem" }}
                        />
                      </Stack>{" "}
                      <Stack>
                        <Skeleton
                          width="100vw"
                          height={30}
                          variant="text"
                          sx={{ fontSize: "1rem" }}
                        />
                      </Stack>{" "}
                      <Stack>
                        <Skeleton
                          width="100vw"
                          height={30}
                          variant="text"
                          sx={{ fontSize: "1rem" }}
                        />
                      </Stack>{" "}
                      <Stack>
                        <Skeleton
                          width="100vw"
                          height={30}
                          variant="text"
                          sx={{ fontSize: "1rem" }}
                        />
                      </Stack>
                    </>
                  ) : (
                    <>
                      {users.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-bold">{user?.name}</div>
                              </div>
                            </div>
                          </td>
                          <td>{user?.email}</td>
                          <td>{user?.bloodGroup}</td>

                          <td>{user?.upazila}</td>

                          <td>{user?.district}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
