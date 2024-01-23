import { useEffect, useState } from "react";
import AddCategory from "./addCategory";
import axiosInstance from "../../../axios";
import toast from "react-hot-toast";

const AllCategory = () => {
  const [isLoading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/category")
      .then((res) => {
        setCategoryData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong!");
      });
  }, [update]);

  const handleDeleteCategory = (id) => {
    const load = toast.loading("loading...");
    var confirm = prompt("Enter 'confirm' to delete!");
    if (confirm === "confirm") {
      axiosInstance
        .delete(`/category/delete/${id}`)
        .then((res) => {
          toast.dismiss(load);
          toast.success("Category deleted successfully!");
          setUpdate(!update);
        })
        .catch((err) => {
          toast.dismiss(load);
          toast.error("Something went wrong");
        });
    } else {
      toast.dismiss(load);
      toast.error("Delete operation cancelled!");
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
      <div className="hero">
        <h1>Category</h1>
        <main className="form-signup w-100 m-auto">
          <div className="row g-3" style={{ alignItems: "center" }}>
            <div className="col-md-8">
              <input
                type="text"
                name="searchText"
                placeholder="search..."
                className="form-control"
                id="validationCustom01"
              />
            </div>
            <div className="col-md-2">
              <div className="signup-helper-text">
                <button className="btn btn-primary" style={{ float: "right" }}>
                  Search
                </button>
              </div>
            </div>
            <div className="col-md-2">
              <a
                href="#"
                style={{
                  color: "#343a40",
                  lineHeight: "12px",
                  textDecoration: "none",
                }}
                data-bs-toggle="offcanvas"
                data-bs-target="#staticBackdrop"
                aria-controls="staticBackdrop"
              >
                <i className="bi bi-plus-circle"></i> Add
              </a>
            </div>
          </div>
        </main>
        <div className="categories">
          <div className="row">
            {categoryData.map((cat) => (
              <div className="col-md-3" style={{ marginBottom: "12px" }}>
                <div className="card">
                  <img
                    src={cat.image}
                    alt="Category Image"
                    srcset=""
                    className="img-fluid"
                  />
                  <hr />
                  <div className="card-body" style={{ padding: "0 11px" }}>
                    <p
                      className="card-text"
                      style={{
                        textAlign: "left",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0rem",
                      }}
                    >
                      <span>{cat.name}</span>
                    </p>{" "}
                    <br />
                    <p style={{ textAlign: "left", fontStyle: "italic" }}>
                      {cat.description}
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <a href="#">
                        <i className="bi bi-eye"></i> View products
                      </a>
                      <a
                        href="#"
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="deleteItem"
                      >
                        <i className="bi bi-trash3"></i> Delete
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AddCategory update={update} setUpdate={setUpdate} />
      </div>
    </>
  );
};

export default AllCategory;
