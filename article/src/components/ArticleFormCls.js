import React, { Component } from "react";

export class ArticleFormCls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertError: "",
      article: {id:"", title: "", body: "", article_no: "", is_active: "" },
    };
    this.changeArticle = this.changeArticle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeArticle(e) {
    const { article } = this.state;
    // console.log(article.title,article.body)
    this.setState({ article: { ...article, [e.target.name]: e.target.value } });
    // console.log(e.target.value)
  }

  handleSubmit(e) {
    const { article } = this.state;
    console.log("dddddddddd",article)
    this.props.handleSubmit(article);
  }

  isSubmitDisabled() {
    const { article } = this.state;
    return article.title.length == 0 || article.article_no <= 0 ? true : false;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.article,"jjjjjjjjjjjj")

    if (prevProps.article !== this.props.article) {
      this.setState({ article: this.props.article });
    }
    if (prevState.article !== this.state.article) {
      if (this.state.article.article_no === "") {
        this.setState({ alertError: "" });
      } else if (this.state.article.article_no <= 0) {
        this.setState({ alertError: "Article No. can't be 0 or negative" });
      } else {
        this.setState({ alertError: "" });
      }
    }
  }

  render() {
    const { article, alertError } = this.state;
    return (
      <div className="container">
        <form>
          <p className="" style={{ fontSize: "15px", color: "red" }}>
            {alertError}
          </p>

          <div className="mb-3 my-3">
            <label htmlFor="article_no" className="form-label">
              Article No.
            </label>
            <input
              type="number"
              className="form-control"
              id="article_no"
              name="article_no"
              value={article.article_no}
              onChange={this.changeArticle}
              min={1}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={article.title}
              onChange={this.changeArticle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="body" className="form-label">
              Body
            </label>
            <input
              type="text"
              className="form-control"
              name="body"
              id="body"
              value={article.body}
              onChange={this.changeArticle}
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary`}
            onClick={this.handleSubmit}
            disabled={this.isSubmitDisabled()}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ArticleFormCls;
