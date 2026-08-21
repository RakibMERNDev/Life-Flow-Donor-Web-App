import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch,isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });
  return { users, refetch, isLoading };
};

export default useUsers;
