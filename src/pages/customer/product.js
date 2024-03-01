import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import "./products/product.css";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [cartObj, setCartObj] = useState({});
  const [wishListProducts, setWishListProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [showDimension, setShowDimension] = useState(true);

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

  const modelViewer = document.querySelector("#dimension-demo");

  const btns = modelViewer && modelViewer.querySelectorAll("button");
  const dmlines = modelViewer && modelViewer.querySelector("#dimLines");
  var dimElements = [];
  if (modelViewer) {
    dimElements = [...btns];
  }
  dimElements.push(dmlines);

  function setVisibility(visible) {
    setShowDimension(!showDimension);
    dimElements.forEach((element) => {
      if (visible) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    });
  }

  // update svg
  function drawLine(svgLine, dotHotspot1, dotHotspot2, dimensionHotspot) {
    if (dotHotspot1 && dotHotspot2) {
      svgLine.setAttribute("x1", dotHotspot1.canvasPosition.x);
      svgLine.setAttribute("y1", dotHotspot1.canvasPosition.y);
      svgLine.setAttribute("x2", dotHotspot2.canvasPosition.x);
      svgLine.setAttribute("y2", dotHotspot2.canvasPosition.y);

      // use provided optional hotspot to tie visibility of this svg line to
      if (dimensionHotspot && !dimensionHotspot.facingCamera) {
        svgLine.classList.add("hide");
      } else {
        svgLine.classList.remove("hide");
      }
    }
  }

  modelViewer &&
    modelViewer.addEventListener("ar-status", (event) => {
      setVisibility(showDimension && event.detail.status !== "session-started");
    });

  const dimLines = modelViewer && modelViewer.querySelectorAll("line");

  const renderSVG = () => {
    drawLine(
      dimLines[0],
      modelViewer.queryHotspot("hotspot-dot+X-Y+Z"),
      modelViewer.queryHotspot("hotspot-dot+X-Y-Z"),
      modelViewer.queryHotspot("hotspot-dim+X-Y")
    );
    drawLine(
      dimLines[1],
      modelViewer.queryHotspot("hotspot-dot+X-Y-Z"),
      modelViewer.queryHotspot("hotspot-dot+X+Y-Z"),
      modelViewer.queryHotspot("hotspot-dim+X-Z")
    );
    drawLine(
      dimLines[2],
      modelViewer.queryHotspot("hotspot-dot+X+Y-Z"),
      modelViewer.queryHotspot("hotspot-dot-X+Y-Z")
    ); // always visible
    drawLine(
      dimLines[3],
      modelViewer.queryHotspot("hotspot-dot-X+Y-Z"),
      modelViewer.queryHotspot("hotspot-dot-X-Y-Z"),
      modelViewer.queryHotspot("hotspot-dim-X-Z")
    );
    drawLine(
      dimLines[4],
      modelViewer.queryHotspot("hotspot-dot-X-Y-Z"),
      modelViewer.queryHotspot("hotspot-dot-X-Y+Z"),
      modelViewer.queryHotspot("hotspot-dim-X-Y")
    );
  };

  modelViewer &&
    modelViewer.addEventListener("load", () => {
      const center = modelViewer.getBoundingBoxCenter();
      const size = modelViewer.getDimensions();
      const x2 = size.x / 2;
      const y2 = size.y / 2;
      const z2 = size.z / 2;

      modelViewer.updateHotspot({
        name: "hotspot-dot+X-Y+Z",
        position: `${center.x + x2} ${center.y - y2} ${center.z + z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim+X-Y",
        position: `${center.x + x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim+X-Y"]'
      ).textContent = `${(size.z * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot+X-Y-Z",
        position: `${center.x + x2} ${center.y - y2} ${center.z - z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim+X-Z",
        position: `${center.x + x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim+X-Z"]'
      ).textContent = `${(size.y * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot+X+Y-Z",
        position: `${center.x + x2} ${center.y + y2} ${center.z - z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim+Y-Z",
        position: `${center.x} ${center.y + y2 * 1.1} ${center.z - z2 * 1.1}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim+Y-Z"]'
      ).textContent = `${(size.x * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot-X+Y-Z",
        position: `${center.x - x2} ${center.y + y2} ${center.z - z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim-X-Z",
        position: `${center.x - x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim-X-Z"]'
      ).textContent = `${(size.y * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot-X-Y-Z",
        position: `${center.x - x2} ${center.y - y2} ${center.z - z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim-X-Y",
        position: `${center.x - x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim-X-Y"]'
      ).textContent = `${(size.z * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot-X-Y+Z",
        position: `${center.x - x2} ${center.y - y2} ${center.z + z2}`,
      });

      renderSVG();

      modelViewer.addEventListener("camera-change", renderSVG);
    });

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
                // className="viewer card-img-top"
                // id="dimension-demo"
                // style={{
                //   height: "30rem",
                //   width: "100%",
                //   backgroundColor: "#17171A!important",
                // }}
                // // src={product.image}
                // src={"https://modelviewer.dev/assets/ShopifyModels/Chair.glb"}
                // // ios-src={chairUsdz}
                // ar
                // // ar-modes="webxr"
                // ar-scale="fixed"
                // alt="A 3D model of a chair"
                // camera-orbit="-90deg"
                // auto-rotate=""
                // camera-controls=""
                // background-color="#455A64"
                // tone-mapping="commerce"
                // touch-action="pan-y"
                // max-camera-orbit="auto 100deg auto"
                // shadow-intensity="1"
                id="dimension-demo"
                ar
                // ar-modes="webxr"
                ar-scale="fixed"
                // camera-orbit="-30deg auto auto"
                // max-camera-orbit="auto 100deg auto"
                shadow-intensity="1"
                camera-controls
                touch-action="pan-y"
                style={{
                  height: "30rem",
                  width: "100%",
                  backgroundColor: "#17171A!important",
                }}
                src={"https://modelviewer.dev/assets/ShopifyModels/Chair.glb"}
                tone-mapping="commerce"
                alt="A 3D model of an armchair."
              >
                <button
                  slot="ar-button"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    border: "none",
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                  }}
                >
                  👋 Activate AR
                </button>
                <button
                  slot="hotspot-dot+X-Y+Z"
                  class="dot"
                  data-position="1 -1 1"
                  data-normal="1 0 0"
                ></button>
                <button
                  slot="hotspot-dim+X-Y"
                  class="dim"
                  data-position="1 -1 0"
                  data-normal="1 0 0"
                ></button>
                <button
                  slot="hotspot-dot+X-Y-Z"
                  class="dot"
                  data-position="1 -1 -1"
                  data-normal="1 0 0"
                ></button>
                <button
                  slot="hotspot-dim+X-Z"
                  class="dim"
                  data-position="1 0 -1"
                  data-normal="1 0 0"
                ></button>
                <button
                  slot="hotspot-dot+X+Y-Z"
                  class="dot"
                  data-position="1 1 -1"
                  data-normal="0 1 0"
                ></button>
                <button
                  slot="hotspot-dim+Y-Z"
                  class="dim"
                  data-position="0 -1 -1"
                  data-normal="0 1 0"
                ></button>
                <button
                  slot="hotspot-dot-X+Y-Z"
                  class="dot"
                  data-position="-1 1 -1"
                  data-normal="0 1 0"
                ></button>
                <button
                  slot="hotspot-dim-X-Z"
                  class="dim"
                  data-position="-1 0 -1"
                  data-normal="-1 0 0"
                ></button>
                <button
                  slot="hotspot-dot-X-Y-Z"
                  class="dot"
                  data-position="-1 -1 -1"
                  data-normal="-1 0 0"
                ></button>
                <button
                  slot="hotspot-dim-X-Y"
                  class="dim"
                  data-position="-1 -1 0"
                  data-normal="-1 0 0"
                ></button>
                <button
                  slot="hotspot-dot-X-Y+Z"
                  class="dot"
                  data-position="-1 -1 1"
                  data-normal="-1 0 0"
                ></button>
                <svg
                  id="dimLines"
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  class="dimensionLineContainer"
                >
                  <line class="dimensionLine"></line>
                  <line class="dimensionLine"></line>
                  <line class="dimensionLine"></line>
                  <line class="dimensionLine"></line>
                  <line class="dimensionLine"></line>
                </svg>

                <div id="controls" class="dim">
                  <label class="form-check-label" for="flexSwitchCheckChecked">
                    Show dimensions
                  </label>
                  <input
                    class="form-check-input mx-1"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    checked={showDimension}
                    onChange={(e) => {
                      setVisibility(!showDimension);
                    }}
                  />
                </div>
              </model-viewer>
            </div>
            <div
              className="col-md-5"
              style={{
                textAlign: "left",
                paddingRight: "32px",
                paddingLeft: "32px",
              }}
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
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  checked={showDimension}
                  onChange={(e) => {
                    setVisibility(!showDimension);
                  }}
                />
                <label class="form-check-label" for="flexSwitchCheckChecked">
                  Show dimensions
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
