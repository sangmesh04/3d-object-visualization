import chair from "../assets/img/3d-models/Table.glb";
import chairUsdz from "../assets/img/3d-models/chair.usdz";

const LandingFeature = () => {
  return (
    <>
      <div className="landing" id="features">
        {/* <!-- ======= Features Section ======= --> */}
        <section id="features" class="features">
          <div class="container" data-aos="fade-up">
            <header class="section-header">
              <h2>Features</h2>
              <p>
                Some key features of our application that will truly help you!
              </p>
            </header>

            <div class="row">
              <div class="col-lg-6">
                {/* <img src={features} class="img-fluid" alt="" /> */}
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

              <div class="col-lg-6 mt-5 mt-lg-0 d-flex">
                <div class="row align-self-center gy-4">
                  <div
                    class="col-md-6"
                    data-aos="zoom-out"
                    data-aos-delay="200"
                  >
                    <div class="feature-box d-flex align-items-center">
                      <i class="bi bi-check"></i>
                      <h3>
                        Real-time product visualization with accurate dimensions
                      </h3>
                    </div>
                  </div>

                  <div
                    class="col-md-6"
                    data-aos="zoom-out"
                    data-aos-delay="300"
                  >
                    <div class="feature-box d-flex align-items-center">
                      <i class="bi bi-check"></i>
                      <h3>AI-powered recommendation system</h3>
                    </div>
                  </div>

                  <div
                    class="col-md-6"
                    data-aos="zoom-out"
                    data-aos-delay="400"
                  >
                    <div class="feature-box d-flex align-items-center">
                      <i class="bi bi-check"></i>
                      <h3>
                        Comprehensive search filters for enhanced product
                        discovery
                      </h3>
                    </div>
                  </div>

                  <div
                    class="col-md-6"
                    data-aos="zoom-out"
                    data-aos-delay="500"
                  >
                    <div class="feature-box d-flex align-items-center">
                      <i class="bi bi-check"></i>
                      <h3>
                        Email and in-system notifications for user updates
                      </h3>
                    </div>
                  </div>

                  <div
                    class="col-md-6"
                    data-aos="zoom-out"
                    data-aos-delay="600"
                  >
                    <div class="feature-box d-flex align-items-center">
                      <i class="bi bi-check"></i>
                      <h3>
                        Inclusive review system for reading and submitting
                        feedback
                      </h3>
                    </div>
                  </div>

                  <div
                    class="col-md-6"
                    data-aos="zoom-out"
                    data-aos-delay="700"
                  >
                    <div class="feature-box d-flex align-items-center">
                      <i class="bi bi-check"></i>
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
