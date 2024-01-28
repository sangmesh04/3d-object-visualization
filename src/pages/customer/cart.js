import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../axios";

const Cart = () => {
  const [productList, setProductList] = useState([]);
  const [wishListProducts, setWishListProducts] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const load = toast.loading("loading...");
    axiosInstance
      .get("/cart/detail")
      .then((res) => {
        // console.log(res.data.data);
        if (res.data.data?.cart) {
          setProductList(res.data.data.cart);
        }
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
        toast.success("Removed from wishlist!");
      })
      .catch((err) => {
        toast.dismiss(load);
        toast.error("Something went wrong!");
      });
  };

  const handleAddToCart = (productId, count) => {
    const load = toast.loading("loading...");
    const cart = { productId, count };
    axiosInstance
      .post("/cart/add", { cart })
      .then((res) => {
        toast.dismiss(load);
        setUpdate(!update);
        toast.success("Product added to cart!");
      })
      .catch((err) => {
        toast.dismiss(load);
        toast.error("Something went wrong!");
      });
  };

  const handleRemoveFromCart = (productId) => {
    const load = toast.loading("loading...");
    const cart = { productId };
    axiosInstance
      .post("/cart/remove", { cart })
      .then((res) => {
        toast.dismiss(load);
        setUpdate(!update);
        toast.success("Product removed from cart!");
      })
      .catch((err) => {
        toast.dismiss(load);
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      <div className="hero">
        <h1>Cart</h1>
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
                        src={product.productId.image}
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
                          <span>{product.productId.name}</span>
                          <span>₹ {product.productId.price}</span>
                        </p>{" "}
                        <br />
                        <p
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>
                            {product.count ? (
                              <>
                                <a
                                  href="#"
                                  onClick={() =>
                                    handleRemoveFromCart(product.productId._id)
                                  }
                                >
                                  <i className="bi bi-dash"></i>
                                </a>{" "}
                                {product.count}{" "}
                                <a
                                  href="#"
                                  onClick={() =>
                                    handleAddToCart(
                                      product.productId._id,
                                      1 + product.count
                                    )
                                  }
                                >
                                  <i className="bi bi-plus"></i>
                                </a>
                              </>
                            ) : (
                              <a
                                href="#"
                                onClick={() =>
                                  handleAddToCart(product.productId._id, 1)
                                }
                              >
                                <i className="bi bi-cart"></i> Add to cart{" "}
                              </a>
                            )}
                          </p>

                          {wishListProducts.includes(product.productId._id) ? (
                            <a
                              onClick={() =>
                                handleRemoveFromWhishlist(product.productId._id)
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
                              onClick={() =>
                                handleAddToWhishlist(product.productId._id)
                              }
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
                <p>No products in the cart!</p>
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

export default Cart;
