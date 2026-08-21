import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    // console.log({content})
    // console.log(data, imageFile);

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      // image url from image bb

      const thumbnail = res.data.data.display_url;
      const blogData = {
        title: data.title,
        image: thumbnail,
        content: { content },
        status: "draft",
        time: new Date(),
      };

      const result = await axiosSecure.post("/addBlog", blogData);
      if (result.data.insertedId) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Blog has been added",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>LifeFlowDonor | Add Blog</title>
      </Helmet>
      <h2 className="text-center text-xl font-bold my-5 text-black">
        Write A Blog
      </h2>
      <div>
        <div className="mb-10 bg-[#8B0000] shadow-lg rounded-md">
          <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-sm font-semibold mb-2 text-black">Title*</p>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="blog title"
                className="input input-bordered md:w-1/2"
              />

              <p className="text-sm font-semibold mt-5 mb-2 text-black">
                Thumbnail Image*
              </p>

              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input border-0 file-input-bordered file-input-sm w-full mb-4 max-w-xs"
              />
              <p className="text-sm font-semibold mt-5 mb-2 text-black">
                Content*
              </p>

              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
              />
              <br />
              <button
                type="submit"
                className="text-red-500 shadow-lg  px-2 py-1 transition delay-500 rounded-md bg-white border-0 mb-5 hover:bg-[#147C72] hover:text-black"
              >
                Add Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
