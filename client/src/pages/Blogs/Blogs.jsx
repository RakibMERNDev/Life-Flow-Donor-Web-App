import { Helmet } from "react-helmet";

import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import useShowBlogs from "../../hooks/useShowBlogs.js";
import Blog from "./Blog";

const Blogs = () => {
  const { blogs, isLoading } = useShowBlogs();

  return (
    <div className="mb-10">
      <Helmet>
        <title>LifeFlowDonor | Blogs</title>
      </Helmet>
      {isLoading ? (
        <div className=" flex justify-center items-center">
          <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5">
            <Stack>
              <Skeleton
                variant="rectangular"
                width={250}
                animation="wave"
                height={120}
              />
              <Skeleton
                variant="text"
                width={250}
                animation="wave"
                sx={{ fontSize: "1rem" }}
              />
              <Skeleton
                variant="text"
                width={250}
                animation="wave"
                sx={{ fontSize: "1rem" }}
              />
              <Skeleton
                variant="rounded"
                width={250}
                animation="wave"
                height={60}
              />
            </Stack>
            <Stack>
              <Skeleton
                variant="rectangular"
                width={250}
                animation="wave"
                height={120}
              />
              <Skeleton
                variant="text"
                width={250}
                animation="wave"
                sx={{ fontSize: "1rem" }}
              />
              <Skeleton
                variant="text"
                width={250}
                animation="wave"
                sx={{ fontSize: "1rem" }}
              />
              <Skeleton
                variant="rounded"
                width={250}
                animation="wave"
                height={60}
              />
            </Stack>
            <Stack>
              <Skeleton
                variant="rectangular"
                width={250}
                animation="wave"
                height={120}
              />
              <Skeleton
                variant="text"
                width={250}
                animation="wave"
                sx={{ fontSize: "1rem" }}
              />
              <Skeleton
                variant="text"
                width={250}
                animation="wave"
                sx={{ fontSize: "1rem" }}
              />
              <Skeleton
                variant="rounded"
                width={250}
                animation="wave"
                height={60}
              />
            </Stack>
            <Stack>
              <Skeleton
                variant="rectangular"
                width={250}
                animation="wave"
                height={120}
              />
              <Skeleton
                variant="text"
                width={250}
                animation="wave"
                sx={{ fontSize: "1rem" }}
              />
              <Skeleton
                variant="text"
                width={250}
                animation="wave"
                sx={{ fontSize: "1rem" }}
              />
              <Skeleton
                variant="rounded"
                width={250}
                animation="wave"
                height={60}
              />
            </Stack>
          </div>
        </div>
      ) : (
        <div className=" pt-10 text-black min-h-[calc(100vh-224px)] flex flex-col justify-center items-center">
          <h1 className="text-black text-4xl mb-5 font-Font-Play">
            Read about our works
          </h1>
          <div>
            {blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5">
                {blogs.map((blog) => (
                  <Blog key={blog._id} blog={blog}></Blog>
                ))}
              </div>
            ) : (
              <h1 className="text-2xl lg:mt-20 flex justify-center items-center font-bold text-center text-black">
                Blogs have not been published yet
              </h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
