import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import { Modal } from "./Modal";
import Select from "./Select";
import { getStatus } from "../utils/index";
// import CommentFormCls from "./CommentFormCls";

const Show = (props) => {
  const params = useParams();
  const [data, dataSet] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentObj, setCommentObj] = useState();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [statuses, setStatuses] = useState([]);
const [publishers, setPublishers] = useState([]);
  function fetchComments() {
    axios
      .get(`http://localhost:3000/articles/${params.articleId}/comments`)
      .then((res) => {
        // console.log(res.data, "indedddddddddddddddddxxxxxxxxxxxx");
        setComments(res.data);
      })
      .catch((error) => {
        params.showAlert("Server error", "danger");
      });
  }

  useEffect(() => {
    // Fechting article id
    const urll = `http://localhost:3000/articles/${params.articleId}/asheesh`;
    async function fetchMyAPI() {
      let response = await fetch(urll);
      response = await response.json();
      console.log(response, "lllllllllllllllllllll");
      dataSet(response.article);
      setPublishers(response.article_publisher)
    }
    fetchMyAPI();

    // Fechting article all comments
    fetchComments();

    // Fechting all status
    axios
      .get(`http://localhost:3000/statuses`)
      .then((response) => {
        // console.log(" statussssss", response.data);
        setStatuses(response.data);
      })
      .catch((error) => {
        console.log(error, "statussssss");
        // let article_errors = error.response.data.article_errors;
        // setAlertError(article_errors);
      });

  }, []);

  const handleSubmit = (comment) => {
    setShowModal(false);

    // console.log("first", "shoeeeeeeeeeeeeee", comment);
    if (commentObj.id) {
      // console.log("first",commentObj)
      axios
        .put(
          `http://localhost:3000/articles/${params.articleId}/comments/${commentObj.id}`,
          {
            status_id: status,
            comment: comment.comment,
            commenter: comment.commenter,
          }
        )
        .then((res) => {
          console.log(res.data);
          fetchComments();
          props.showAlert(res.data.message, "warning");
        })
        .catch((error) => {
          props.showAlert(error.response.data.message, "danger");
        });
    } else {
      axios
        .post(`http://localhost:3000/articles/${params.articleId}/comments`, {
          status_id: status,
          comment: comment.comment,
          commenter: comment.commenter,
        })
        .then((res) => {
          fetchComments();
          // debugger;
          console.log(res);
          props.showAlert(res.data.message, "success");
        })
        .catch((error) => {
          props.showAlert(error.response.data.status, "danger");

          // let article_errors = error.response.data.article_errors.join(" , ");
          // props.showAlert(article_errors, "danger");
        });
    }
  };

  const handleDelete = (comment) => {
    axios
      .delete(
        `http://localhost:3000/articles/${params.articleId}/comments/${comment.id}`
      )
      .then((res) => {
        console.log(res.data, "indedddddddddddddddddxxxxxxxxxxxx");
        fetchComments();
        props.showAlert(res.data.message, "danger");
      })
      .catch((error) => {
        // let article_errors = error.response.data.article_errors.join(" , ");
        // props.showAlert(article_errors, "danger");
      });
  };

  const sendStatus = (status) => {
    console.log(status, "stus");
    setStatus(status);
  };
  // console.log(comment, "pppppppppppp");
  return (
    <>
      <div className="container ">
        <h2 className="text-center my-3">Article</h2>
        <h6>
          <strong>Title:</strong> {data.title}
        </h6>
        <p>
          <strong>Body:</strong> {data.body}
        </p>
        <h2 className="text-center my-3">Publishers</h2>
        <ul>{publishers.map((pb)=>{return <li>{pb.name}</li>})}</ul>

        <button
          className="modal-btn btn btn-primary my-4"
          onClick={() => {
            setShowModal(true);
            setCommentObj("");
            setTitle("Create Comment");
          }}
        >
          Add Comment
        </button>
        <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
          <div
            className="card bg-white mb-3"
            style={{ height: "32rem", width: "40rem" }}
          >
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h3 className="p-2">{title}</h3>
                <i
                  className="fa fa-close close-btn p-2"
                  onClick={() => {
                    setShowModal(false);
                  }}
                ></i>
              </div>
            </div>
            <div className="card-body">
              {/* <h5 className="card-title">Light card title</h5> */}
              <Select
                sendStatus={sendStatus}
                statuses={statuses}
                status={status}
              />
              <CommentForm
                handleSubmit={handleSubmit}
                commentObj={commentObj}
              />
            </div>
          </div>
        </Modal>
        <h4 className="text-center my-3">Your Comments</h4>
        <table
          className="table table-bordered table-sm"
          style={{ border: "3px rgb(0, 0, 0)" }}
        >
          <thead className="table-info" style={{ border: "3px rgb(0, 0, 0)" }}>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Comments</th>
              <th scope="col">Commenter</th>
              <th scope="col">Status</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          {comments.map((comment) => {
            return (
              <tbody key={comment.id}>
                <tr>
                  <th scope="row">{comment.id}</th>
                  <td>{comment.comment}</td>
                  <td>{comment.commenter}</td>
                  <td>{getStatus(statuses, comment)}</td>
                  {/* <td>
                              <Link to={`/show/${pooja.id}`}>
                                <i
                                  className="fa fa-eye mx-2"
                                  style={{ fontSize: "20px", color: "black" }}
                                ></i>
                              </Link>
                            </td> */}
                  <td>
                    <i
                      className="modal-btn fa fa-edit mx-2"
                      onClick={() => {
                        setShowModal(true);
                        setCommentObj(comment);
                        setTitle("Edit Comment");
                        setStatus(comment.status_id);
                      }}
                      style={{ fontSize: "20px" }}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa fa-trash mx-2"
                      onClick={() => {
                        handleDelete(comment);
                      }}
                      style={{ fontSize: "20px", color: "black" }}
                    ></i>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Show;
