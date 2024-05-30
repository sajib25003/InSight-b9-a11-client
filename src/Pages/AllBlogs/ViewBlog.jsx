import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import defaultUserImage from "../../../public/default.png";
import { Hourglass } from "react-loader-spinner";
import { Helmet } from "react-helmet-async";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ViewBlog = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);
  const blog = useLoaderData();
  const {
    title,
    imageURL,
    category,
    email,
    shortDescription,
    longDescription,
    _id,
  } = blog;

  const {
    isPending,
    isError,
    error,
    data: comments,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await fetch(
        `https://insight-b9-a11-server.vercel.app/comment?id=${_id}`
      );
      return res.json();
    },
  });

  if (isPending) {
    return (
      <div className=" flex justify-center items-center min-h-screen">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
      </div>
    );
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  // hook form

  const addComment = (data) => {
    const { comment, ratings } = data;
    const commentInfo = {
      id: _id,
      comment: comment,
      email: user.email,
      name: user.displayName,
      image: user.photoURL,
      ratings: parseFloat(ratings),
    };
    
    axios
      .post("https://insight-b9-a11-server.vercel.app/comments", commentInfo)
      .then((data) => {
        if (data.data.insertedId) {
          window.location.reload();
          Swal.fire({
            title: "Success!",
            text: "Thanks for your comment.",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!user) {
    return;
  }

  return (
    <div className="flex flex-col mx-3 md:mx-10 lg:mx-36 my-10 text-center border-2 p-4 rounded-lg bg-base-200 gap-3 justify-start items-start">
      <Helmet>
        <title>InSight | Details</title>
      </Helmet>
      <img
        className=" mx-auto h-[250px] md:h-[400px] lg:h-[500px] rounded-lg"
        src={imageURL}
        alt=""
      />
      <h3 className="flex-grow  text-blue-600 font-bold text-lg lg:text-2xl my-2">
        {title}
      </h3>
      <div className=" flex justify-center w-full md:w-1/2 items-center gap-3 text-left">
        <span className="font-medium">Category: </span>
        <span className="py-3 text-center flex-grow font-semibold rounded-lg bg-slate-300 text-black">
          {category}
        </span>
      </div>
      <div>
        <div className=" flex  flex-col md:flex-row text-left gap-2 ">
          <div>
            <span className="font-medium">Short Description: </span>
          </div>
          <span className="font-semibold  text-blue-600">
            {shortDescription}
          </span>
        </div>
      </div>

      <div className=" flex flex-col lg:flex-row">
        <div className=" flex-grow w-[20%] text-left">
          <span className="font-medium">Full Description: </span>
        </div>

        <span className="flex-grow font-semibold text-left text-blue-600">
          {longDescription}
        </span>
      </div>
      {/* update button */}
      {user.email === email ? (
        <>
          <Link
            to={`/updateBlog/${_id}`}
            className="btn bg-emerald-900 border-white my-6 text-white font-bold w-full"
            type="submit"
            value="Add Tourists Spot"
          >
            Update Blog
          </Link>
          <p className=" text-center w-full font-bold text-red-600 p-4 rounded-lg bg-rose-100">
            You can not comment on your own blog.
          </p>
        </>
      ) : (
        <div className="w-full">
          <form onSubmit={handleSubmit(addComment)} className="card-body">
            {/* Comment section */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Comment here...</span>
              </label>
              <textarea
                placeholder="Write your comment here..."
                className="input input-bordered w-full pt-2 pb-16"
                {...register("comment", { required: true })}
                cols="80"
                rows="20"
              ></textarea>

              {errors.comment && (
                <span className=" text-red-300 mt-1">
                  This field is required
                </span>
              )}
            </div>

            {/* Ratings section */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Ratings:</span>
              </label>
              <input
                type="text"
                placeholder="0 out of 5"
                className="input input-bordered w-1/5 text-center"
                {...register("ratings")}
              />
            </div>

            {/* submit comment button */}
            <input
              className="btn bg-emerald-900 border-white my-2 text-white font-bold w-full"
              type="submit"
              value="Comment"
            />
          </form>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 w-full ">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex gap-3 justify-start items-center"
          >
            <img
              className="w-10 h-10 rounded-full bg-white"
              src={comment?.image || defaultUserImage}
              alt=""
            />
            <div className=" text-left">
              <h3 className="font-semibold text-xl text-emerald-700">
                {comment.name}
              </h3>
              <p className=" text-slate-600">{comment.comment}</p>
              {/* <p className=" text-slate-600">{comment?.ratings}</p> */}
              <Rating
                readOnly
                style={{ maxWidth: 120 }}
                value={comment?.ratings ? comment?.ratings : "0"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBlog;
