import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import {  useLoaderData } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";

const UpdateBlog = () => {
  const blog = useLoaderData();
  const { user } = useContext(AuthContext);


  const categories = [
    "Select a category",
    "Food & Cooking",
    "Travel",
    "Health & Fitness",
    "Technology",
    "Wellness",
    "Art & Photography",
    "Self Improvement",
    "Finance",
    "Home & Garden",
    "Writing",
  ];

  const getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime; 
  };

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    title,
    imageURL,
    shortDescription,
    longDescription,
    _id,
  } = blog;

  const onSubmit = (data) => {
    const {
      title,
      imageURL,
      category,
      name,
      email,
      shortDescription,
      longDescription,
      currentTime,
      authorPhotoURL
    } = data;
    const updatedBlog = {
      title,
      imageURL,
      category,
      name,
      email,
      shortDescription,
      longDescription,
      currentTime,
      authorPhotoURL
    };



    fetch(`https://insight-b9-a11-server.vercel.app/blogs/${_id}`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBlog),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Blog Updated Successfully!",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <div className="flex flex-col justify-center mx-10 lg:mx-24">
      <Helmet>
        <title>InSight | Update Blogs</title>
      </Helmet>
      <h2 className=" text-2xl md:text-3xl lg:text-5xl font-bold text-blue-700 text-center my-3 lg:mt-10">
        <Typewriter
          words={["Update Blogs", "Update Blogs"]}
          loop={50}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      <div className="mx-auto mb-10 card shrink-0 w-5/6 lg:w-3/5 shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          {/* Blog Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              defaultValue={title}
              className="input input-bordered w-full"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className=" text-red-300 mt-1">This field is required</span>
            )}
          </div>
          {/* photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              defaultValue={imageURL}
              className="input input-bordered w-full"
              {...register("imageURL")}
            />
            {errors.photoURL && (
              <span className=" text-red-300 mt-1">This field is required</span>
            )}
          </div>
          {/* category */}
          <div className="form-control flex-grow">
            <label className="label">
              <span className="label-text">Select Category</span>
            </label>
            <select
              className="input input-bordered w-full"
              {...register("category", { required: true })}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {errors.category && (
              <span className=" text-red-300 mt-1">This field is required</span>
            )}
          </div>

          {/* Short Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Short Description</span>
            </label>
            <textarea
              placeholder="Short Description"
              defaultValue={shortDescription}
              className="input input-bordered w-full"
              {...register("shortDescription", { required: true })}
              cols="80"
              rows="10"
            ></textarea>

            {errors.shortDescription && (
              <span className=" text-red-300 mt-1">This field is required</span>
            )}
          </div>

          {/* long Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Long Description</span>
            </label>
            <textarea
              placeholder="Long Description"
              defaultValue={longDescription}
              className="input input-bordered w-full"
              {...register("longDescription", { required: true })}
              cols="80"
              rows="40"
            ></textarea>

            {errors.longDescription && (
              <span className=" text-red-300 mt-1">This field is required</span>
            )}
          </div>

          {/* get current time */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Current Time</span>
            </label>
            <input
              type="text"
              defaultValue={getCurrentTime()}
              placeholder="currentTime"
              className="input input-bordered w-full"
              {...register("currentTime", { required: true })}
            />
            {errors.currentTime && (
              <span className=" text-red-300 mt-1">This field is required</span>
            )}
          </div>

          {/* email and name */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
            <div className="form-control flex-grow">
              <input
                type="hidden"
                defaultValue={user.displayName}
                {...register("name")}
              />
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                defaultValue={user.displayName || ""}
                className="input input-bordered w-full "
                {...register("name", { required: true })}
                disabled={true}
              />
              {errors.name && (
                <span className=" text-red-300 mt-1">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control flex-grow">
              <input
                type="hidden"
                defaultValue={user.email}
                {...register("email")}
              />
              <label className="label">
                <span className="label-text">E-mail</span>
              </label>
              <input
                type="email"
                defaultValue={user.email}
                className="input input-bordered w-full "
                {...register("email", { required: true })}
                disabled={true}
              />
              {errors.email && (
                <span className=" text-red-300 mt-1">
                  This field is required
                </span>
              )}
            </div>
          </div>
          {/* Author photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Author Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Author Photo URL"
              defaultValue={user?.photoURL}
              className="input input-bordered w-full"
              {...register("authorPhotoURL")}
            />
            {errors.authorPhotoURL && (
              <span className=" text-red-300 mt-1">This field is required</span>
            )}
          </div>

          {/* submit button */}
          <input
            className="btn bg-black border-white my-6 text-white font-bold w-full"
            type="submit"
            value="Update Blog"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
