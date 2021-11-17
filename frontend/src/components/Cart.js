import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import CartItems from "./CartItem";
import "./css/app.css";
import swal from "sweetalert";

const Cart = ({ title, price, quantity, img }) => {
  let items = [];
  const history = useHistory();
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const [userData, setuserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch("/Home/Cart", {
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
  Object.assign(daata, userData.cart);

  const handleAdd = async () => {
    const addFile = await swal({
      title: "Are you sure?",
      text: "You want to order these items?",
      buttons: true,
      dangerMode: false,
    });
    if (addFile) {
    const res = await fetch(`/Home/Cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
      }),
    });
    const data = await res.json();
    if (data.status === 400) {
      toast.error("Some Error Occured!");
    } else if (data.status === 201) {
      items=[];
      swal("Ordered Successfully", {
        icon: "success",
      });
      // history.push("/home/menu");
    }
  } else {
    swal("Order Canceled!");
  }
  };
  return (
    <>
      <div className="menu-container" style={{paddingBottom:"15vh"}}>
        {daata.map((Data) => {
          items=items.concat({
            title : Data.title,
            quantity : Data.quantity,
            price : Data.price,
            img : Data.img,
          })
          
          return <CartItems key={Data.id} {...Data} />;
        })}
      </div>
        <>
          <h5 className="text-center text-light mb-0 bg-black p-2 align-content-center justify-content-around text-uppercase fw-bold fixed-bottom">
            <button
              id="order"
              className="cart-button text-uppercase"
              onClick={handleAdd}
            >
              Order now
            </button>
          </h5>
        </>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
};
export default Cart;
