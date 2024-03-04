import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../axios";
import { Link } from "react-router-dom";
import moment from "moment";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentCart, setCurrentCart] = useState([]);
  const [update, setUpdate] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    address: "",
  });

  const getCustomerDetails = (userId) => {
    const load = toast.loading("loading...");
    axiosInstance
      .get(`/user/profile/${userId}`)
      .then((res) => {
        setCurrentUser(res.data.user);
        toast.dismiss(load);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(load);
        toast.error("Something went wrong!");
      });
  };

  const updateOrderDeliveryStatus = (orderId) => {
    const load = toast.loading("loading...");
    axiosInstance
      .post(`/order/deliveryStatusUpdate`, {
        orderId,
        deliveryStatus: "delivered",
      })
      .then((res) => {
        toast.dismiss(load);
        setUpdate(!update);
        toast.success("Delivery status updated successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(load);
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    const load = toast.loading("loading...");
    axiosInstance
      .get("/orders")
      .then((res) => {
        // console.log(res.data.data);
        console.log(res.data);
        setOrders(res.data.orders);
        toast.dismiss(load);
      })
      .catch((err) => {
        toast.dismiss(load);
        toast.error("Something went wrong!");
      });
  }, [update]);

  return (
    <>
      <div className="hero">
        <h1>Orders</h1>
        <div id="ProfileContainer" className="prodctDetails">
          <div className="orderCards">
            {orders.length > 0
              ? orders.map((order) => (
                  <div
                    class={
                      order.deliveryStatus === "pending"
                        ? "card deliveryPending"
                        : "card deliverySuccess"
                    }
                    style={{ margin: "28px auto", width: "50rem" }}
                  >
                    <div class="card-header" style={{ textAlign: "left" }}>
                      Delivery status:{" "}
                      <select
                        value={order.deliveryStatus}
                        disabled={order.deliveryStatus === "delivered"}
                        onChange={() => updateOrderDeliveryStatus(order._id)}
                      >
                        <option value="" disabled>
                          Select delivery status
                        </option>
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                    <div class="card-body">
                      <p class="card-title">
                        <i>Order placed at</i> <br />
                        {moment(
                          order.createdAt,
                          "YYYY-MM-DDTHH:mm:ss.SSS"
                        ).format("LLLL")}
                      </p>
                      <p class="card-text">
                        Payment status{" "}
                        {order.paymentStatus ? <b>Paid</b> : <b>Pending</b>}
                      </p>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#userModal"
                          onClick={() => getCustomerDetails(order.userId)}
                        >
                          <p className="productDataLink">
                            User details <i class="bi bi-person"></i>{" "}
                          </p>
                        </a>
                        <a
                          className="mx-3"
                          data-bs-toggle="modal"
                          data-bs-target="#productTableModal"
                          onClick={() => setCurrentCart(order.cart)}
                        >
                          <p className="productDataLink">
                            Product details <i class="bi bi-eye"></i>{" "}
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              : "No orders in past!"}
          </div>
        </div>
      </div>
      {/* <!-- Product Modal --> */}
      <div
        class="modal fade"
        id="productTableModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Product details
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <table class="table my-3">
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
                  {currentCart.length > 0
                    ? currentCart.map((product, key) => (
                        <>
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
                            <td>{product.count}</td>
                            <td>
                              <Link
                                to={`/customer/product/${product.productId._id}`}
                              >
                                {product.productId.name}
                              </Link>
                            </td>
                            <td>₹ {product.productId.price}</td>
                          </tr>
                        </>
                      ))
                    : "Product not found!"}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- User Modal --> */}
      <div
        class="modal fade"
        id="userModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Customer details
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body" style={{ textAlign: "left" }}>
              <p>Name: {currentUser.firstname + " " + currentUser.lastname} </p>
              <p>Mobile: {currentUser.mobilenumber}</p>
              <p>Email: {currentUser.email}</p>
              <p>
                Address:{" "}
                {currentUser.isAddressFilled === true ? (
                  <>
                    {currentUser.address.address +
                      ", " +
                      currentUser.address.landmark +
                      ", " +
                      currentUser.address.city +
                      ", " +
                      currentUser.address.state +
                      ", " +
                      currentUser.address.pincode}
                  </>
                ) : (
                  "-"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
