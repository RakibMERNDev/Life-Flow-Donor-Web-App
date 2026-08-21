import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSearchedUser = () => {
    const axiosPublic = useAxiosPublic();
    const { data: users = [], refetch,isLoading } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosPublic.get("/searchedUser");
        return res.data;
      },
    });
    return { users, refetch, isLoading };
  };

export default useSearchedUser;

