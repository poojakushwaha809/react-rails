import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ArticleFormCls from "./ArticleFormCls";
import { ModalCls } from "./ModalCls";
import "./Modal.css";

export class ArticleIndexCls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      article: { id: "", title: "", body: "" },
      title: "",
      data: [],
      alertError: "",
      filteredData: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleArticleTitleDown = this.handleArticleTitleDown.bind(this);
    this.handleArticleTitleUp = this.handleArticleTitleUp.bind(this);
    this.handleArticleNoDown = this.handleArticleNoDown.bind(this);
    this.handleArticleNoUp = this.handleArticleNoUp.bind(this);
    this.fetchMyAPI = this.fetchMyAPI.bind(this)
  }
  //  urll = "http://localhost:3000/articles";
  fetchMyAPI() {
    // let response =  fetch(urll);
    // response =  response.json();
    // this.setState({ data: response });
    // this.setState({ filteredData: response });
    // this.fetchMyAPI();
    // console.log(response)
    axios
      .get(`http://localhost:3000/articles`)
      .then((response) => {
        // console.log(response.data);
        this.setState({ data: response.data });
        this.setState({ filteredData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  componentDidMount() {
    this.fetchMyAPI();
  }

  componentDidUpdate(prevProps) {
    const { filteredData } = this.state;
    if (prevProps.searchValue !== this.props.searchValue) {
      const newData = filteredData.filter((dt) => {
        //if no searchValue the return the original
        if (this.props.searchValue === "") {
          return dt;
        }
        //return the item which contains the user searchValue
        else {
          return dt.title.toLowerCase().includes(this.props.searchValue);
        }
      });
      this.setState({ data: newData });
    }
  }

  handleDelete(articleId) {
    const { filteredData } = this.state;

    axios
      .delete(`http://localhost:3000/articles/${articleId}/destroy`)
      .then((response) => {
        const deleteData = filteredData.filter((data) => {
          return data.id !== response.data.article.id;
        });
        this.setState({ data: deleteData });
        this.props.showAlert(
          ` Artcle No. ${articleId}` + response.data.message,
          "danger"
        );
      })
      .catch((error) => {
        let article_errors = error.response.data.article_errors;
        this.props.showAlert(article_errors, "danger");
      });
  }

  onSubmit(data) {
    const { filteredData, article } = this.state;
    if (article.id) {
      axios
        .put(`http://localhost:3000/articles/${data.id}`, {
          article: { ...data },
        })
        .then((response) => {
          this.props.showAlert(response.data.message, "warning");
          const editData = filteredData.filter((data) => {
            return data.id !== response.data.article.id;
          });
          this.setState({ data: [...editData, response.data.article] });
          this.setState({ showModal: false });
        })
        .catch((error) => {
          let article_errors = error.response.data.article_errors;
          this.setState({ alertError: article_errors });
        });
    } else {
      axios
        .post(`http://localhost:3000/articles`, {
          article: { ...data },
        })
        .then((res) => {
          this.props.showAlert(res.data.message, "success");
          this.setState({ data: [...filteredData, res.data.article] });
          this.setState({ showModal: false });
        })
        .catch((error) => {
          let article_errors = error.response.data.article_errors.map(
            (article_errors) => <div>{article_errors}</div>
          );
          this.setState({ alertError: article_errors });
        });
    }
  }

  handleArticleNoUp() {
    const { data } = this.state;
    this.setState({
      data: [...data].sort((a, b) => a.article_no - b.article_no),
    });
  }
  handleArticleNoDown() {
    const { data } = this.state;

    this.setState({
      data: [...data].sort((a, b) => b.article_no - a.article_no),
    });
  }
  handleArticleTitleUp() {
    const { data } = this.state;

    this.setState({
      data: [...data].sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      ),
    });
  }
  handleArticleTitleDown() {
    const { data } = this.state;

    this.setState({
      data: [...data].sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
      ),
    });
  }
  render() {

    const { data, alertError, title, article, showModal } = this.state;
    // console.log(data);
    console.log(article,"jj116666666666666jjjjjjjj")

    return (
      <>
        <h2 className="text-center">Article Page</h2>
        <div className="app my-3">
          <button
            className="modal-btn btn btn-primary"
            onClick={() => {
              this.setState({ showModal: true });
              this.setState({ article: { title: "", body: "" } });
              this.setState({ title: "Article Form" });
            }}
          >
            Create
          </button>

          <ModalCls
            showModal={showModal}
            handleClose={() => this.setState({ showModal: false })}
          >
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
                      this.setState({ showModal: false });
                      this.setState({ alertError: "" });
                    }}
                  ></i>
                </div>
              </div>
              <div className="card-body">
                <p
                  style={{
                    fontSize: "15px",
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {alertError}
                </p>
                {/* <h5 className="card-title">Light card title</h5> */}
                <ArticleFormCls
                  handleSubmit={this.onSubmit.bind(this)}
                  article={article}
                />
              </div>
            </div>
          </ModalCls>
        </div>
        <table
          className="table table-bordered table-sm text-center"
          style={{ border: "3px rgb(0, 0, 0)" }}
        >
          <thead
            className="table-info table-sm "
            style={{ border: "3px rgb(0, 0, 0)" }}
          >
            <tr>
              <th>
                No.
                <i
                  className="fas fa-sort-numeric-up mx-2"
                  onClick={this.handleArticleNoDown}
                  aria-hidden="true"
                ></i>
                <i
                  className="fa fa-sort-numeric-down"
                  onClick={this.handleArticleNoUp}
                  aria-hidden="true"
                ></i>
              </th>
              <th>
                Title
                <i
                  className="fa fa-sort-alpha-up mx-2"
                  onClick={this.handleArticleTitleUp}
                  aria-hidden="true"
                ></i>
                <i
                  className="fa fa-sort-alpha-down"
                  onClick={this.handleArticleTitleDown}
                  aria-hidden="true"
                ></i>
              </th>
              {/* <th>Body</th> */}
              <th>Show</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {data.map((pooja) => {
            return (
              <tbody key={pooja.id}>
                <tr>
                  <th scope="row">{pooja.article_no}</th>
                  <td>{pooja.title}</td>
                  {/* <td>{pooja.body}</td> */}
                  <td>
                    <Link to={`/show/${pooja.id}`}>
                      <i
                        className="fa fa-eye mx-2"
                        style={{ fontSize: "20px", color: "black" }}
                      ></i>
                    </Link>
                  </td>
                  <td>
                    <i
                      className="modal-btn fa fa-edit mx-2"
                      onClick={() => {
                        this.setState({ showModal: true });
                        this.setState({ title: "Edit From" });
                        setTimeout(() => {
                          this.setState({ article: pooja });
                        }, 50);
                      }}
                      style={{ fontSize: "20px" }}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa fa-trash mx-2"
                      onClick={() => {
                        this.handleDelete(pooja.id);
                      }}
                      style={{ fontSize: "20px", color: "black" }}
                    ></i>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </>
    );
  }
}

export default ArticleIndexCls;
