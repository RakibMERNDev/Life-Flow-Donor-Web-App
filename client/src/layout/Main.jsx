import { Outlet } from "react-router-dom";
import Footer from "../Components/Shared/Footer/Footer";
import Navbar from "../Components/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div className="font-Font-Nunito">
      <Navbar></Navbar>
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
