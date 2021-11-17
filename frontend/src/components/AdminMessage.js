import React, { useState } from "react";

function AdminMessage() {
  const [mess, setMess] = useState({
    Messages: [],
  });
  const userRequests = async () => {
    try {
      const res = await fetch("/Message", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setMess({ Messages: data });
    } catch (err) {
      console.log(err);
    }
  };
  userRequests();
  const deleteMessage = async () => {
    try {
      const res = await fetch("/Delete", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();
    } catch (err) {
      console.log(err);
    }
  };
  let but;
  return (
    <>
      <div className="message-notification">Notifications</div>
      <div className="message-container-box">
        {mess.Messages.map((message) => {
          but = message.message;
          return (
            <div className="message-container">
              <p className="message">
                Table {message.table} -- {message.message}
              </p>
            </div>
          );
        })}
      </div>
      <div className="message-delete">
        {but ? (
          <button className="message-delete-button" onClick={() => deleteMessage()}>
            X
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default AdminMessage;
