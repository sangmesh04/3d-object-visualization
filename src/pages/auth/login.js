import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../../assets/css/style.css";
import loginbg from "../../assets/img/login-bg.jpg";
import axiosInstance from "../../axios";
import { useCookies } from "react-cookie";
import axios from "axios";

const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["usertype", "token1"]);

  const [formValue, setformValue] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const formValidate = () => {
    setLoading(true);
    // console.log("Something");

    var reEmail =
      /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

    if (!formValue.email.match(reEmail)) {
      toast.error("Email is not valid!");
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
      axios
        .post("http://localhost:8080/user/login", formValue, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success === true) {
            toast.success("Login successful!");
            setLoading(false);
            localStorage.setItem("accessToken", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setCookie("token1", res.data.token, { path: "/", maxAge: 43200 }); // 30 days
            setCookie("usertype", res.data.usertype, {
              path: "/",
              maxAge: 43200,
            });
            setformValue({ username: "", password: "" });
            navigate(`/${res.data.usertype}/dashboard`);
          } else {
            toast.error("Login failed!");
            setLoading(false);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.error);
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
        className="hero d-flex align-items-center"
        style={{ height: "91vh" }}
      >
        <div className="container" style={{ marginTop: "-10rem" }}>
          <div className="row" id="signincompo">
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <div id="signInForm">
                <h1 data-aos="fade-up">Welcome back!</h1>
                <main className="form-signin w-100 m-auto">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={formValue.email}
                      onChange={handleChange}
                      id="exampleInputEmail1"
                    />
                    <div id="emailHelp" className="form-text">
                      Enter email
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
              className="col-lg-6 hero-img"
              data-aos="zoom-out"
              data-aos-delay="200"
              style={{ marginTop: "25px", lineHeight: "30" }}
            >
              <img
                src={loginbg}
                style={{ borderRadius: "18px" }}
                className="img-fluid"
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
