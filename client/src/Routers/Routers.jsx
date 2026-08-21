import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../layout/Dashboard";
import Main from "../layout/Main";
import AllRequest from "../pages/All Request/AllRequest";
import Blogs from "../pages/Blogs/Blogs";
import AddBlog from "../pages/dashboard/AddBlog/AddBlog";
import AdminHome from "../pages/dashboard/AdminHome/AdminHome";
import AllBgRequests from "../pages/dashboard/AllRequest.jsx/AllBgRequests";
import AllUsers from "../pages/dashboard/AllUsers/AllUsers";
import ContentManagement from "../pages/dashboard/Content Management/ContentManagement";
import CreateRequest from "../pages/dashboard/Create Request/CreateRequest";
import DonationHistory from "../pages/dashboard/DonationHistory/DonationHistory";
import DashboardHome from "../pages/dashboard/home/DashboardHome";
import MyRequest from "../pages/dashboard/My Requests/MyRequest";
import Profile from "../pages/dashboard/Profile/Profile";
import BlogDetails from "../pages/dashboard/Request Details/BlogDetails";
import RequestDetails from "../pages/dashboard/Request Details/RequestDetails";
import UpdateRequest from "../pages/dashboard/Update/UpdateRequest";
import Funding from "../pages/Funding/Funding";
import Login from "../pages/Login/Login";
import Payment from "../pages/Payment/Payment";
import Search from "../pages/Search/Search";
import Signup from "../pages/Signup/Signup";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/requests",
        element: <AllRequest></AllRequest>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/details/:id",
        element: <BlogDetails></BlogDetails>,
      },
      {
        path: "/search",
        element: <Search></Search>,
      },
      {
        path: "/funding",
        element: <Funding></Funding>,
      },
      {
        path: "/donate",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/userHome",
        element: <DashboardHome></DashboardHome>,
      },

      {
        path: "/dashboard/paymentHistory",
        element: <DonationHistory></DonationHistory>,
      },

      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: " /dashboard/my-donation-requests",
      },
      {
        path: "/dashboard/create-donation-request",
        element: <CreateRequest></CreateRequest>,
      },
      {
        path: "/dashboard/update/:id",
        element: <UpdateRequest></UpdateRequest>,
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <MyRequest></MyRequest>,
      },
      {
        path: "/dashboard/details/:id",
        element: (
          <PrivateRoute>
            <RequestDetails></RequestDetails>
          </PrivateRoute>
        ),
      },
      // admin related route
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-blood-donation-request",
        element: (
          <AdminRoute>
            <AllBgRequests></AllBgRequests>
          </AdminRoute>
        ),
      },
      {
        path: " /dashboard/content-management",
        element: (
          <AdminRoute>
            <ContentManagement></ContentManagement>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/content-management/add-blog",
        element: (
          <AdminRoute>
            <AddBlog></AddBlog>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default Routers;
