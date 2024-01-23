import { Link } from "react-router-dom";
import chair from "../assets/img/3d-models/chair11.glb";
import chairUsdz from "../assets/img/3d-models/chair.usdz";

const LandingHero = () => {
  return (
    <>
      <div className="landing" id="hero">
        {/* <!-- ======= Hero Section ======= --> */}
        <section id="hero" className="hero d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up">
                  Visualize 3D models of products before making a purchase
                  decision
                </h1>
                <h2 data-aos="fade-up" data-aos-delay="400">
                  Real-time product visualization system that allows users to
                  seamlessly explore and customize 3D models of products before
                  making a purchase decision.
                </h2>
                <div data-aos="fade-up" data-aos-delay="600">
                  <div className="text-center text-lg-start">
                    <Link
                      to="/login"
                      className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <span>Get Started</span>
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-6 hero-img"
                data-aos="zoom-out"
                data-aos-delay="200"
              >
                {/* <img src={hero} className="img-fluid" alt="" /> */}
                <model-viewer
                  className="viewer"
                  style={{
                    height: "470px",
                    width: "100%",
                    backgroundColor: "#17171A!important",
                  }}
                  src={chair}
                  ios-src={chairUsdz}
                  ar
                  alt="A 3D model of a chair"
                  camera-orbit="-90deg"
                  auto-rotate=""
                  camera-controls=""
                  background-color="#455A64"
                ></model-viewer>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Hero --> */}
      </div>
    </>
  );
};

export default LandingHero;
