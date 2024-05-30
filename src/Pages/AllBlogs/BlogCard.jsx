import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";
import { motion } from "framer-motion";


const BlogCard = ({ blog }) => {
  const { title, imageURL, category, shortDescription, _id} = blog;
  const {user} = useContext(AuthContext);
  // const { email, displayName} = user;

  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  useEffect(() => {
    // Check if the item is already in the user's wishlist
    const checkIfInWishlist = async () => {
      try {
        const response = await axios.get(`https://insight-b9-a11-server.vercel.app/myWishlist?email=${user?.email}`);
        const wishlistItems = response.data;
        const isItemInWishlist = wishlistItems.some(item => item.title === title);
        setIsAddedToWishlist(isItemInWishlist);
      } catch (error) {
        console.error('Error retrieving wishlist items:', error);
      }
    };

    checkIfInWishlist();
  }, [title, user?.email]);

  const handleAddToWishlist = e => {
    e.preventDefault();
    const email = user?.email;
    const displayName = user?.displayName;
    const wishedBlog = { title, imageURL, category, shortDescription, email, displayName}
    axios.post('https://insight-b9-a11-server.vercel.app/wishlist', wishedBlog)
    .then(data => {
        if (data.data.insertedId) {
                  Swal.fire({
                    title: "Success!",
                    text: "Blog Added to Wishlist Successfully!",
                    icon: "success",
                    confirmButtonText: "Cool",
                  });
                  setIsAddedToWishlist(true);
                }
    })
    .catch(error => {
        console.log(error);
    })
  }

  return (
    <div className="flex flex-col gap-4 border-2 p-4 rounded-lg bg-base-200">
      <img
        className=" h-[150px] md:h-[350px] lg:h-[300px] rounded-lg"
        src={imageURL}
        alt=""
      />
      <h3 className="flex-grow text-left text-blue-600 font-bold text-lg lg:text-2xl my-2">
        {title}
      </h3>
        <div className=" flex justify-center items-center gap-3 text-left">
          <span className="font-medium">Category: </span>
          <span className="py-3 text-center flex-grow font-semibold rounded-lg bg-slate-300 text-black">
            {category}
          </span>
        </div>
        <div className=" flex flex-col md:flex-row gap-2 text-left">
            <div>
            <span className="font-medium">Description: </span>
            </div>
          
          <span className="font-semibold  text-blue-500">
            {shortDescription}
          </span>
        </div>

      <div className=" flex gap-4 justify-center">
      <motion.div
                className="box"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
        <Link
          to={`/blogs/${_id}`}
          className="btn flex-grow mt-2 bg-emerald-900 border-white text-white font-bold "
        >
          View Details
        </Link>
        </motion.div>
        <motion.div
                className="box"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >

        <Link
        onClick={handleAddToWishlist}
        disabled={isAddedToWishlist}
          to={`/wishlist`}
          className="btn flex-grow mt-2 bg-emerald-600 border-white text-white font-bold "
        >
          {isAddedToWishlist ? "Already Added to Wishlist" : "Add to Wishlist"}
        </Link>
        </motion.div>

      </div>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object,
};
export default BlogCard;
