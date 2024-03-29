import { Route, Routes } from "react-router-dom";
import LoginForm from "./pages/auth/login";
import SignupForm from "./pages/auth/signup";
import Home from "./pages/landing/home";
import CustomerDashboard from "./pages/customer/dashboard";
import Navbar from "./pages/components/navbar";
import CustomerProfile from "./pages/customer/profile";
import RequireAuth from "./pages/auth/requireAuth";
import AllProducts from "./pages/customer/products/allProducts";
import AdminDashboard from "./pages/admin/adminDashboard";
import AllCategory from "./pages/admin/category/allCategory";
import AllAdminProducts from "./pages/admin/products/allProducts";
import Wishlist from "./pages/customer/wishlist";
import Cart from "./pages/customer/cart";
import CheckOut from "./pages/customer/checkout";
import Product from "./pages/customer/product";
import Orders from "./pages/customer/orders";
import AdminOrders from "./pages/admin/orders";
import AdminProduct from "./pages/admin/product";

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
            <Route path="product/:productId" element={<Product />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckOut />}></Route>
            <Route path="orders" element={<Orders />}></Route>
          </Route>
        </Route>

        {/* admin routes  */}
        <Route element={<RequireAuth allowedRoles={"admin"} />}>
          <Route path="admin" element={<Navbar />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="category" element={<AllCategory />} />
            <Route path="products" element={<AllAdminProducts />} />
            <Route path="product/:productId" element={<AdminProduct />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
