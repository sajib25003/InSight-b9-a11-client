import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(true);

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, name, photoURL } = data;

    // password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    } else if (!/^(?=.*[A-Z]).{6,}$/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    } else if (!/^(?=.*[a-z]).{6,}$/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        // toast.success(`Account Created Successfully`);
        const user = { name, email };
        fetch("https://insight-b9-a11-server.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.insertedId) {
              Swal.fire({
                title: "Success!",
                text: "User Added Successfully!",
                icon: "success",
                confirmButtonText: "Cool",
              });
            }
          });

        updateUserProfile(name, photoURL)
          .then(() => {
            setTimeout(() => (window.location.href = "/"), 1000);
          })
          .catch((error) => console.error(error));
      })

      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center bg-emerald-50 ">
      <Helmet>
        <title>InSight | Register</title>
      </Helmet>
      <img className=" hidden md:flex ml-36 w-[150px] lg:w-[300px] h-[150px] lg:h-[300px]" src="/img-1.png" alt="" />

      <div className=" flex-grow py-4  text-black ">
        <div className=" hero-content mx-auto flex-col space-y-2">
          <h2 className=" text-black text-3xl font-bold">Please Register</h2>
          <div className="card shrink-0 w-5/6 lg:w-3/5 shadow-2xl bg-emerald-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text   font-semibold">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className=" text-red-300 mt-1">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text   font-semibold">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  className="input input-bordered w-full"
                  {...register("photoURL")}
                />
                {errors.photoURL && (
                  <span className=" text-red-300 mt-1">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text   font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className=" text-red-300 mt-1">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text   font-semibold">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={!showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className=" text-red-300 mt-1">
                      This field is required
                    </span>
                  )}
                  <span
                    className="absolute text-blue-500  top-1/3 right-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <FaEyeSlash></FaEyeSlash>
                    ) : (
                      <FaEye></FaEye>
                    )}
                  </span>
                </div>
              </div>
              <div className="form-control text-black mt-6">
                <div className="flex gap-3 mb-4">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("terms", { required: true })}
                  />
                  <label className=" text-blue-500 font-semibold" htmlFor="terms">
                    Please Read and Accept our{" "}
                    <a className=" text-orange-600" href="#">Terms & Conditions</a>
                  </label>
                </div>
                {errors.terms && (
                  <span className=" text-red-300 mb-2">
                    Please accept our Terms & Condition
                  </span>
                )}

                <input
                  className="btn bg-emerald-900 border-white text-white font-bold w-full"
                  type="submit"
                  value="Register"
                />
              </div>
              <p className=" text-blue-500  ">
                Already have an account? Please{" "}
                <Link to="/login" className=" font-bold text-orange-600">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
