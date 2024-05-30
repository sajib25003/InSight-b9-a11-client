import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Hourglass } from "react-loader-spinner";
import { Typewriter } from "react-simple-typewriter";
import BlogCard from "./BlogCard";
import { useState } from "react";

const AllBlogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(null);

  const categories = [
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
  const {
    isPending,
    isError,
    error,
    data: blogs,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("https://insight-b9-a11-server.vercel.app/blogs", {
        credentials: 'include'
      });
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
  // refetch();

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  const filteredBlogsBySearch = searchQuery
    ? filteredBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredBlogs;


  return (
    <div className="flex flex-col justify-center mx-3 lg:mx-24">
      <Helmet>
        <title>InSight | All Blogs</title>
      </Helmet>
      <h2 className=" text-2xl md:text-3xl lg:text-5xl font-bold text-blue-700 text-center mt-3 lg:mt-10">
        <Typewriter
          words={["All Blogs", "All Blogs"]}
          loop={50}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      <div className="flex flex-col md:flex-row-reverse justify-center gap-6 lg:mx-32 mt-6">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search blogs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="my-3 px-2 flex-grow py-1 bg-rose-50 border-2 border-emerald-700 rounded-md focus:outline-none focus:border-blue-500"
        />

        {/* Filter dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="my-3 px-2 btn flex-grow lg:w-1/4 mx-auto bg-emerald-900 text-white text-xl font-bold"
        >
          <option value="All">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 mx-2 lg:mx-24 gap-8 my-3 lg:my-10">
        {filteredBlogsBySearch.map((blog) => (
          <BlogCard key={blog._id} blog={blog}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
