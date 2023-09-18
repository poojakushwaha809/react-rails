import React, { useState, useEffect } from "react";
import Select from "./Select";
import MultiCheckbox from "./MultiCheckbox";
// import axios from "axios";

const ArticleForm = (props) => {
  const [alertError, setAlertError] = useState("");
  // const [status, setStatus] = useState();
  const [article, setArticle] = useState({
    title: "",
    body: "",
    article_no: "",
    status_id: "",
    is_active: "",
  });
  const changeArticle = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // e.preventDefault()
    props.handleSubmit(article);

    // closeForm.current.click();
  };
  useEffect(() => {
    if (props.article) {
      setArticle(props.article);
    }
  }, [props.article]);

  const isSubmitDisabled = () => {
    return article.title.length === 0 || article.article_no <= 0 ? true : false;
  };

  useEffect(() => {
    // console.log("ffffffff", typeof article.article_no);
    if (article.article_no === "") {
      setAlertError("");
    } else if (article.article_no <= 0) {
      setAlertError("Article No. can't be 0 or negative");
    } else {
      setAlertError("");
    }
  }, [article.article_no]);

  const sendStatus = (onChangeStatus) => {
    console.log(onChangeStatus,"pooojaaaaaaaaaaaaaaa")
    props.onChangeStatus(onChangeStatus)
  };

  const sendSelectedPublisher=(selectedPublisher)=>{
    props.sendSelectedPublisher(selectedPublisher)
  }
// console.log(props.publishers,"articleForm")
  return (
    <div className=" row container">
      <form>
        <p className="" style={{ fontSize: "15px", color: "red" }}>
          {alertError}
        </p>
        <div className="row">
        <div className="col-md-6"><Select sendStatus={sendStatus} statuses={props.statuses} status={props.status}/></div>
        <div className="mb-3 my-3 col-md-6">
          <label htmlFor="article_no" className="form-label">
            Article No.
          </label>
          <input
            type="number"
            className="form-control"
            id="article_no"
            name="article_no"
            value={article.article_no}
            onChange={changeArticle}
            min={1}
          />
        </div>
        </div>
        <div className="row">
        <div className="mb-3 col-md-6">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={article.title}
            onChange={changeArticle}
          />
        </div>

        <div className="mb-3 col-md-6">
          <label htmlFor="body" className="form-label">
            Body
          </label>
          <input
            type="text"
            className="form-control"
            name="body"
            id="body"
            value={article.body}
            onChange={changeArticle}
          />
        </div>
        </div>
        <div className="mb-3 "><MultiCheckbox publishers={props.publishers} selectePublishers={props.selectePublishers} sendSelectedPublisher={sendSelectedPublisher} /></div>
        <button
          type="submit"
          className={`btn btn-primary`}
          onClick={handleSubmit}
          disabled={isSubmitDisabled()}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
