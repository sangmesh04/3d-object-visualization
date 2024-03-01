import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../axios";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

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
  }, []);

  return (
    <>
      <div className="hero">
        <h1>Orders</h1>
        <div id="ProfileContainer" className="prodctDetails">
          {orders.length > 0 ? (
            <table class="table my-3">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Product name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Payment status</th>
                  <th scope="col">Order status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0
                  ? orders.map((order, key) =>
                      order.cart.map((product, key) => (
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
                            <td>{order.paymentStatus ? "Paid" : "Pending"}</td>
                            <td>
                              {String(order.deliveryStatus).toUpperCase()}
                            </td>
                          </tr>
                        </>
                      ))
                    )
                  : ""}
              </tbody>
            </table>
          ) : (
            <p className="my-3">No orders in past!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
