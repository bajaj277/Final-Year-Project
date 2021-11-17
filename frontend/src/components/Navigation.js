import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = (props) => {
  const RenderNav = () => {
    if (props.link === "adminmenuadd") {
      return (
        <ul className="navbar-nav m-auto">
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/admindashboard"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Adminmenuedit"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Menu
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/admintodayspecial"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Add Special
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/admintodayspecialedit"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Today's Special
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Adminuseraccess"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Tables
            </NavLink>
          </li>
        </ul>
      );
    } else if (props.link === "adminmenuedit") {
      return (
        <ul className="navbar-nav m-auto">
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/admindashboard"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Adminhome"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Add Menu
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/admintodayspecial"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Add Special
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/admintodayspecialedit"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Today's Special
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Adminuseraccess"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Tables
            </NavLink>
          </li>
        </ul>
      );
    } else if (props.link === "adminspecialadd") {
      return (
        <ul className="navbar-nav m-auto">
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/admindashboard"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Adminmenuedit"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Menu
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Adminhome"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Add Menu
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/admintodayspecialedit"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Today's Special
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Adminuseraccess"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Tables
            </NavLink>
          </li>
        </ul>
      );
    } else if (props.link === "adminspecialedit") {
      return (
        <ul className="navbar-nav m-auto">
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/admindashboard"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Adminmenuedit"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Menu
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Adminhome"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Add Menu
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/admintodayspecial"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Add Special
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Adminuseraccess"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Tables
            </NavLink>
          </li>
        </ul>
      );
    } else if (props.link === "admintable") {
      return (
        <ul className="navbar-nav m-auto">
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/admindashboard"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Adminmenuedit"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Menu
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Adminhome"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Add Menu
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/admintodayspecialedit"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Today's Special
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/admintodayspecial"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Add Special
            </NavLink>
          </li>
        </ul>
      );
    } else if (props.link === "menu") {
      return (
        <ul className="navbar-nav m-auto">
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/TodaySpecial"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Today's Special
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Register"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Order Now
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Adminlogin"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Admin Login
            </NavLink>
          </li>
        </ul>
      );
    } else if (props.link === "special") {
      return (
        <ul className="navbar-nav m-auto">
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Menu"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Menu
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Register"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Order Now
            </NavLink>
          </li>
        </ul>
      );
    } else if (props.link === "homemenu") {
      return (
        <ul className="navbar-nav m-auto">
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/home"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Home/TodaySpecial"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Today's Special
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Home/Cart"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Cart
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Home/Invoice"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Invoice
            </NavLink>
          </li>
        </ul>
      );
    } else if (props.link === "homespecial") {
      return (
        <ul className="navbar-nav m-auto">
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/home"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Home/Menu"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Menu
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Home/Cart"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Cart
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Home/Invoice"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Invoice
            </NavLink>
          </li>
        </ul>
      );
    } else if (props.link === "cart") {
      return (
        <ul className="navbar-nav m-auto">
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/home"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Home/Menu"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Menu
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Home/TodaySpecial"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Today's Special
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Home/Invoice"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Invoice
            </NavLink>
          </li>
        </ul>
      );
    } else if (props.link === "invoice") {
      return (
        <ul className="navbar-nav m-auto">
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/home"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Home/Menu"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Menu
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Home/TodaySpecial"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Today's Special
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink
              className="nav-link sudo text-bold"
              to="/Home/Cart"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Cart
            </NavLink>
          </li>
        </ul>
      );
    }
  };
  return (
    <>
      <div className="nbar">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse text-center"
              id="navbarSupportedContent"
            >
              <RenderNav />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
