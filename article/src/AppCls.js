import React, { Component } from "react";
import "./App.css";
import AlertCls from "./components/AlertCls";
import ArticleIndexCls from "./components/ArticleIndexCls";
import NavbarCls from "./components/NavbarCls";
import ShowCls from "./components/ShowCls";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export class AppCls extends Component {
    constructor(props){
        super(props);
        this.state={
            searchValue:"",
            alert:""   
        }
    }
     showAlert  (msg, type) {
      this.setState({alert: {
        message: msg,
        type: type,
      }});
      // setTimeout(() => {
      //   setAlert("")
      // }, 2500);
    };
     getSearchValue(value){
      this.setState({searchValue: value})
    }
  render() {
   const {alert,searchValue}=this.state
    return (
      <>
        <BrowserRouter>
          <NavbarCls getSearchValue={this.getSearchValue.bind(this)} />
          <AlertCls alert={alert} />
          <div className="container my-3">
            <Routes>
              <Route
                path="/"
                element={
                  <ArticleIndexCls
                    showAlert={this.showAlert.bind(this)}
                    searchValue={searchValue}
                  />
                }
              />

              <Route
                path={`/show/:articleId`}
                element={<ShowCls showAlert={this.showAlert.bind(this)} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default AppCls;
