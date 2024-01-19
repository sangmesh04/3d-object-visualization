import { Route, Routes } from "react-router-dom";
import LoginForm from "./pages/auth/login";
import SignupForm from "./pages/auth/signup";
import Home from "./pages/landing/home";
import CustomerDashboard from "./pages/customer/dashboard";
import Navbar from "./pages/components/navbar";
import CustomerProfile from "./pages/customer/profile";
import RequireAuth from "./pages/auth/requireAuth";
import AllProducts from "./pages/customer/products/allProducts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" index element={<LoginForm />} />
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<SignupForm />} />

        {/* customer routes  */}
        <Route element={<RequireAuth allowedRoles={"customer"} />}>
          <Route path="customer" element={<Navbar />}>
            <Route path="dashboard" element={<CustomerDashboard />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="products" element={<AllProducts />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
