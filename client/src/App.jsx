import { Helmet } from "react-helmet";
import Banner from "./Components/Banner/Banner";


// import Gallery from "../Components/Gallery/Gallery";

const App = () => {
  return (
    <div>
      <Helmet>
        <title>LifeFlowDonor | Home</title>
      </Helmet>
      <Banner />
    </div>
  );
};

export default App;
