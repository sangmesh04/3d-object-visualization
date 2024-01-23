import { useEffect, useState } from "react";
import axiosInstance from "../../../axios";
import toast from "react-hot-toast";
import AddProduct from "./addProduct";

const AllAdminProducts = () => {
  const [isLoading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/products/")
      .then((res) => {
        setProductData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Something went wrong!");
      });
  }, []);

  if (isLoading) {
    return (
      <div className="text-center my-3">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hero">
        <h1>Product</h1>
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
                <button className="btn btn-primary" style={{ float: "right" }}>
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
                <i className="bi bi-plus-circle"></i> Add
              </a>
            </div>
          </div>
        </main>
        <div className="categories">
          <div className="row">
            {productData.map((product) => (
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
                        // onClick={() => setProductWish(!productWish)}
                        title="Add to wishlist"
                      >
                        {false ? (
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
        <AddProduct />
      </div>
    </>
  );
};

export default AllAdminProducts;
