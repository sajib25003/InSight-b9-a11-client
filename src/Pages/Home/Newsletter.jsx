import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";

const Newsletter = () => {
    const {user} = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Thanks for Subscribing to our newsletter.`);
  };
  return (
    <div className="flex flex-col md:flex-row items-center mx-8 lg:mx-28 ">
      <div className="flex-grow">
        <img className=" w-[200px] md:w-[400px]" src="/newsletter.png" alt="" />
      </div>
      <div className="flex-grow items-center justify-center">
        <form className=" space-y-4">
          <h6 className="font-bold text-lg lg:text-4xl text-emerald-600 uppercase">
            Subscribe to our Newsletter!
          </h6>
          <fieldset className="form-control w-full lg:w-[80%]">
            <div className="join justify-center items-center my-4">
              <input
                type="text"
                placeholder="username@site.com"
                defaultValue={user?.email}
                className="input text-black text-base lg:text-2xl join-item bg-lime-50 border-2 w-full border-black"
              />
              <button
                onClick={handleSubmit}
                className="btn bg-blue-900 text-base lg:text-xl text-white font-bold join-item border-2 border-black "
              >
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Newsletter;
