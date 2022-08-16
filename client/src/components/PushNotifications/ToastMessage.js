import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function ToastMessage({title, message, show, setShow}) {
  
  return (
    <div>
      <ToastContainer  className="p-3" position="top-end">
        <Toast show={show} onClose={() => setShow(false)}  delay={3000} autohide>
          <Toast.Header closeButton={true} >
            <strong className="me-auto">{title}</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default ToastMessage;
