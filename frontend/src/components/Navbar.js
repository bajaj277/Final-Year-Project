import React from "react";
// import { useHistory } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "./css/app.css";

const Navbar = () => {
  // const history=useHistory();
  return (
    <div className="heading-container" style={{background:"black"}}>
      <header className="heading-tag">
        <p className="heading">the royal madrasi restro</p>
      </header>
    </div>
  );
};

export default Navbar;
