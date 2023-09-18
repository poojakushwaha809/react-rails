import "./App.css";
import React, { useState } from "react";
import Alert from "./components/Alert";
import ArticleIndex from "./components/ArticleIndex";
import Navbar from "./components/Navbar";
import Show from "./components/Show";
import About from "./components/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [searchValue, setSearchValue] = useState();
  const [alert, setAlert] = useState("");
  const showAlert = (msg, type) => {
    setAlert({
      message: msg,
      type: type,
    });
    // setTimeout(() => {
    //   setAlert("")
    // }, 2500);
  };
  const getSearchValue=(value)=>{
    setSearchValue(value)
  }

  return (
    <>
      <BrowserRouter>
        <Navbar getSearchValue={getSearchValue} />
        <Alert alert={alert} />

        <div className="container my-3">
          <Routes>
            <Route path="/" element={<ArticleIndex showAlert={showAlert} searchValue={searchValue}  />} />

            <Route
              path="/about"
              element={<About/>}
            />
            <Route path={`/show/:articleId`} element={<Show showAlert={showAlert} />} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
