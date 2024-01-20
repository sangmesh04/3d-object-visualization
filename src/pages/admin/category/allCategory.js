import { useEffect, useState } from "react";
import AddCategory from "./addCategory";
import axiosInstance from "../../../axios";
import toast from "react-hot-toast";

const AllCategory = () => {
  const [isLoading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

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
  }, []);

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
                <i class="bi bi-plus-circle"></i> Add
              </a>
            </div>
          </div>
        </main>
        <div className="categories">
          <div className="row">
            {categoryData.map((cat) => (
              <div className="col-md-3" style={{ marginBottom: "12px" }}>
                <div class="card">
                  <img
                    src={cat.image}
                    alt="Category Image"
                    srcset=""
                    class="img-fluid"
                  />
                  <hr />
                  <div class="card-body" style={{ padding: "0 11px" }}>
                    <p
                      class="card-text"
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
                        <i class="bi bi-eye"></i> View products
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AddCategory />
      </div>
    </>
  );
};

export default AllCategory;
