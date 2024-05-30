import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";
import axios from "axios";

const Login = () => {
  const { signIn, googleSignInUser, githubSignInUser, setLoading } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

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
    } else if (!/^(?=.*[!@#$%^&*]).{6,}$/.test(password)) {
      toast.error("Password must contain at least one special character");
      return;
    } else if (!/^(?=.*[0-9]).{6,}$/.test(password)) {
      toast.error("Password must contain at least one numeric character");
      return;
    }

    // console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        const user = { email };
        toast.success(`Logged In Successfully`);
        // get access token
        axios
          .post("https://insight-b9-a11-server.vercel.app/jwt", user, { withCredentials: true })
          .then((res) => {
            // console.log(res.data);
            if (res.data.success) {
              setTimeout(
                () => navigate(location?.state ? location.state : "/"),
                1000
              );
            }
          });
      })
      .catch((error) => {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/invalid-credential"
        ) {
          // If user not found or wrong password error, redirect to login page
          toast.error(error.message);
          setLoading(false);
          navigate("/login");
        } else {
          toast.error(error.message);
        }
      });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    googleSignInUser()
      .then(() => {
        toast.success(`Logged In Successfully`);
        setTimeout(
          () => navigate(location?.state ? location.state : "/"),
          1000
        );
      })
      .catch((error) => console.error(error));
  };

  const handleGithubLogin = (e) => {
    e.preventDefault();
    githubSignInUser()
      .then(() => {
        toast.success(`Logged In Successfully`);

        // navigate("/");
        setTimeout(
          () => navigate(location?.state ? location.state : "/"),
          1000
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className=" flex gap-5 bg-orange-50  ">
      <Helmet>
        <title>InSight | Login</title>
      </Helmet>
      <div className="flex-grow  py-4 md:py-14 lg:py-20 ">
        <div className="flex justify-center  items-center mx-3 md:mx-10 lg:mx-auto flex-col space-y-2">
          <h2 className=" text-3xl font-bold">Please Login</h2>
          <div className="card bg-amber-50 shrink-0 w-full ml-5  lg:ml-48  shadow-2xl  ">
            <form onSubmit={handleLogin} className="card-body ">
              <div className="form-control ">
                <label className="label">
                  <span className="label-text text-black font-semibold">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  required
                  name="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-semibold">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={!showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full"
                    name="password"
                    required
                  />
                  <span
                    className="absolute top-1/3 right-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                  </span>
                </div>

                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt text-black font-semibold link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn border-white bg-emerald-900 text-white font-bold w-full"
                  type="submit"
                  value="Login"
                />
              </div>
              <p className=" text-base text-black font-semibold">
                New here? Please{" "}
                <Link to="/register" className=" font-bold text-blue-700">
                  Register
                </Link>
              </p>
              <div className="flex flex-row  items-center gap-4">
                <h5 className="hidden md:flex font-semibold text-lg text-black ">
                  Login with{" "}
                </h5>
                <button
                  onClick={handleGoogleLogin}
                  className="btn btn-outline text-base md:text-xl  text-black font-semibold"
                >
                  <FcGoogle /> Google
                </button>
                <button
                  onClick={handleGithubLogin}
                  className="text-black font-semibold  btn btn-outline text-base md:text-xl"
                >
                  <FaGithub /> GitHub
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:justify-center md:items-center">
        <img className=" w-[300px] lg:w-full h-[300px] lg:h-full" src="/lock-1.png" alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
