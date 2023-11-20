import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../../assets/css/style.css";
import loginbg from "../../assets/img/login-bg.jpg";
import axiosInstance from "../../axios";

const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);

  const [formValue, setformValue] = React.useState({
    username: "",
    password: "",
  });

  const formValidate = () => {
    setLoading(true);
    // console.log("Something");
    if (formValue.username === "") {
      toast.error("Username can't be empty!");
      setLoading(false);
    } else if (formValue.password === "") {
      toast.error("Password can't be empty!");
      setLoading(false);
    }
    // else if (!captcha) {
    //   toast.error("Click the captcha box!");
    //   setLoading(false);
    // }
    else {
      setLoading(true);
      axiosInstance
        .post("/user/login", formValue)
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            toast.success("Login Successful!");
            setLoading(false);
            console.log(res.data);
            setformValue({ username: "", password: "" });
          } else {
            toast.error("Login Failed!");
            setLoading(false);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
        });
    }
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
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
    <div>
      <div
        className="card text-center"
        style={{ background: "#ffffff59", backdropFilter: "blur(8px)" }}
      >
        <div className="card-body">
          <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
            {" "}
            3D Object Visualization{" "}
          </Link>
        </div>
      </div>
      {/* <!-- ======= Hero Section ======= --> */}
      <section
        id="hero"
        class="hero d-flex align-items-center"
        style={{ height: "91vh" }}
      >
        <div class="container" style={{ marginTop: "-10rem" }}>
          <div class="row" id="signincompo">
            <div class="col-lg-6 d-flex flex-column justify-content-center">
              <div id="signInForm">
                <h1 data-aos="fade-up">Welcome back!</h1>
                <main className="form-signin w-100 m-auto">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Username
                    </label>
                    <input
                      type="username"
                      className="form-control"
                      name="username"
                      value={formValue.username}
                      onChange={handleChange}
                      id="exampleInputEmail1"
                    />
                    <div id="emailHelp" className="form-text">
                      Enter username
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formValue.password}
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                    <div id="passwordHelp" className="form-text">
                      Enter secure password
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Link
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#forgotPasswordModal"
                    >
                      Forgot password
                    </Link>
                  </div>
                  <br />
                  <div className="signup-helper-text">
                    <button
                      onClick={formValidate}
                      // disabled={!captcha}
                      className="btn btn-primary"
                    >
                      Sign In
                    </button>
                    <div style={{ textAlign: "right" }}>
                      No account?
                      <Link to="/signup"> Sign Up</Link>
                    </div>
                  </div>
                </main>
              </div>
            </div>
            <div
              class="col-lg-6 hero-img"
              data-aos="zoom-out"
              data-aos-delay="200"
              style={{ marginTop: "25px", lineHeight: "30" }}
            >
              <img
                src={loginbg}
                style={{ borderRadius: "18px" }}
                class="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
