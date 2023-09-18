import React, { Component } from "react";
import axios from "axios";
// import { withRouter } from "react-router";
// import { withRouter } from "react-router";
import CommentFormCls from "./CommentFormCls";
import { ModalCls } from "./ModalCls";

export class ShowCls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      comments: [],
      commentObj: "",
      showModal: false,
      title: "",
    };
    this.handleDelete =this.handleDelete.bind(this)
    this.onEditClick  = this.onEditClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async fetchMyAPI() {
    const params = { articleId: parseInt(window.location.pathname .split('/')[2]) };
    const urll = `http://localhost:3000/articles/${params.articleId}`;
    let response = await fetch(urll);
    response = await response.json();
    this.setState({ data: response });
  }

  componentDidMount() {
    // console.log(this.props.article,"showwwww",window.location)
    const params = { articleId: parseInt(window.location.pathname .split('/')[2]) };
    // debugger
    const urll = `http://localhost:3000/articles/${params.articleId}`;
    this.fetchMyAPI();
    this.fetchComments();
  }

  fetchComments() {
    // let params = useParams();
    const params = { articleId: parseInt(window.location.pathname .split('/')[2]) };
    axios
      .get(`http://localhost:3000/articles/${params.articleId}/comments`)
      .then((res) => {
        // console.log(res.data, "indedddddddddddddddddxxxxxxxxxxxx");
        this.setState({ comments: res.data });
      })
      .catch((error) => {
        // params.showAlert("Server error", "danger");
      });
  }

  handleSubmit(comment) {
    const params = { articleId: parseInt(window.location.pathname .split('/')[2]) };
    const { commentObj } = this.state;
    this.setState({ showModal: false });

    // console.log("first", "shoeeeeeeeeeeeeee", commentObj,comment.id);
    if (comment.id) {
      // console.log("first",comment)
      axios
        .put(
          `http://localhost:3000/articles/${params.articleId}/comments/${comment.id}`,
          {
            comment: comment.comment,
            commenter: comment.commenter,
          }
        )
        .then((res) => {
          // console.log(res.data);
          this.fetchComments();
          //   props.showAlert(res.data.message, "warning");
        })
        .catch((error) => {
          //   props.showAlert(error.response.data.message, "danger");
        });
    } else {
      axios
        .post(`http://localhost:3000/articles/${params.articleId}/comments`, {
          comment: comment.comment,
          commenter: comment.commenter,
        })
        .then((res) => {
          this.fetchComments();
          //   debugger;
          // console.log(res);
          //   props.showAlert(res.data.message, "success");
        })
        .catch((error) => {
          //   props.showAlert(error.response.data.status, "danger");
          // let article_errors = error.response.data.article_errors.join(" , ");
          // props.showAlert(article_errors, "danger");
        });
    }
  }

  handleDelete(comment) {
    console.log(comment)
    const params = { articleId: parseInt(window.location.pathname .split('/')[2]) };
    axios
      .delete(
        `http://localhost:3000/articles/${params.articleId}/comments/${comment.id}`
      )
      .then((res) => {
        console.log(res.data, "indedddddddddddddddddxxxxxxxxxxxx");
        this.fetchComments();
        // props.showAlert(res.data.message, "danger");
      })
      .catch((error) => {
        // let article_errors = error.response.data.article_errors.join(" , ");
        // props.showAlert(article_errors, "danger");
      });
  }

   onEditClick(cmt) {
    console.log(cmt, 'hhhhhhhhhhhhhhhhhhhh')
      this.setState({ showModal: true });
      // this.setState({ commentObj: cmt })
      setTimeout(() => {this.setState({ commentObj: cmt });}, 50)
      this.setState({ title: "Edit Comment" });
    
  } 

  render() {
    const { comments, data, title, commentObj, showModal } = this.state;
    // console.log(commentObj, 'kkkkkkkkkkkkkkkkkk')
    return (
        <div className="container " key={data.id}>
          <h2 className="text-center my-3">Article</h2>
          <h6>
            <strong>Title:</strong> {data.title}
          </h6>
          <p>
            <strong>Body:</strong> {data.body}
          </p>
          <button
            className="modal-btn btn btn-primary my-4"
            onClick={() => {
              this.setState({ showModal: true });
              this.setState({ commentObj: "" });
              this.setState({ title: "Create Comment" });
            }}
          >
            Add Comment
          </button>
          {showModal &&(<ModalCls
            showModal={showModal}
            handleClose={() => this.setState({ showModal: false })}
          >
            <div
              className="card bg-white mb-3"
              style={{ height: "25rem", width: "35rem" }}
            >
              <div className="card-header">
                <div className="d-flex justify-content-between">
                  <h3 className="p-2">{title}</h3>
                  <i
                    className="fa fa-close close-btn p-2"
                    onClick={() => {
                      this.setState({ showModal: false });
                    }}
                  ></i>
                </div>
              </div>
              <div className="card-body">
                {/* <h5 className="card-title">Light card title</h5> */}
                <CommentFormCls
                  handleSubmit={this.handleSubmit}
                  commentObj={commentObj}
                />
              </div>
            </div>
          </ModalCls>)}
          <h4 className="text-center my-3">Your Comments</h4>
          <table
            className="table table-bordered table-sm"
            style={{ border: "3px rgb(0, 0, 0)" }}
          >
            <thead
              className="table-info"
              style={{ border: "3px rgb(0, 0, 0)" }}
            >
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Comments</th>
                {/* <th scope="col">Body</th> */}
                <th scope="col">Commenter</th>
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
                        onClick={() => {this.onEditClick(comment)}}
                        style={{ fontSize: "20px" }}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fa fa-trash mx-2"
                        onClick={() => {
                          this.handleDelete(comment);
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
      
    );
  }
}

export default ShowCls;
