import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useShowBlogs = () => {
    const axiosPublic = useAxiosPublic();

    const { data: blogs = [], refetch, isLoading } = useQuery({
      queryKey: ["blogs"],
      queryFn: async () => {
        const res = await axiosPublic.get("/showBlogs");
        return res.data;
      },
    });
    return { blogs, refetch, isLoading };
};

export default useShowBlogs;

