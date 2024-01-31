import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../axios";
import { Link } from "react-router-dom";

const CheckOut = () => {
  const [productList, setProductList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);

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
        <h1>Checkout</h1>
        <div id="ProfileContainer" className="prodctDetails">
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
                        <Link to={`/customer/product/${product.productId._id}`}>
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
        </div>
      </div>
    </>
  );
};

export default CheckOut;
