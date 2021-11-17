import React, { useEffect, useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import AdminMessage from "./AdminMessage";
import swal from "sweetalert";

const AdminDashboard = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);

  const [userData, setuserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/Admingetdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setuserData(data);
      if (!res.status === 200) {
        history.push("/Adminlogin");
        const error = new Error(res.error);
        throw error;
      } else {
        dispatch({ type: "ADMIN", payload: true });
      }
    } catch (err) {
      history.push("/Adminlogin");
      console.log(err);
    }
  };
  // useEffect(() => {
  callAboutPage();
  // eslint-disable-next-line
  // }, []);
  const logout = async () => {
    try {
      const deleteFile = await swal({
        title: "Are you sure?",
        text: "Once logged out, you will have to login again!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (deleteFile) {
        const res = await fetch("/Adminlogout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        swal("User Logged out", {
          icon: "success",
        });
        dispatch({ type: "ADMIN", payload: false });
        // history.push("/adminlogin", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="admin-dash-container">
        <div className="admin-user-request">
          <AdminMessage />
        </div>
        <div className="admin-dash-name-container">
          <h1 className="admin-dash-name">{userData.name}</h1>
        </div>
        <div className="admin-dash-options">
          <NavLink className="admin-dash-opt" to="/Adminhome">
            add in menu
          </NavLink>
          <NavLink className="admin-dash-opt" to="/Adminmenuedit">
            Edit menu
          </NavLink>
          <NavLink className="admin-dash-opt" to="/admintodayspecial">
            add in special
          </NavLink>
          <NavLink className="admin-dash-opt" to="/admintodayspecialedit">
            edit special
          </NavLink>
          <NavLink className="admin-dash-opt" to="/Adminuseraccess">
            View tables
          </NavLink>
          <div
            className="admin-dash-opt"
            style={{ cursor: "pointer" }}
            onClick={() => logout()}
          >
            logout
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
