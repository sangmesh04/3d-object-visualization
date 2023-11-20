const LandingFooter = () => {
  return (
    <>
      <div className="landing" id="contact">
        <footer id="footer" class="footer">
          <div class="footer-top">
            <div class="container">
              <div class="row gy-4">
                <div class="col-lg-5 col-md-12 footer-info">
                  <a href="index.html" class="logo d-flex align-items-center">
                    {/* <img src={logo} alt="" /> */}
                    <span>3D Object Visualization</span>
                  </a>
                  <p style={{ textAlign: "justify" }}>
                    Visualize 3D models of products before making a purchase
                    decision
                  </p>
                  {/* <div class="social-links mt-3">
                    <a href="#" class="twitter">
                      <i class="bi bi-twitter"></i>
                    </a>
                    <a href="#" class="facebook">
                      <i class="bi bi-facebook"></i>
                    </a>
                    <a href="#" class="instagram">
                      <i class="bi bi-instagram"></i>
                    </a>
                    <a href="#" class="linkedin">
                      <i class="bi bi-linkedin"></i>
                    </a>
                  </div> */}
                </div>

                <div class="col-lg-2 col-6 footer-links">
                  {/* <h4>Useful Links</h4>
                  <ul>
                    <li>
                      <i class="bi bi-chevron-right"></i> <a href="#">Home</a>
                    </li>
                    <li>
                      <i class="bi bi-chevron-right"></i>{" "}
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <i class="bi bi-chevron-right"></i>{" "}
                      <a href="#">Services</a>
                    </li>
                    <li>
                      <i class="bi bi-chevron-right"></i>{" "}
                      <a href="#">Terms of service</a>
                    </li>
                    <li>
                      <i class="bi bi-chevron-right"></i>{" "}
                      <a href="#">Privacy policy</a>
                    </li>
                  </ul> */}
                </div>

                <div class="col-lg-2 col-6 footer-links">
                  {/* <h4>Our Services</h4>
                  <ul>
                    <li>
                      <i class="bi bi-chevron-right"></i>{" "}
                      <a href="#">Web Design</a>
                    </li>
                    <li>
                      <i class="bi bi-chevron-right"></i>{" "}
                      <a href="#">Web Development</a>
                    </li>
                    <li>
                      <i class="bi bi-chevron-right"></i>{" "}
                      <a href="#">Product Management</a>
                    </li>
                    <li>
                      <i class="bi bi-chevron-right"></i>{" "}
                      <a href="#">Marketing</a>
                    </li>
                    <li>
                      <i class="bi bi-chevron-right"></i>{" "}
                      <a href="#">Graphic Design</a>
                    </li>
                  </ul> */}
                </div>

                <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                  <h4>Contact Us</h4>
                  <p>
                    Pune Institute of Computer Technology <br />
                    Pune, MH 411 046
                    <br />
                    India <br />
                    <br />
                    {/* <strong>Phone:</strong> +1 5589 55488 55
                    <br />
                    <strong>Email:</strong> info@example.com
                    <br /> */}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>2023</span>
              </strong>
              . All Rights Reserved
            </div>
          </div>
        </footer>
        {/* <!-- End Footer --> */}
      </div>
    </>
  );
};

export default LandingFooter;
