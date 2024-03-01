import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import toast from "react-hot-toast";

const CustomerProfile = () => {
  const [loading, setLoading] = useState(false);

  const [authToken, setAuthToken] = useState("");

  const [update, setUpdate] = useState(false);

  const [formValue, setformValue] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    address: {
      address: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const [address, setAddress] = useState({
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://www.universal-tutorial.com/api/getaccesstoken", {
        headers: {
          "api-token":
            "l-BM0Sgw3SNBgIEZm_HUvhUFo4ED3NjxHC4P3VUnIIQDIn2EnA6RMTNTpJz3q__ESno",
          Accept: "application/json",
          "user-email": "mahajansangmeshwar04@gmail.com",
        },
      })
      .then((res) => {
        callStates(res.data.auth_token);
        setAuthToken(res.data.auth_token);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }, []);

  const callStates = (auth_token) => {
    setLoading(true);
    axios
      .get("https://www.universal-tutorial.com/api/states/India", {
        headers: {
          Authorization: `Bearer ${auth_token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setStates(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (address.state && authToken) {
      axios
        .get(`https://www.universal-tutorial.com/api/cities/${address.state}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          setCities(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);

          setLoading(false);
        });
    }
  }, [address.state, authToken]);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/user/profile")
      .then((res) => {
        setformValue(res.data.user);
        if (res.data.user.isAddressFilled) {
          setAddress(res.data.user.address);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const updateProfile = () => {
    setLoading(true);
    if (formValue.firstname === "") {
      toast.error("Firstname can not be empty!");
      setLoading(false);
    } else if (formValue.lastname === "") {
      toast.error("Lastname can not be empty!");
      setLoading(false);
    } else if (
      address.address === "" ||
      address.city === "" ||
      address.landmark === "" ||
      address.pincode.length != 6 ||
      address.state === ""
    ) {
      toast.error("Kindly fill correct address details!");
      setLoading(false);
    } else {
      const data = {};
      data.user = { ...formValue };
      data.address = address;
      data.isAddressFilled = true;
      axiosInstance
        .post("/user/profile/update", { ...data })
        .then((res) => {
          toast.success("User data updated successfully!");
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Something went wrong!");
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

  if (loading) {
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
        <div className="heading" style={{ paddingTop: "18px" }}>
          <h1>Profile</h1>
        </div>
        <div id="ProfileContainer">
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
                  disabled
                  value={formValue.mobilenumber}
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
                  disabled
                  className="form-control"
                  id="email"
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  value={address.address}
                  onChange={(e) =>
                    setAddress({ ...address, address: e.target.value })
                  }
                  className="form-control"
                  id="address"
                />
              </div>

              <div className="col-md-8">
                <label htmlFor="address">Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  value={address.landmark}
                  onChange={(e) =>
                    setAddress({ ...address, landmark: e.target.value })
                  }
                  className="form-control"
                  id="address"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="address">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                  className="form-control"
                  id="address"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="state">State</label>
                <select
                  className="form-select"
                  name="state"
                  value={address.state}
                  onChange={(e) => {
                    setAddress({ ...address, state: e.target.value });
                  }}
                  id="state"
                >
                  <option selected disabled value="">
                    Choose...
                  </option>
                  {states.map((state, key) => (
                    <option key={key} value={state.state_name}>
                      {state.state_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="city">City</label>
                <select
                  className="form-select"
                  name="state"
                  value={address.city}
                  onChange={(e) => {
                    setAddress({ ...address, city: e.target.value });
                  }}
                  id="city"
                >
                  <option selected disabled value="">
                    Choose...
                  </option>
                  {cities.map((city, key) => (
                    <option key={key} value={city.city_name}>
                      {city.city_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <div className="signup-helper-text">
                  <button
                    className="btn btn-primary"
                    style={{ float: "right" }}
                    onClick={updateProfile}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;
