import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../axios";
import { Link, useNavigate } from "react-router-dom";

const CheckOut = () => {
  const [productList, setProductList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = toast.loading("loading...");
    axiosInstance
      .get("/cart/detail")
      .then((res) => {
        // console.log(res.data.data);
        if (res.data.data?.cart) {
          setProductList(res.data.data.cart);
          var sums = 0;
          res.data.data.cart.map((product) => {
            sums += product.count * product.productId.price;
          });
          setGrandTotal(sums);
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
      .get("/user/profile")
      .then((res) => {
        setProfile(res.data);
        toast.dismiss(load);
      })
      .catch((err) => {
        toast.dismiss(load);
        toast.error("Something went wrong!");
      });
  }, []);

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

  const navigate = useNavigate();
  const handlePaymentInit = (data) => {
    const options = {
      key: "rzp_test_3DTysEY5nBk053",
      amount: data.amount,
      currency: data.currency,
      name: profile.user.firstname + " " + profile.user.lastname,
      description: "3D Object Visualization",
      order_id: data.id,
      handler: async (response) => {
        axiosInstance
          .post("/api-payment/verify", response)
          .then((res) => {
            if (res.data.message === true) {
              toast.success("Payment was successfull!");
              axiosInstance
                .post("/user/order/place", {
                  amount: grandTotal,
                  paymentMethod: "online",
                  paymentStatus: true,
                  cart: productList,
                })
                .then((res) => {
                  toast.success("Order placed successfully!");
                  setProductList([]);
                  navigate("/customer/orders");
                  setUpdate(!update);
                })
                .catch((err) => {
                  toast.error("Unable to place order!");
                });
            } else {
              toast.error("Something went wrong with payments!");
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Something went wrong!");
          });
      },
      theme: {
        color: "#0b5ed7",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = () => {
    const load = toast.loading("loading...");
    axiosInstance
      .post("/api-payment/orders", { amount: grandTotal })
      .then((res) => {
        const data = res.data;
        handlePaymentInit(data.data);
        toast.dismiss(load);
        toast.success("Payment initiated...");
      })
      .catch((err) => {
        toast.dismiss(load);
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      <div className="hero">
        <h1>Checkout</h1>
        <div id="ProfileContainer" className="prodctDetails">
          {productList.length > 0 ? (
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Product name</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {productList.length > 0
                  ? productList.map((product, key) => (
                      <tr>
                        <th scope="row">{key + 1}</th>
                        <td>
                          <model-viewer
                            className="viewer card-img-top"
                            style={{
                              height: "120px",
                              width: "120px",
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
                        </td>
                        <td>
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
                        </td>
                        <td>
                          <Link
                            to={`/customer/product/${product.productId._id}`}
                          >
                            {product.productId.name}
                          </Link>
                        </td>
                        <td>
                          {product.count} x ₹ {product.productId.price}
                        </td>
                      </tr>
                    ))
                  : ""}
                <tr>
                  <th scope="row">Total</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>₹ {grandTotal}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="my-3">No product in the cart!</p>
          )}
          <div
            className="address"
            style={{
              padding: "25px",
              backdropFilter: "blur(25px)",
              background: "#ffffff3b",
            }}
          >
            <b>
              <p> Deliver to: </p>{" "}
            </b>{" "}
            <span>
              {profile?.user.address.address}, {profile?.user.address.landmark},{" "}
              {profile?.user.address.state}, {profile?.user.address.city},{" "}
              {profile?.user.address.pincode}
            </span>
          </div>
        </div>
        {productList.length > 0 ? (
          <div className="proceedToCheckout">
            <Link
              to="#"
              style={{ color: "white" }}
              onClick={handlePayment}
              className="linkm"
            >
              Click here to pay!{" "}
              <i class="bi bi-arrow-right-circle-fill mx-1"></i>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CheckOut;
