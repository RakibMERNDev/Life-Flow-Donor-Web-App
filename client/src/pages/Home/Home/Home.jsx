import { Helmet } from "react-helmet";
import Banner from "../Components/Banner/Banner";
// import Gallery from "../Components/Gallery/Gallery";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>LifeFlowDonor | Home</title>
      </Helmet>
      <div className="">
        <Banner />
      </div>
      
    </div>
  );
};

export default Home;
