import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import useBlogs from "../../../hooks/useBlogs.js";
import useCurrentUser from "../../../hooks/useCurrentUser.js";

const ContentManagement = () => {
  const [status, setStatus] = useState("");

  const axiosSecure = useAxiosSecure();

  const { blogs, refetch } = useBlogs();

  const { currentUser } = useCurrentUser();

  const filteredBlogs = blogs.filter(
    (blog) => status === "" || blog.status === status,
  );

  const handleDelete = (id) => {
    // console.log(id);
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
        const res = await axiosSecure.delete(`/blogs/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your blog has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  const handlePublish = async (id) => {
    // console.log(id);
    const res = await axiosSecure.patch(`/blogs/${id}`);
    // console.log(res.data)
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your blog has been published",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // const handleUnpublished = async (id)=>{
  //   const res = await  axiosSecure.patch(`/blog/${id}`);
  //   if (res.data.modifiedCount > 0) {
  //     refetch();
  //     Swal.fire({
  //       position: "center",
  //       icon: "success",
  //       title: "Your blog has been unpublished",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   }
  // }

  return (
    <div className="bg-red-400 px-2 py-2 rounded-md">
      <Helmet>
        <title>LifeFlowDonor |Content Management</title>
      </Helmet>

      <div className="flex justify-end">
        <Link to="/dashboard/content-management/add-blog">
          <button className="px-2 py-1 transition hover:bg-yellow-600 bg-[#8B0000] rounded-md text-black">
            Add blog
          </button>
        </Link>
      </div>

      <div className="mb-10">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th> Blog Title</th>
                <th>Status</th>
                {currentUser[0]?.role === "admin" && (
                  <>
                    <th>Action</th>
                    <th>Action</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog, index) => (
                <tr key={blog._id}>
                  <th>{index + 1}</th>

                  <td>{blog.title}</td>
                  <td>{blog.status}</td>
                  {blog.status === "draft" ? (
                    <td>
                      {currentUser[0]?.role === "admin" && (
                        <button
                          onClick={() => handlePublish(blog._id)}
                          className="btn btn-xs"
                        >
                          Publish
                        </button>
                      )}
                    </td>
                  ) : (
                    <td></td>
                  )}
                  {currentUser[0]?.role === "admin" && (
                    <td>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="btn btn-xs"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
