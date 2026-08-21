import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useParticularRequest = () => {
    const params = useParams();
    const axiosSecure = useAxiosSecure();
  const id = params.id;

    
  
    const { data: requests = {},refetch } = useQuery({
      queryKey: ["requests", params.id],
      queryFn: async () => {
        const res = await axiosSecure.get(`/request/${params.id}`);
        return res.data;
      },
    });
  
    return {requests,refetch,id}
};

export default useParticularRequest;