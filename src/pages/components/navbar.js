import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <header class="p-3 border-bottom customerNavbar">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <i
                class="bi bi-box mx-2"
                style={{ color: "rgba(255, 0, 0, 0.468)" }}
              ></i>{" "}
              3D Object Visulization
            </a>

            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {/* <li>
                <a href="#" class="nav-link px-2 link-secondary">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-2 link-body-emphasis">
                  Inventory
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-2 link-body-emphasis">
                  Customers
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-2 link-body-emphasis">
                  Products
                </a>
              </li> */}
            </ul>

            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input
                type="search"
                class="form-control"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            <div class="dropdown text-end">
              <a
                href="#"
                class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user?.firstname ? user.firstname : "User"}
              </a>
              {user.role === "customer" ? (
                <ul class="dropdown-menu text-small">
                  <li>
                    <Link class="dropdown-item" to="/customer/products">
                      Products
                    </Link>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Cart
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Orders
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/customer/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" id="signout" href="#">
                      Sign out
                    </a>
                  </li>
                </ul>
              ) : user.role === "admin" ? (
                <ul class="dropdown-menu text-small">
                  <li>
                    <Link class="dropdown-item" to="/admin/category">
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/admin/products">
                      Products
                    </Link>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Orders
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" id="signout" href="#">
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
