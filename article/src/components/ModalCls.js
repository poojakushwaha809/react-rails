import React, { Component } from "react";
// import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

export class ModalCls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }
 
//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

  componentDidMount() {
    //  working as useEffect setMounted(true) load only one time
    this.setState({ mounted: true });
    console.log("componentDidMount")
  }
  componentWillUnmount() {
    //  working as useEffect return () => setMounted(false);
    this.setState({ mounted: false });
    console.log("componentWillUnmount")

  }

//   componentDidUpdate() {
//     this.setMounted(true);
//     return () => this.setMounted(false);
//   }

  render() {
    // console.log("ffffffffffffffffffffffffffffffffffffff")
    const {showModal,children}=this.props
    const {mounted}= this.state

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
  }
}

export default ModalCls;
