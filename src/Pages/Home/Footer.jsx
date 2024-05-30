import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" flex flex-col items-center justify-center text-center py-6 gap-3 bg-black text-white">
        <div className="flex gap-4 items-center">
        <img className="h-[30px] md:h-[40px]" src="insight-rb.png" alt="" />
        <h3 className="text-xl md:text-3xl font-bold text-white">In<span className=" text-orange-500">S</span>ight</h3>
        </div>
        
        <p className=" text-sm md:text-base font-medium">Copyright © 2024 - All right reserved</p>
        <div className="flex gap-4 text-base md:text-xl">
            <Link className=" hover:scale-150">
              <FaFacebook></FaFacebook>
            </Link>
            <Link className=" hover:scale-150">
              <FaTwitter></FaTwitter>
            </Link>
            <Link className=" hover:scale-150">
              <FaInstagram></FaInstagram>
            </Link>
          </div>
    </footer>
  );
};

export default Footer;
