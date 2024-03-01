import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [cartObj, setCartObj] = useState({});
  const [wishListProducts, setWishListProducts] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const load1 = toast.loading("loading...");
    axiosInstance
      .get("/cart")
      .then((res) => {
        setCart(res.data.data);
        var sampObj = {};
        res.data.data.map((prod) => {
          sampObj[prod.productId] = prod.count;
        });
        setCartObj(sampObj);
        toast.dismiss(load1);
      })
      .catch((err) => {
        toast.dismiss(load1);
        toast.error("Something went wrong!");
      });
  }, [update]);

  useEffect(() => {
    const load = toast.loading("loading...");
    axiosInstance
      .get(`/product/${params.productId}`)
      .then((res) => {
        setProduct(res.data.data);
        toast.dismiss(load);
      })
      .catch((err) => {
        toast.dismiss(load);
        toast.error("Something went wrong!");
      });
  }, []);

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
        <h1>Product</h1>
        <br />
        <div
          id="ProfileContainer"
          className="prodctDetails"
          style={{ overflowX: "hidden" }}
        >
          <div className="row">
            <div className="col-md-7">
              <model-viewer
                className="viewer card-img-top"
                style={{
                  height: "30rem",
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
                tone-mapping="commerce"
              ></model-viewer>
            </div>
            <div
              className="col-md-5"
              style={{ textAlign: "left", paddingRight: "32px" }}
            >
              <h2>{product.name}</h2>
              <br />
              <i>{product.description}</i> <br /> <br />
              <b>
                <p>₹ {product.price}</p>
              </b>
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "18px",
                }}
              >
                <p>
                  {cartObj[product._id] ? (
                    <>
                      <a
                        href="#"
                        onClick={() => handleRemoveFromCart(product._id)}
                      >
                        <i className="bi bi-dash"></i>
                      </a>{" "}
                      {cartObj[product._id]}{" "}
                      <a
                        href="#"
                        onClick={() =>
                          handleAddToCart(product._id, 1 + cartObj[product._id])
                        }
                      >
                        <i className="bi bi-plus"></i>
                      </a>
                    </>
                  ) : (
                    <a href="#" onClick={() => handleAddToCart(product._id, 1)}>
                      <i className="bi bi-cart"></i> Add to cart{" "}
                    </a>
                  )}
                </p>

                {wishListProducts.includes(product._id) ? (
                  <a
                    onClick={() => handleRemoveFromWhishlist(product._id)}
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
      </div>
    </>
  );
};

export default Product;
