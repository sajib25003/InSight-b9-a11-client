import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";

const UpdateProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
      } = useForm();

    const onSubmit = (data) => {
        // console.log(data);
        const {name, photoURL} = data;
        updateUserProfile(name, photoURL)
            .then((previousUser)=>{
              window.location.reload();
                return {...previousUser, displayName: name, photoURL: photoURL}
            })
            .catch(error=>console.error(error))
        // console.log(name, photoURL);

      }
    
    return (
        <div className=" py-6 md:py-20 bg-base-200">
          <Helmet>
            <title>InSight | Profile</title>
          </Helmet>
        <div className="hero-content mx-auto flex-col space-y-2">
          <div className="card shrink-0 w-5/6 lg:w-3/5 shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={user.displayName}
                  placeholder="Name"
                  className="input input-bordered w-full"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  defaultValue={user.photoURL}
                  placeholder="Photo URL"
                  className="input input-bordered w-full"
                  {...register("photoURL")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">E-mail</span>
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="input input-bordered w-full"
                  {...register("email")}
                  disabled={true}
                />
              </div>
              <input
                  className="btn bg-gray-700 text-white font-bold w-full"
                  type="submit"
                  value="Update"
                />
            </form>
            {/* {
                regError ? (notifyError) : (notifySuccess)
            } */}
          </div>
        </div>
      </div>

    );
};

export default UpdateProfile;