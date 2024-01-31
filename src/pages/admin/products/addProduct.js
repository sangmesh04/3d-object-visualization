import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../axios";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const AddProduct = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    image: null,
    price: 0,
    quantity: -1,
    category: "",
  });

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/categoryList")
      .then((res) => {
        setCategoryList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddProduct = async () => {
    const load = toast.loading("loading...");
    if (formValue.name === "") {
      toast.dismiss(load);
      toast.error("Enter product name!");
    } else if (formValue.category === "") {
      toast.dismiss(load);
      toast.error("Select a category!");
    } else if (formValue.description === "") {
      toast.dismiss(load);
      toast.error("Enter product description!");
    } else if (formValue.price <= 0) {
      toast.dismiss(load);
      toast.error("Enter valid price for the product!");
    } else if (formValue.quantity < 0) {
      toast.dismiss(load);
      toast.error("Enter valid product quantity!");
    } else if (formValue.image === null) {
      toast.dismiss(load);
      toast.error("Select a product 3d image (.glb format)!");
    } else {
      const s3Client = new S3Client({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
        },
      });
      const keypath = `products/${
        formValue.name + Date.now() + "-" + fileName
      }`;
      const params = {
        Bucket: "3d-object-visualization",
        Key: keypath,
        Body: formValue.image,
      };
      const command = new PutObjectCommand(params);
      const data = await s3Client.send(command);
      if (data) {
        const formData = {
          ...formValue,
          image: `https://3d-object-visualization.s3.ap-south-1.amazonaws.com/${keypath}`,
        };
        axiosInstance
          .post("/product/add", { ...formData })
          .then((res) => {
            toast.dismiss(load);
            toast.success("Product added successfully!");
            props.setUpdate(!props.update);
            setFormValue({
              name: "",
              description: "",
              image: null,
              price: 0,
              quantity: -1,
              category: "",
            });
          })
          .catch((err) => {
            toast.dismiss(load);
            toast.error("Something went wrong!");
          });
      } else {
        toast.dismiss(load);
        toast.error("Unable to upload image!");
      }
    }
  };

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
            Add Product
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="row g-3" style={{ textAlign: "left" }}>
            <div className="col-md-12">
              <label htmlFor="catName" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) =>
                  setFormValue({ ...formValue, name: e.target.value })
                }
                id="catName"
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="category" className="form-label">
                Select category
              </label>
              <select
                className="form-select"
                name="category"
                onChange={(e) =>
                  setFormValue({ ...formValue, category: e.target.value })
                }
                id="category"
              >
                <option selected disabled value="">
                  Choose...
                </option>
                {categoryList.map((cat) => (
                  <option value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                className="form-control"
                onChange={(e) =>
                  setFormValue({ ...formValue, description: e.target.value })
                }
                id="description"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                name="price"
                className="form-control"
                onChange={(e) =>
                  setFormValue({ ...formValue, price: e.target.value })
                }
                id="price"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                onChange={(e) =>
                  setFormValue({ ...formValue, quantity: e.target.value })
                }
                id="quantity"
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="cat-img" className="form-label">
                Select image
              </label>
              <input
                type="file"
                name="image"
                accept=".glb, .usdz"
                className="form-control"
                onChange={(e) => {
                  setFormValue({ ...formValue, image: e.target.files[0] });
                  setFileName(e.target.files[0].name);
                }}
                id="cat-img"
              />
            </div>
            <div className="col-md-12">
              <button
                className="btn btn-primary"
                onClick={handleAddProduct}
                style={{ float: "right" }}
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
