import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import { toast } from "react-hot-toast";
import axiosInstance from "../../axios";

const SignupForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [checkbox, setCheckBox] = useState(false);
  const pwd_confirm = "password_confirm";

  const [formValue, setformValue] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    password: "",
    [pwd_confirm]: "",
  });

  const clearState = () => {
    setformValue({
      firstname: "",
      lastname: "",
      email: "",
      mobilenumber: "",
      password: "",
      [pwd_confirm]: "",
    });
    setCheckBox(false);
  };

  const formValidate = () => {
    setLoading(true);
    // console.log("Something");
    var reEmail =
      /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    if (formValue.firstname === "") {
      toast.error("First name can't be empty!");
      setLoading(false);
    } else if (formValue.lastname === "") {
      toast.error("Last name can't be empty!");

      setLoading(false);
    } else if (formValue.username === "") {
      toast.error("Username can't be empty!");
      setLoading(false);
    } else if (formValue.accountType === "") {
      toast.error("Kindly select account type!");
      setLoading(false);
    } else if (
      formValue.mobilenumber.length !== 10 ||
      formValue.mobilenumber[0] < "6"
    ) {
      toast.error("Mobile number is not valid!");

      setLoading(false);
    } else if (!formValue.email.match(reEmail)) {
      toast.error("Email is not valid!");
      setLoading(false);
    } else if (formValue.password.length < 6) {
      toast.error("Password should have minimum 6 characters!");
      setLoading(false);
    } else if (formValue.password_confirm !== formValue.password) {
      toast.error("Confirm password is not matching to password!");
      setLoading(false);
    } else if (!checkbox) {
      toast.error("Checkbox is not checked!");
      setLoading(false);
    } else {
      delete formValue.password_confirm;
      submitSignUp();
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const submitSignUp = () => {
    setLoading(true);
    axiosInstance
      .post("/user/signup", formValue)
      .then((res) => {
        if (res.data.status === true) {
          toast.success("Successfully signed up!");
          clearState();
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setLoading(false);
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

      <section
        id="hero"
        class="hero d-flex align-items-center"
        style={{ height: "91vh" }}
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12 d-flex flex-column justify-content-center">
              <div id="signInForm1" className="signupform1">
                <h1 data-aos="fade-up">We are delighted to have you here!</h1>
                <main className="form-signup w-100 m-auto">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label for="validationCustom01" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        value={formValue.firstname}
                        onChange={handleChange}
                        className="form-control"
                        id="validationCustom01"
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="validationCustom02" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        value={formValue.lastname}
                        onChange={handleChange}
                        className="form-control"
                        id="validationCustom02"
                      />
                    </div>

                    <div className="col-md-4">
                      <label for="mobile" className="form-label">
                        Mobile number
                      </label>
                      <input
                        type="text"
                        name="mobilenumber"
                        value={formValue.mobilenumber}
                        onChange={handleChange}
                        className="form-control"
                        id="mobile"
                      />
                    </div>
                    <div className="col-md-8">
                      <label for="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={formValue.email}
                        onChange={handleChange}
                        className="form-control"
                        id="email"
                      />
                    </div>

                    <div className="col-md-6">
                      <label for="pass" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formValue.password}
                        onChange={handleChange}
                        className="form-control"
                        id="pass"
                      />
                    </div>

                    <div className="col-md-6">
                      <label for="conPasssword" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password_confirm"
                        value={formValue.password_confirm}
                        onChange={handleChange}
                        id="conPasssword"
                      />
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={checkbox}
                          onChange={() => setCheckBox(!checkbox)}
                          id="invalidCheck"
                        />
                        <label className="form-check-label" for="invalidCheck">
                          Agree to terms and conditions
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="signup-helper-text">
                        <button
                          className="btn btn-primary"
                          onClick={formValidate}
                        >
                          Sign Up
                        </button>
                        <div style={{ textAlign: "right" }}>
                          Already have account?
                          <Link to="/signin"> Sign In</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
            {/* <div
              class="col-lg-6 hero-img"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img src={signup} class="img-fluid" alt="" />
            </div> */}
          </div>
        </div>
      </section>
      {/* <!-- End Hero --> */}
    </div>
  );
};

export default SignupForm;
