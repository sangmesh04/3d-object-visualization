import chair from "../assets/img/3d-models/Table.glb";
import chairUsdz from "../assets/img/3d-models/chair.usdz";

const LandingFeature = () => {
  return (
    <>
      <div className="landing" id="features">
        {/* <!-- ======= Features Section ======= --> */}
        <section id="features" className="features">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <h2>Features</h2>
              <p>
                Some key features of our application that will truly help you!
              </p>
            </header>

            <div className="row">
              <div className="col-lg-6">
                {/* <img src={features} className="img-fluid" alt="" /> */}
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

              <div className="col-lg-6 mt-5 mt-lg-0 d-flex">
                <div className="row align-self-center gy-4">
                  <div
                    className="col-md-6"
                    data-aos="zoom-out"
                    data-aos-delay="200"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>
                        Real-time product visualization with accurate dimensions
                      </h3>
                    </div>
                  </div>

                  <div
                    className="col-md-6"
                    data-aos="zoom-out"
                    data-aos-delay="300"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>AI-powered recommendation system</h3>
                    </div>
                  </div>

                  <div
                    className="col-md-6"
                    data-aos="zoom-out"
                    data-aos-delay="400"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>
                        Comprehensive search filters for enhanced product
                        discovery
                      </h3>
                    </div>
                  </div>

                  <div
                    className="col-md-6"
                    data-aos="zoom-out"
                    data-aos-delay="500"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>
                        Email and in-system notifications for user updates
                      </h3>
                    </div>
                  </div>

                  <div
                    className="col-md-6"
                    data-aos="zoom-out"
                    data-aos-delay="600"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>
                        Inclusive review system for reading and submitting
                        feedback
                      </h3>
                    </div>
                  </div>

                  <div
                    className="col-md-6"
                    data-aos="zoom-out"
                    data-aos-delay="700"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>
                        Website responsiveness across various screen sizes and
                        compatibility with popular web browsers
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- / row --> */}
          </div>
        </section>
        {/* <!-- End Features Section --> */}
      </div>
    </>
  );
};

export default LandingFeature;
