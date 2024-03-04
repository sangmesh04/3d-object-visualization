import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../axios";
import { Link } from "react-router-dom";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentCart, setCurrentCart] = useState([]);

  useEffect(() => {
    const load = toast.loading("loading...");
    axiosInstance
      .get("/user/orders")
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
  }, []);

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
                      {String(order.deliveryStatus).toUpperCase()}
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
                      <a
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
                ))
              : "No orders in past!"}
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
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
    </>
  );
};

export default Orders;
