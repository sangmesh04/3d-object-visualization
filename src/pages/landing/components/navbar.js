import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
const LandingNavbar = () => {
  const MobileToggle = () => {
    var mobileTogggle = document.getElementById("mobileTogl");
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("navbar-mobile");
    mobileTogggle.classList.toggle("bi-list");
    mobileTogggle.classList.toggle("bi-x");
  };

  const HideNavbar = () => {
    var navbar = document.getElementById("navbar");
    if (navbar.classList.contains("navbar-mobile")) {
      navbar.classList.remove("navbar-mobile");
      var mobileTogggle = document.getElementById("mobileTogl");
      mobileTogggle.classList.toggle("bi-list");
      mobileTogggle.classList.toggle("bi-x");
    }
  };
  return (
    <>
      {/* <!-- ======= Header ======= --> */}
      <div className="landing">
        <header
          id="header"
          class="header fixed-top"
          //   style={{ backgroundColor: "lightblue", backdropFilter: "blur(10px)" }}
        >
          <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
            <Link href="/" class="logo d-flex align-items-center">
              {/* <img src={logo} alt="logo" /> */}
              <span>3D Object Visualization</span>
            </Link>

            <nav id="navbar" class="navbar">
              <ul>
                <li>
                  <a
                    class="nav-link scrollto"
                    onClick={HideNavbar}
                    href="#hero"
                  >
                    Home
                  </a>
                </li>
                {/* <li>
                  <a
                    class="nav-link scrollto"
                    onClick={HideNavbar}
                    href="#about"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    class="nav-link scrollto"
                    onClick={HideNavbar}
                    href="#services"
                  >
                    Services
                  </a>
                </li> */}
                <li>
                  <a
                    class="nav-link scrollto"
                    onClick={HideNavbar}
                    href="#features"
                  >
                    Features
                  </a>
                </li>
                {/* <li>
                  <a
                    class="nav-link scrollto"
                    onClick={HideNavbar}
                    href="#screenshots"
                  >
                    Screenshots
                  </a>
                </li> */}
                <li>
                  <a
                    class="nav-link scrollto"
                    onClick={HideNavbar}
                    href="#contact"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <Link
                    class="getstarted scrollto"
                    onClick={HideNavbar}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </ul>
              <i
                class="bi bi-list mobile-nav-toggle"
                id="mobileTogl"
                onClick={MobileToggle}
              ></i>
            </nav>
            {/* <!-- .navbar --> */}
          </div>
        </header>
      </div>
      {/* <!-- End Header --> */}
    </>
  );
};

export default LandingNavbar;
