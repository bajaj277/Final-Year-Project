import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";
import "../components/css/app.css";

export default function OuetrMenu() {
  // window.location.reload(false);
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const [userData, setuserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch("/Menu", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setuserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      } else {
        dispatch({ type: "ADMIN", payload: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  callAboutPage();
  let daata = [];
  Object.assign(daata, userData);
  let link1 = `/Home`;
  let link = `/TodaySpecial`;

  return (
    <div className="menu-body">
      <div className="menu-container">
        {daata.map((currItem) => {
          return (
            <div className="menu-box">
              <div className="menu-image-container">
                <img
                  src={currItem.img}
                  alt="jsx-a11y/alt-text"
                  className="menu-image"
                />
              </div>
              <p className="menu-box-body">
                <div className="menu-box-title">
                  <h5 className="card-title" style={{ fontWeight: "bolder" }}>
                    {currItem.title}
                  </h5>
                </div>
                <div
                  className="container-fluid menu-box-description"
                  style={{ color: "silver" }}
                >
                  <>{currItem.description}</>
                </div>
                <h5>
                  Price:
                  <span
                    style={{
                      color: "greenyellow",
                      backgroundColor: "rgb(34, 34, 36)",
                    }}
                  >
                    {" "}
                    {currItem.price} INR
                  </span>
                </h5>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
