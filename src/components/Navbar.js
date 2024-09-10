import { NavLink } from "react-router-dom";
import React from "react";
import UserProfile from "./UserProfile";

function Navbar() {
  const navData = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Gents' Section", path: "/gent" },
    { name: "Ladies' Section", path: "/ladies" },
  ];

  return (
    <nav className="navbar navbar-expand-md bg-primary navbar-dark">
      <div className="container">
        <NavLink
          className="navbar-brand align-center text-warning"
          to="https://www.fakestoreapi.com"
        >
          FakeStore
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
          aria-controls="collapsibleNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav me-auto">
            {navData.map(({ name, path }, i) => (
              <li className="nav-item" key={i}>
                <NavLink className="nav-link" to={path}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <UserProfile />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
