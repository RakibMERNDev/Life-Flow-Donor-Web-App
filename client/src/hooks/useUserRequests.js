import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

import useAxiosSecure from "./useAxiosSecure";


const useUserRequests = () => {
    const {user} = useAuth();

    const axiosSecure = useAxiosSecure();
    const url = `/currentUserRequests?email=${user?.email}`;
    const {data :requests=[],refetch} = useQuery({
        queryKey: ['requests',user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(url)
            return res.data;
        }
    })
    // console.log(requests)
    const sortedRequest = requests.sort((a, b) => new Date(b.requestTime) - new Date(a.requestTime));
   

    return {requests,sortedRequest,refetch}
};

export default useUserRequests;