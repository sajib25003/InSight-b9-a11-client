import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Home/NavBar";
import Footer from "../Pages/Home/Footer";

const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;