import React from "react";
// import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
// import logo from "./logo.svg";
import "./App.css";
import Gent from "./pages/Gent";
import Ladies from "./pages/Ladies";
import UserProfile from "./components/UserProfile";
// import UserProfile from "./components/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gent" element={<Gent />} />
          <Route path="/ladies" element={<Ladies />} />
          {/* <Route path="/userprofile" element={<UserProfile />} /> */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
