import { useCookies } from "react-cookie";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["usertype", "token1"]);

  const handleSignOut = (user) => {
    axiosInstance
      .get(`/${user}/signout`)
      .then((res) => {
        // console.log("Student Logout");
        setCookie("token1", "", { path: "/" });
        setCookie("username", "", { path: "/" });
        toast.success("User signed out successfully!");
        navigate("/");
      })
      .catch((err) => {
        // console.log("Error ",err);
      });
  };
  return (
    <>
      <header className="p-3 border-bottom customerNavbar">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <i
                className="bi bi-box mx-2"
                style={{ color: "rgba(255, 0, 0, 0.468)" }}
              ></i>{" "}
              3D Object Visulization
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {/* <li>
                <a href="#" className="nav-link px-2 link-secondary">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-body-emphasis">
                  Inventory
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-body-emphasis">
                  Customers
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-body-emphasis">
                  Products
                </a>
              </li> */}
            </ul>

            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              role="search"
            >
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user?.firstname ? user.firstname : "User"}
              </a>
              {user.role === "customer" ? (
                <ul className="dropdown-menu text-small">
                  <li>
                    <Link className="dropdown-item" to="/customer/products">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/customer/cart">
                      Cart
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Orders
                    </a>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/customer/wishlist">
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/customer/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      id="signout"
                      onClick={() => handleSignOut("user")}
                      href="#"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              ) : user.role === "admin" ? (
                <ul className="dropdown-menu text-small">
                  <li>
                    <Link className="dropdown-item" to="/admin/category">
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/products">
                      Products
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Orders
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      id="signout"
                      onClick={() => handleSignOut("admin")}
                      href="#"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
