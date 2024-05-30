import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Hourglass } from "react-loader-spinner";
import { Typewriter } from "react-simple-typewriter";
import defaultUserImage from "../../../public/default.png";

const FeaturedBlogs = () => {
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

  blogs.sort((a, b) => b.longDescription.length - a.longDescription.length);

  const top10Blogs = blogs.slice(0, 10);

  return (
    <div className="mx-3 lg:mx-28">
      <Helmet>
        <title>InSight | Featured Blogs</title>
      </Helmet>
      <h2 className=" text-2xl md:text-3xl lg:text-5xl font-bold text-blue-700 text-center my-3 lg:mt-10">
        <Typewriter
          words={["Featured Blogs", "Featured Blogs"]}
          loop={50}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>
      {/* featured table */}
      <div className="overflow-x-auto  lg:mx-28 my-6">
        <table className="table ">
          {/* head */}
          <thead className="text-center">
            <tr>
              <th>Sl.</th>
              <th className=" text-left">Blog Title</th>
              <th>Author</th>
              <th>Author Image</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {top10Blogs.map((blog, idx) => (
              <tr key={blog._id}>
                <th>{idx + 1}</th>
                <td className=" text-left">{blog.title}</td>
                <td>{blog.name}</td>
                <td className="flex justify-center">
                  <img
                    className="w-10 h-10 rounded-full bg-white"
                    src={blog?.authorPhotoURL || defaultUserImage}
                    alt=""
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
