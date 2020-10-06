import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  return (
    <nav id="nav" className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="/">
        Google Books
      </a>
      <Link id="search" to="/search" className={window.location.pathname === "/search" || window.location.pathname === "/search" ? "nav-link active" : "nav-link" } > Search </Link>
      <Link id="saved" to="/saved" className={window.location.pathname === "/saved" || window.location.pathname === "/saved" ? "nav-link active" : "nav-link" } > Saved </Link>
    </nav>
  );
}

export default Nav;