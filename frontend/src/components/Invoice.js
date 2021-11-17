import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import "./css/app.css";

const Invoice = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const [userData, setuserData] = useState({});
  let total = 0;
  const callAboutPage = async () => {
    try {
      const res = await fetch("/Home/Invoice", {
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
        dispatch({ type: "USER", payload: true });
      }
    } catch (err) {
      history.push("/Register");
      console.log(err);
    }
  };
  callAboutPage();
  let daata = [];
  let daata1 = [];
  let k = 0;
  Object.assign(daata, userData.invoice);
  function SortArray(x, y) {
    if (x.title < y.title) {
      return -1;
    }
    if (x.title > y.title) {
      return 1;
    }
    return 0;
  }
  daata.sort(SortArray);
  for (let i = 0; i < daata.length; i++) {
    if (i === 0) {
      daata1 = daata1.concat({
        title: daata[i].title,
        price: daata[i].price,
        quantity: daata[i].quantity,
      });
      k += 1;
    } else {
      if (daata[i].title === daata[i - 1].title) {
        daata1[k - 1].quantity += daata[i].quantity;
      } else {
        daata1 = daata1.concat({
          title: daata[i].title,
          price: daata[i].price,
          quantity: daata[i].quantity,
        });
        k += 1;
      }
    }
  }
  let link = `/Home`;
  return (
    <>
      <div className="invoice-container" style={{ paddingBottom: "12vh" }}>
        {daata1.map((Dat) => {
          total += Dat.price * Dat.quantity;
          return (
            <div className="invoice-box">
              <p className="row invoice-box-body">
                <div className="col-6 invoice-box-title">
                  <h5 className="card-title" style={{ fontWeight: "bolder" }}>
                    {Dat.title}
                  </h5>
                </div>
                <h5 className="col-4 invoice-box-price">
                  <span
                    style={{
                      color: "greenyellow",
                      backgroundColor: "rgb(34, 34, 36)",
                    }}
                  >
                    {" "}
                    {Dat.price * Dat.quantity} INR
                  </span>
                </h5>
                <h5 className="col-2 invoice-box-quantity">x{Dat.quantity}</h5>
              </p>
            </div>
          );
        })}
      </div>
      <div className="invoice-price-container fixed-bottom">
        <p className="total">total: {total} INR</p>
      </div>
    </>
  );
};
export default Invoice;
