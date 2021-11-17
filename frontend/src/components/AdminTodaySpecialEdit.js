import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "../components/css/app.css";
import swal from "sweetalert";

const AdminTodaySpecialEdit = (title) => {
  const history = useHistory();
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const [userData, setuserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/AdminTodaySpecialEdit", {
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
      history.push("/AdminRegister");
      console.log(err);
    }
  };
    callAboutPage();

  let daata = [];
  Object.assign(daata, userData);
  const handleClick = () => {
    return (document.location.href = daata.img);
  };
  const handleDelete = async (title) => {
    const deleteFile = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (deleteFile) {
      const res = await fetch(`/AdminTodaySpecialEdit/Delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      });
      const data = await res.json();
      if (data.status === 400) {
        toast.error("Some Error Occured!");
      } else if (data.status === 201) {
        swal("Poof! Menu Item has been deleted!", {
          icon: "success",
        });
      }
    } else {
      swal("Your Item is safe!");
    }  };
  return (
    <div className="menu-body">
      <div className="menu-container">
        {daata.map((currItem, index) => {
          return (
            <div className="menu-box">
              <div className="menu-image-container">
                <img
                  src={currItem.img}
                  alt="jsx-a11y/alt-text"
                  className="menu-image"
                  onClick={handleClick}
                />
                <button
                  className="menu-image-button"
                  onClick={() => handleDelete(daata[index].title)}
                >
                  DELETE
                </button>
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
                  {currItem.description}
                </div>
                <h5 className="menu-box-price">
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
                <button
                  className="menu-box-button menu-box-btn"
                  onClick={() => handleDelete(daata[index].title)}
                >
                  DELETE
                </button>
              </p>
            </div>
          );
        })}
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
      </div>
    </div>
  );
};

export default AdminTodaySpecialEdit;
