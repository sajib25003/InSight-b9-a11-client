import { useContext } from "react";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";

const AddBlog = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
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
    const newBlog = {
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


    axios
      .post("https://insight-b9-a11-server.vercel.app/blogs", newBlog, {withCredentials: true})
      .then((data) => {
        if (data.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "New Blog Added Successfully!",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    updateUserProfile(name, email)
      .then((previousUser) => {
        // window.location.reload();
        setTimeout(() => window.location.reload(), 1000);
        return { ...previousUser, displayName: name, email: email };
      })
      .catch((error) => console.error(error));
  };

  if (!user) {
    return;
  }

  return (
    <div>
      <Helmet>
        <title>InSight | Add Blogs</title>
      </Helmet>
      <h1 className=" text-2xl md:text-3xl lg:text-5xl font-bold text-blue-700 text-center my-2 md:my-6 lg:my-10">
        <Typewriter
          words={["Add Your Blogs Here", "Add Your Blogs Here"]}
          loop={1000}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      <div className="mx-auto mb-10 card shrink-0 w-5/6 lg:w-3/5 shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          {/* Blog Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
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
              className="input input-bordered w-full"
              {...register("photoURL")}
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
                defaultValue={user ? user.displayName : ""}
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
            value="Add Blog"
          />
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
