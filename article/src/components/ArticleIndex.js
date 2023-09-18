import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ArticleForm from "./ArticleForm";
import { Modal } from "./Modal";
import "./Modal.css";
import { getStatus } from "../utils/index";
// import ArticleFormCls from "./ArticleFormCls";
// import Alert from "./Alert";

const ArticleIndex = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [article, setArticle] = useState({
    id: "",
    title: "",
    article_no: "",
    body: "",
    status_id: "",
  });
  const [title, setTitle] = useState("");
  const [data, dataSet] = useState([]);
  const [alertError, setAlertError] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [status, setStatus] = useState("");
  const [selectePublisher, setSelectePublisher] = useState([]);
  const [selectePublishers, setSelectePublishers] = useState([]);
console.log(selectePublisher, 'selectePublisherselectePublisher')

  // feching alll articles
  const urll = "http://localhost:3000/articles";
  async function fetchMyAPI() {
    let response = await fetch(urll);
    response = await response.json();
    console.log(response, "allllllllll article");
  
    dataSet(response);
    setFilteredData(response);
  }


  useEffect(() => {
    fetchMyAPI();
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

    axios
      .get(`http://localhost:3000/publishers.json`)
      .then((response) => {
        console.log(" statussssss", response.data);
        setPublishers(response.data);
      })
      .catch((error) => {
        console.log(error, "statussssss");
        // let article_errors = error.response.data.article_errors;
        // setAlertError(article_errors);
      });
  }, []);

  useEffect(() => {
    const newData = filteredData.filter((dt) => {
      //if no searchValue the return the original
      if (props.searchValue === "") {
        return dt;
      }
      //return the item which contains the user searchValue
      else {
        return dt.title.toLowerCase().includes(props.searchValue);
      }
    });
    dataSet(newData);
  }, [props.searchValue]);

  const handleDelete = (articleId) => {
    axios
      .delete(`http://localhost:3000/articles/${articleId}/destroy`)
      .then((response) => {
        const deleteData = filteredData.filter((data) => {
          return data.id !== response.data.article.id;
        });
        dataSet(deleteData);
        props.showAlert(
          ` Artcle No. ${articleId}` + response.data.message,
          "danger"
        );
      })
      .catch((error) => {
        let article_errors = error.response.data.article_errors;
        props.showAlert(article_errors, "danger");
      });
  };

  const onSubmit = (data) => {
    if (article.id) {
      const payloadData= {
        article: { ...data, status_id: status,publishers: selectePublisher
        },
      }
      
      console.log(payloadData,"pppppppppppppppppp")
debugger
      axios
        .put(`http://localhost:3000/articles/${data.id}`,payloadData)
        .then((response) => {
          console.log(response.data,"hellllooooooooooooo")
          props.showAlert(response.data.message, "warning");
          const editData = filteredData.filter((data) => {
            return data.id !== response.data.article.id;
          });
          dataSet([...editData, response.data.article]);
          setShowModal(false);
        })
        .catch((error) => {
          let article_errors = error.response.data.article_errors;
          setAlertError(article_errors);
        });
    } else {
      const payloadData = {
        article: {
          ...data,
          status_id: status,
          selected_publisher: selectePublisher,
        },
      }
      axios
        .post(`http://localhost:3000/articles`, payloadData)
        .then((res) => {
          props.showAlert(res.data.message, "success");
          dataSet([...filteredData, res.data.article]);
          console.log(res.data.article.status_id);

          setShowModal(false);
        })
        .catch((error) => {
          let article_errors = error.response.data.article_errors.map(
            (article_errors) => <div>{article_errors}</div>
          );
          setAlertError(article_errors);
        });
    }
  };
  // console.log(status.id,"===",data.status_id)
  const handleArticleNoUp = () => {
    dataSet([...data].sort((a, b) => a.article_no - b.article_no));
  };
  const handleArticleNoDown = () => {
    dataSet([...data].sort((a, b) => b.article_no - a.article_no));
  };
  const handleArticleTitleUp = () => {
    dataSet(
      [...data].sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      )
    );
  };
  const handleArticleTitleDown = () => {
    dataSet(
      [...data].sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
      )
    );
  };
  const onChangeStatus = (onChangeStatus) => {
    setStatus(onChangeStatus);
    console.log(onChangeStatus,"onChangeStatusonChangeStatus",statuses)
  };

  const sendSelectedPublisher = (selectedPublisher) => {
    console.log()
    setSelectePublisher(selectedPublisher);
  };
  const clickEdit=(pooja) => {
    setShowModal(true);
    setTitle("Edit From");
    setArticle(pooja);
    setStatus(pooja.status_id);
    setSelectePublishers(pooja.publishers)
    const pubData = pooja.publishers.map(pub => {
     return {key: pub.name, id: pub.id}
    })
    setSelectePublisher(pubData)
    console.log(pooja.publishers,"https://ww")
  }
  const clickCreate= () => {
    setShowModal(true);
    setArticle({ title: "", body: "", article_no: "",status_id:"" });
    setTitle("Article Form");
    setSelectePublishers([])
    setStatus("");

  }
  return (
    <>
      <h2 className="text-center">Article Page</h2>
      <div className="app my-3">
        <button
          className="modal-btn btn btn-primary"
          onClick={() => {clickCreate()}}
        >
          Create
        </button>

        <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
          <div
            className="card bg-white mb-3"
            style={{ height: "100%", width: "40rem", maxWidth: "50rem" }}
          >
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h3 className="p-2">{title}</h3>
                <i
                  className="fa fa-close close-btn p-2"
                  onClick={() => {
                    setShowModal(false);
                    setAlertError("");
                  }}
                ></i>
              </div>
            </div>
            <div className="card-body">
              <p
                style={{ fontSize: "15px", color: "red", fontStyle: "italic" }}
              >
                {alertError}
              </p>
              {/* <h5 className="card-title">Light card title</h5> */}
              <ArticleForm
                handleSubmit={onSubmit}
                article={article}
                statuses={statuses}
                publishers={publishers}
                onChangeStatus={onChangeStatus}
                status={status}
                sendSelectedPublisher={sendSelectedPublisher}
                selectePublishers={selectePublishers}/>
            </div>
          </div>
        </Modal>
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
                onClick={handleArticleNoDown}
                aria-hidden="true"
              ></i>
              <i
                className="fa fa-sort-numeric-down"
                onClick={handleArticleNoUp}
                aria-hidden="true"
              ></i>
            </th>
            <th>
              Title
              <i
                className="fa fa-sort-alpha-up mx-2"
                onClick={handleArticleTitleUp}
                aria-hidden="true"
              ></i>
              <i
                className="fa fa-sort-alpha-down"
                onClick={handleArticleTitleDown}
                aria-hidden="true"
              ></i>
            </th>
            <th>Status</th>
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
                <td>{getStatus(statuses, pooja)}</td>
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
                    onClick={() => {clickEdit(pooja)}}
                    style={{ fontSize: "20px" }}
                  ></i>
                </td>
                <td>
                  <i
                    className="fa fa-trash mx-2"
                    onClick={() => {
                      handleDelete(pooja.id);
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
};

export default ArticleIndex;
