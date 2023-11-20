import "./assets/css/style.css";
import LandingFeature from "./components/feature";
import LandingFooter from "./components/footer";
import LandingHero from "./components/hero";
import Images from "./components/images";
import LandingNavbar from "./components/navbar";
// import LandingPrice from "./components/pricing";

const Home = () => {
  return (
    <>
      <LandingNavbar />
      <LandingHero />
      <LandingFeature />
      {/* <Images /> */}
      <LandingFooter />
    </>
  );
};

export default Home;
