import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
 
export const Modal = ({ children, showModal, handleClose }) => {
  const [mounted, setMounted] = useState(false);
 
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
 
  const modalContent = showModal ? (
    <div className="modal-container">
      <div className="modal-content">
        <div>{children}</div>
        {/* <button onClick={handleClose} className="close-btn btn btn-danger">
            <h5>Close</h5>
        </button> */}
      </div>
    </div>
  ) : null;
 
  if (mounted) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("portal-root")
    );
  } else {
    return null;
  }
};
