import { useQuery } from "@tanstack/react-query";
import { Hourglass } from "react-loader-spinner";
import BlogCard from "../AllBlogs/BlogCard";
import { Typewriter } from "react-simple-typewriter";

const RecentBlog = () => {
  const {
    isPending,
    isError,
    error,
    data: blogs,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("https://insight-b9-a11-server.vercel.app/blogs");
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

  const sortedBlogs = blogs.sort(
    (a, b) => new Date(b.currentTime) - new Date(a.currentTime)
  );

  const recentSixBlogs = sortedBlogs.slice(0, 6);


  return (
    <div className=" py-2 md:py-10">
      <h2 className=" text-2xl md:text-3xl lg:text-5xl font-bold text-blue-700 text-center my-3 lg:mt-10">
        <Typewriter
          words={["Recent Blogs", "Recent Blogs"]}
          loop={50}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-2 md:mx-10 lg:mx-24 gap-3 lg:gap-8 my-3 lg:my-10">
        {recentSixBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default RecentBlog;
