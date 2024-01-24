import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../axios";

const Wishlist = () => {
  const [productList, setProductList] = useState([]);
  const [wishListProducts, setWishListProducts] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const load = toast.loading("loading...");
    axiosInstance
      .get("/wishlist/detail")
      .then((res) => {
        setProductList(res.data.data);
        toast.dismiss(load);
      })
      .catch((err) => {
        toast.dismiss(load);
        toast.error("Something went wrong!");
      });
  }, [update]);

  useEffect(() => {
    const load = toast.loading("loading...");
    axiosInstance
      .get("/wishlist")
      .then((res) => {
        setWishListProducts(res.data.data);
        toast.dismiss(load);
      })
      .catch((err) => {
        toast.dismiss(load);
        toast.error("Something went wrong!");
      });
  }, []);

  const handleAddToWhishlist = (productId) => {
    const load = toast.loading("loading...");
    axiosInstance
      .post("/wishlist/add", { productId })
      .then((res) => {
        toast.dismiss(load);
        setWishListProducts(res.data.data);
        setUpdate(!update);
        toast.success("Added to wishlist!");
      })
      .catch((err) => {
        toast.dismiss(load);
        toast.error("Something went wrong!");
      });
  };

  const handleRemoveFromWhishlist = (productId) => {
    const load = toast.loading("loading...");
    axiosInstance
      .post("/wishlist/remove", { productId })
      .then((res) => {
        toast.dismiss(load);
        setWishListProducts(res.data.data);
        setUpdate(!update);
        toast.success("Removed from wishlist!");
      })
      .catch((err) => {
        toast.dismiss(load);
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      <div className="hero">
        <h1>Wishlist</h1>
        <div id="ProfileContainer">
          <div className="products">
            <div className="row">
              {productList.length > 0 ? (
                productList.map((product) => (
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

                          {wishListProducts.includes(product._id) ? (
                            <a
                              onClick={() =>
                                handleRemoveFromWhishlist(product._id)
                              }
                              title="Remove from wishlist"
                            >
                              <i
                                className="bi bi-heart-fill"
                                style={{ color: "#dc3545" }}
                              ></i>
                            </a>
                          ) : (
                            <a
                              onClick={() => handleAddToWhishlist(product._id)}
                              title="Add to wishlist"
                            >
                              <i className="bi bi-heart"></i>
                            </a>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products in wishlist!</p>
              )}
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

export default Wishlist;
