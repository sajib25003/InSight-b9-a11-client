import Slider from "./Slider";
import "../../App.css";
import Newsletter from "./Newsletter";
import RecentBlog from "./RecentBlog";
import { Typewriter } from "react-simple-typewriter";
import Faqs from "../../Components/Faqs/Faqs";
import TopContributors from "../../Components/TopContributors/TopContributors";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>InSight | Home</title>
      </Helmet>
      <Slider></Slider>
      <div>
        <RecentBlog></RecentBlog>
      </div>

      {/* extra section-1: Top Contributors */}

      <TopContributors></TopContributors>


      {/* extra section-2: FAQs */}
      <div className="text-center mx-10 lg:mx-24 mb-6 flex-col space-y-2">
        <h1 className=" text-2xl md:text-3xl lg:text-5xl font-bold text-blue-700 text-center ">
        <Typewriter
          words={["FAQs", "FAQs"]}
          loop={1000}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      </div>

      <Faqs></Faqs>
      <Newsletter></Newsletter>

    </div>
  );
};

export default Home;
