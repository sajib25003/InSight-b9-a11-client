import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AddBlog from "../Pages/AddBlog/AddBlog";
import AllBlogs from "../Pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../Pages/FeaturedBlogs/FeaturedBlogs";
import WishList from "../Pages/WishList/WishList";
import ViewBlog from "../Pages/AllBlogs/ViewBlog";
import PrivateRoutes from "./PrivateRoutes";
import UpdateBlog from "../Pages/AllBlogs/UpdateBlog";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/updateProfile",
        element: <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>,
      },
      {
        path: "/addBlog",
        element: <PrivateRoutes><AddBlog></AddBlog></PrivateRoutes>,
      },
      {
        path: "/allBlogs",
        element: <AllBlogs></AllBlogs>,
      },
      {
        path: "/wishlist",
        element: <PrivateRoutes><WishList></WishList></PrivateRoutes>,
      },
      {
        path: "/featured",
        element: <FeaturedBlogs></FeaturedBlogs>,
      },
      {
        path: "/blogs/:id",
        element: (
          <PrivateRoutes>
            <ViewBlog></ViewBlog>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`https://insight-b9-a11-server.vercel.app/blogs/${params.id}`),
      },
      {
        path: "/updateBlog/:id",
        element: <PrivateRoutes><UpdateBlog></UpdateBlog></PrivateRoutes>,
        loader: ({ params }) =>
            fetch(`https://insight-b9-a11-server.vercel.app/blogs/${params.id}`),
      }
    ],
  },
]);

export default router;
