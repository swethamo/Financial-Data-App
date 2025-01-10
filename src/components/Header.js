import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <img 
        src="https://valueglance.com/assets/landing_logo-b7aad0b9.png" 
        alt="Logo" 
        className="header-logo" 
      />
      <h1 className="header-title font-semibold">Financial Data Filtering App</h1>
    </div>
  );
}

export default Header;
