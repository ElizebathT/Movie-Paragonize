// src/Navbar.js
import React from 'react';
import './styles.css';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Movie Paragonize</div>
      <ul className="navbar-nav">
        <li className="nav-item"><a href="/">Home</a></li>
        <li className="nav-item"><a href="/about">About</a></li>

      </ul>
    </nav>
  );
};

export default Navbar;
