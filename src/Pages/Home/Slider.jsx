// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import "../../index.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Typewriter } from "react-simple-typewriter";

const Slider = () => {
  return (
    <Swiper
      pagination={{
        type: "progressbar",
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper shadow-xl"
    >
      <SwiperSlide>
        <img
          className=" brightness-75  w-full  h-[300px] lg:h-[600px] relative "
          src="/slider-1.jpeg"
          alt=""
        />
        <div className="flex flex-col items-start left-[15%]  absolute top-[30%] md:top-[50%] lg:top-[60%] gap-2  md:gap-6 text-white">
          <h3 className="  font-bold text-lg md:text-2xl lg:text-3xl w-3/4">
            <Typewriter
              words={[
                "Insightful Horizons: Exploring Life's Tapestry",
                "Insightful Horizons: Exploring Life's Tapestry",
              ]}
              loop={50}
              cursor
              cursorStyle="..."
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h3>
          <p className=" font-medium text-sm md:text-base lg:text-lg w-3/4 md:w-2/3 text-left">
            Journey through the kaleidoscope of ideas, experiences, and
            discoveries. Uncover the beauty of diverse perspectives and embark
            on a quest for wisdom and understanding.
          </p>
          <div className="gap-3 hidden md:flex">
            <motion.div
              className="box"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <button className="btn bg-black border-white text-white font-bold">
                Get Started Now
              </button>
            </motion.div>
          </div>
        </div>
      </SwiperSlide>
      {/* slide-2 */}
      <SwiperSlide>
        <img
          className=" brightness-75 w-full h-[300px] lg:h-[600px] relative "
          src="/slider-2.jpeg"
          alt=""
        />
        <div className="flex flex-col items-start left-[15%]  absolute top-[30%] md:top-[50%] lg:top-[60%] gap-2  md:gap-6 text-white">
          <h3 className=" w-3/4 font-bold text-lg md:text-2xl lg:text-3xl">
            <Typewriter
              words={[
                "Insightful Horizons: Exploring Life's Tapestry",
                "Insightful Horizons: Exploring Life's Tapestry",
              ]}
              loop={50}
              cursor
              cursorStyle="..."
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h3>
          <p className=" font-medium text-sm md:text-base lg:text-lg w-3/4 md:w-2/3 text-left">
            Journey through the kaleidoscope of ideas, experiences, and
            discoveries. Uncover the beauty of diverse perspectives and embark
            on a quest for wisdom and understanding.
          </p>
          <div className="gap-3 hidden md:flex">
            <motion.div
              className="box"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <button className="btn bg-black border-white text-white font-bold">
                Get Started Now
              </button>
            </motion.div>
          </div>
        </div>
      </SwiperSlide>

      {/* slide-3 */}
      <SwiperSlide>
        <img
          className=" brightness-75  w-full h-[300px] lg:h-[600px] relative brightness-60 "
          src="/slider-3.jpeg"
          alt=""
        />
        <div className="flex flex-col items-start left-[15%]  absolute top-[30%] md:top-[50%] lg:top-[60%] gap-2  md:gap-6 text-white">
          <h3 className="  font-bold text-lg md:text-2xl lg:text-3xl w-3/4">
            <Typewriter
              words={[
                "Insightful Horizons: Exploring Life's Tapestry",
                "Insightful Horizons: Exploring Life's Tapestry",
              ]}
              loop={50}
              cursor
              cursorStyle="..."
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h3>
          <p className=" font-medium text-sm md:text-base lg:text-lg w-3/4 md:w-2/3 text-left">
            Journey through the kaleidoscope of ideas, experiences, and
            discoveries. Uncover the beauty of diverse perspectives and embark
            on a quest for wisdom and understanding.
          </p>
          <div className="gap-3 hidden md:flex">
            <motion.div
              className="box"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <button className="btn bg-black border-white text-white font-bold">
                Get Started Now
              </button>
            </motion.div>
          </div>
        </div>
      </SwiperSlide>

      {/* slide-4 */}
      <SwiperSlide>
        <img
          className=" brightness-75  w-full h-[300px] lg:h-[600px] relative brightness-60 "
          src="/slider-4.jpeg"
          alt=""
        />
        <div className="flex flex-col items-start left-[15%]  absolute top-[30%] md:top-[50%] lg:top-[60%] gap-2  md:gap-6 text-white">
          <h3 className=" w-3/4 font-bold text-lg md:text-2xl lg:text-3xl">
            <Typewriter
              words={[
                "Insightful Horizons: Exploring Life's Tapestry",
                "Insightful Horizons: Exploring Life's Tapestry",
              ]}
              loop={50}
              cursor
              cursorStyle="..."
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h3>
          <p className=" font-medium text-sm md:text-base lg:text-lg w-3/4 md:w-2/3 text-left">
            Journey through the kaleidoscope of ideas, experiences, and
            discoveries. Uncover the beauty of diverse perspectives and embark
            on a quest for wisdom and understanding.
          </p>
          <div className="gap-3 hidden md:flex">
            <motion.div
              className="box"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <button className="btn bg-black border-white text-white font-bold">
                Get Started Now
              </button>
            </motion.div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
