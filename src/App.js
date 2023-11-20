import { Route, Routes } from "react-router-dom";
import LoginForm from "./pages/auth/login";
import SignupForm from "./pages/auth/signup";
import Home from "./pages/landing/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" index element={<LoginForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;
