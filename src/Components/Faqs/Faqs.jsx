import { Link } from "react-router-dom";

const Faqs = () => {
    return (
      <div className="hero-content gap-10 mx-2 lg:mx-24 mb-10 flex flex-col md:flex-row ">
          <img className="w-1/3" src="/faq-2.png" alt="" />
        <div className="join join-vertical w-full">
          {/* faqs */}
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-lg  md:text-xl font-semibold text-blue-600">
            What is this website about?
            </div>
            <div className="collapse-content">
              <p className=" text-gray-600 font-medium">
              This website is a platform where you can find a wide range of blogs on various topics. Our mission is to provide valuable information and insights through well-written articles.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-lg md:text-xl font-semibold text-blue-600">
            How do I create an account?
            </div>
            <div className="collapse-content">
              <p className=" text-gray-600 font-medium">
              To create an account, click on the <Link to="/register">Sign Up</Link> button at the top right corner of the homepage. Fill in the required information and follow the instructions to complete your registration.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-lg md:text-xl font-semibold text-blue-600">
              Can I customize or tailor a tour to suit my preferences?
            </div>
            <div className="collapse-content">
              <p className=" text-gray-600 font-medium">
              Is it free to use this website?
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Faqs;
  