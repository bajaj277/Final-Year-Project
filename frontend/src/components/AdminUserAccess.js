import React, { useState, useContext } from "react";
// eslint-disable-next-line
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { Dropdown } from "react-bootstrap";

const AdminUserAccess = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);

  const [userData, setuserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/AdminUserAccess", {
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
      console.log(err);
    }
  };
  callAboutPage();
  let daata = [];
  let total = 0;
  let totals = [];
  let tables1 = [];

  Object.assign(daata, userData);
  let length = daata.length;
  let i = 0;
  for (i = 0; i < length; i++) {
    let j = 0;
    let items = [];
    for (j = 0; j < daata[i].invoice.length; j++) {
      total = total + daata[i].invoice[j].price * daata[i].invoice[j].quantity;
      items = items.concat({
        item: daata[i].invoice[j].title,
        quantity: daata[i].invoice[j].quantity,
      });
    }
    totals = totals.concat({
      table: daata[i].table,
      total: total,
      items: items,
    });
    total = 0;
  }
  totals.sort((a, b) => {
    return a.table - b.table;
  });
  const sort = () => {
    let j = 0;
    let k = 0;
    for (j = 0; j < totals.length; j++) {
      if (j === 0) {
        tables1 = tables1.concat({
          table: totals[j].table,
          total: totals[j].total,
          items: totals[j].items,
        });
        k = k + 1;
      } else {
        if (totals[j].table === totals[j - 1].table) {
          tables1[k - 1].total = tables1[k - 1].total + totals[j].total;
          tables1[k - 1].items = tables1[k - 1].items.concat(totals[j].items);
        } else {
          tables1 = tables1.concat({
            table: totals[j].table,
            total: totals[j].total,
            items: totals[j].items,
          });
          k = k + 1;
        }
      }
    }
  };
  sort();
  function SortArray(x, y) {
    if (x.item < y.item) {
      return -1;
    }
    if (x.item > y.item) {
      return 1;
    }
    return 0;
  }
  for (let a = 0; a < tables1.length; a++) {
    let axe = [];
    let axe1 = [];
    let k = 0;
    for (let b = 0; b < tables1[a].items.length; b++) {
      axe = axe.concat({
        item: tables1[a].items[b].item,
        quantity: tables1[a].items[b].quantity,
      });
    }
    axe.sort(SortArray);
    for (let c = 0; c < axe.length; c++) {
      if (c === 0) {
        axe1 = axe1.concat({
          item: axe[c].item,
          quantity: axe[c].quantity,
        });
        k += 1;
      } else {
        if (axe[c].item === axe[c - 1].item) {
          axe1[k - 1].quantity += axe[c].quantity;
        } else {
          axe1 = axe1.concat({
            item: axe[c].item,
            quantity: axe[c].quantity,
          });
          k += 1;
        }
      }
    }
    tables1[a].items = axe1;
  }
  const DeleteTable = async (table) => {
    const deleteFile = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (deleteFile) {
      const res = await fetch(`/AdminUserAccess`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table: table,
        }),
      });
      const data = await res.json();
      if (data.status === 400) {
        toast.error("Some Error Occured!");
      } else if (data.status === 201) {
        swal("Table Deleted Successfully", {
          icon: "success",
        });
      }
    } else {
      swal("Table is safe!");
    }
  };
  return (
    <>
      <div className="user-table-container">
        {tables1.map((data, index) => {
          let it = data.items;
          return (
            <div className="user-table">
              <div className="user-table-no">table- {data.table}</div>
              <div className="user-table-no">total- {data.total} INR</div>
              <div className="user-table-info">
                <Dropdown>
                  <Dropdown.Toggle variant="success">&#8505;</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {it.map((dat) => {
                      return (
                        <Dropdown.Item>
                          {dat.quantity}x {dat.item}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <button
                className="user-table-button"
                onClick={() => {
                  DeleteTable(tables1[index].table);
                }}
              >
                clean Table
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AdminUserAccess;
