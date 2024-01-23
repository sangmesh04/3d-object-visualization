import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../axios";

const AddProduct = () => {
  const [isLoading, setLoading] = useState(false);
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

  const handleAddProduct = () => {
    setLoading(true);
    if (formValue.name === "") {
      toast.error("Enter product name!");
      setLoading(false);
    } else if (formValue.category === "") {
      toast.error("Select a category!");
      setLoading(false);
    } else if (formValue.description === "") {
      toast.error("Enter product description!");
      setLoading(false);
    } else if (formValue.price <= 0) {
      toast.error("Enter valid price for the product!");
      setLoading(false);
    } else if (formValue.quantity < 0) {
      toast.error("Enter valid product quantity!");
      setLoading(false);
    } else if (formValue.image === null) {
      toast.error("Select a product 3d image (.glb format)!");
      setLoading(false);
    } else {
      const formData = new FormData();
      formData.append("image", formValue.image);
      formData.append("name", formValue.name);
      formData.append("description", formValue.description);
      formData.append("price", formValue.price);
      formData.append("quantity", formValue.quantity);
      formData.append("category", formValue.category);
      const config = {
        headers: { "content-type": "multipart/form-data" },
        withCredentials: true,
      };
      axios
        .post(`http://localhost:8080/product/add`, formData, config)
        .then((res) => {
          // console.log("Second ", res.data);
          setFormValue({
            name: "",
            description: "",
            image: null,
            price: 0,
            quantity: -1,
            category: "",
          });
          toast.success("Product added successfully!");
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error while upload document.", err);
          toast.error("Something went wrong!");
          setLoading(false);
        });
      setLoading(false);
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
                onChange={(e) =>
                  setFormValue({ ...formValue, image: e.target.files[0] })
                }
                id="cat-img"
              />
            </div>
            <div className="col-md-12">
              <button
                className="btn btn-primary"
                onClick={handleAddProduct}
                style={{ float: "right" }}
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
