import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const AddCategory = () => {
  const [isLoading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    image: null,
  });

  const addCategory = () => {
    setLoading(true);
    if (formValue.name === "") {
      toast.error("Enter category name!");
      setLoading(false);
    } else if (formValue.description === "") {
      toast.error("Enter category description!");
      setLoading(false);
    } else if (formValue.image === null) {
      toast.error("Kindly select a category image!");
      setLoading(false);
    } else {
      const formData = new FormData();
      formData.append("image", formValue.image);
      formData.append("name", formValue.name);
      formData.append("description", formValue.description);
      const config = {
        headers: { "content-type": "multipart/form-data" },
        withCredentials: true,
      };
      axios
        .post(`http://localhost:8080/category/add`, formData, config)
        .then((res) => {
          // console.log("Second ", res.data);
          toast.success("Category added successfully!");
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error while upload document.", err);
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
        class="offcanvas offcanvas-start"
        data-bs-backdrop="static"
        tabindex="-1"
        id="staticBackdrop"
        aria-labelledby="staticBackdropLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="staticBackdropLabel">
            Add Category
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
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
            <div className="col-md-12">
              <label htmlFor="cat-img" className="form-label">
                Select image
              </label>
              <input
                type="file"
                name="searchText"
                accept=".jpg, .png, .jpeg"
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
                onClick={addCategory}
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

export default AddCategory;
