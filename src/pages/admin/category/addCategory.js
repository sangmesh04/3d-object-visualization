import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../axios";

const AddCategory = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    image: null,
  });

  const handleAddCategory = async () => {
    const load = toast.loading("loading...");
    if (formValue.name === "") {
      toast.dismiss(load);
      toast.error("Enter category name!");
    } else if (formValue.description === "") {
      toast.dismiss(load);
      toast.error("Enter category description!");
    } else if (formValue.image === null) {
      toast.dismiss(load);
      toast.error("Kindly select a category image!");
    } else {
      const s3Client = new S3Client({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_KEY,
        },
      });
      const keypath = `category/${
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
          .post("/category/add", { ...formData })
          .then((res) => {
            toast.dismiss(load);
            toast.success("Category added successfully!");
            props.setUpdate(!props.update);
            setFormValue({
              name: "",
              description: "",
              image: null,
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
            Add Category
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
                onClick={handleAddCategory}
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
