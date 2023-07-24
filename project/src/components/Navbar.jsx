import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#7F9845" }}
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                fontStyle: "italic",
                color: "#fff",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Feedback form
            </h2>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  exact
                  className="nav-link"
                  to="/"
                  activeClassName="active"
                  style={{
                    marginRight: "10px",
                    fontWeight: "bold",
                    color: "#fff",
                    fontFamily: "Playfair Display, serif",
                    textDecoration: "underline",
                  }}
                >
                  Form
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
