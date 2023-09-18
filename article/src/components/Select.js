import React, { useState, useEffect } from "react";
import axios from "axios";

const Select = (props) => {
  //   const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState("");

  const changeStatus = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
    props.sendStatus(e.target.value);
  };
  return (
    <div className="mb-3 my-3 ">
      <label htmlFor="article_no" className="form-label">
        Status
      </label>
      <select
        onChange={changeStatus}
        className="form-select"
        name="status_id"
        aria-label="Default select example"
        value={props.status ? props.status : ""}
      >
        <option className="form-control">---- Select ----</option>
        {props.statuses.map((status) => {
          return (
            <option className="form-control" value={status.id} key={status.id}>
              {status.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
