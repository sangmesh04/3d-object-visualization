import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AllProducts = () => {
  const [productWish, setProductWish] = useState(false);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const load = toast.loading("loading...");
    axios
      .get("http://127.0.0.1:8080/products")
      .then((res) => {
        setProductList(res.data.data);
        toast.dismiss(load);
      })
      .catch((err) => {
        toast.dismiss(load);
        toast.error("Something went wrong!");
      });
  }, []);
  return (
    <>
      <div className="hero">
        <h1>Products</h1>
        <div id="ProfileContainer">
          <main className="form-signup w-100 m-auto">
            <div className="row g-3" style={{ alignItems: "center" }}>
              <div className="col-md-8">
                <input
                  type="text"
                  name="searchText"
                  placeholder="search..."
                  className="form-control"
                  id="validationCustom01"
                />
              </div>
              <div className="col-md-2">
                <div className="signup-helper-text">
                  <button
                    className="btn btn-primary"
                    style={{ float: "right" }}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="col-md-2">
                <a
                  href="#"
                  style={{
                    color: "#343a40",
                    lineHeight: "12px",
                    textDecoration: "none",
                  }}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#staticBackdrop"
                  aria-controls="staticBackdrop"
                >
                  <i className="bi bi-filter"></i> Filter
                </a>
              </div>
            </div>
          </main>
          <div className="products">
            <div className="row">
              {productList.map((product) => (
                <div className="col-md-3" style={{ marginBottom: "12px" }}>
                  <div className="card">
                    <model-viewer
                      className="viewer card-img-top"
                      style={{
                        height: "250px",
                        width: "100%",
                        backgroundColor: "#17171A!important",
                      }}
                      src={product.image}
                      // ios-src={chairUsdz}
                      ar
                      alt="A 3D model of a chair"
                      camera-orbit="-90deg"
                      auto-rotate=""
                      camera-controls=""
                      background-color="#455A64"
                    ></model-viewer>
                    <hr />
                    <div className="card-body" style={{ padding: "0 11px" }}>
                      <p
                        className="card-text"
                        style={{
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "0rem",
                        }}
                      >
                        <span>{product.name}</span>
                        <span>₹ {product.price}</span>
                      </p>{" "}
                      <br />
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <a href="#">
                          <i className="bi bi-cart"></i> Add to cart
                        </a>
                        <a
                          onClick={() => setProductWish(!productWish)}
                          title="Add to wishlist"
                        >
                          {productWish ? (
                            <i
                              className="bi bi-heart-fill"
                              style={{ color: "#dc3545" }}
                            ></i>
                          ) : (
                            <i className="bi bi-heart"></i>
                          )}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* filter offcanvas */}
        <div
          className="offcanvas offcanvas-start"
          data-bs-backdrop="static"
          tabIndex="-1"
          id="staticBackdrop"
          aria-labelledby="staticBackdropLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="staticBackdropLabel">
              Filter
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div>I will not close if you click outside of me.</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
