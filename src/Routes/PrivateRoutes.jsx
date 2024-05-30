import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "../Firebase/Provider/AuthProvider";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location);
  
    if (loading) {
      return (
        <div className=" flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner loading-lg  text-warning"></span>
        </div>
      );
    }
  
    if (user) {
      return children;
    }
  
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  };
  
  
  PrivateRoutes.propTypes = {
    children: PropTypes.node
  };
  
export default PrivateRoutes;