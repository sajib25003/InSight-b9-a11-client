import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";
import Swal from "sweetalert2";

const WishList = () => {
    const {user } = useContext(AuthContext);
    const [wishedBlog, setWishedBlog] = useState([]);

    useEffect(() => {
    fetch(`https://insight-b9-a11-server.vercel.app/myWishlist?email=${user?.email}`,{credentials: 'include'})
      .then((res) => res.json())
      .then((data) => {
        setWishedBlog(data);
      });
  }, [user]);

  console.log(wishedBlog);

  const handleDelete = (_id) => {
    // console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://insight-b9-a11-server.vercel.app/myWishlist/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Successfully deleted!",
                icon: "success",
              });
              const remaining = wishedBlog.filter(blg => blg._id !== _id);
              setWishedBlog(remaining);
            }
          });
      }
    });
  };


  return (
    <div className="mb-10 mx-3 md:mx-10">
      <Helmet>
      <title>InSight | Wishlist</title>
    </Helmet>
    <h2 className=" text-2xl md:text-3xl lg:text-5xl font-bold text-blue-700 text-center my-8 lg:mt-10">
    <Typewriter
        words={["My Wishlist","My Wishlist"]}
        loop={50}
        cursor
        cursorStyle="_"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:mx-28">

        {wishedBlog.map((wish) => (
          <div key={wish._id} className="flex">
            <div className="flex flex-grow flex-col  text-left border-2 p-4 rounded-lg bg-base-200 gap-3 justify-start items-start">
              <img
                className="flex-grow mx-auto h-[250px] rounded-lg"
                src={wish.imageURL}
                alt=""
              />
              <div className="flex-grow">
                <h3 className=" flex-grow text-blue-600 font-bold text-lg lg:text-2xl my-2">
                  {wish.title}
                </h3>
              </div>
              <div className="flex-grow gap-10 items-center">
                <span className="font-medium">Category: </span>
                <span className="p-3 font-semibold rounded-lg bg-slate-300 text-black">
                  {wish.category}
                </span>
              </div>
              <div className="flex-grow gap-10 items-center">
                <span className="font-medium">Short Description: </span>
                <span className=" flex-grow font-semibold  text-blue-600">
                  {wish.shortDescription}
                </span>
              </div>

              <Link
                onClick={()=>handleDelete(wish._id)}
                className="btn flex-grow bg-emerald-900 border-white my-2 text-white font-bold w-full"
                type="submit"
                value="Add Tourists Spot"
              >
                Remove Wishlist
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
