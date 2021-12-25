import React, { ChangeEvent, FormHTMLAttributes } from "react";
import styles from './App.module.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./AppContext";
import Footer from "./footer/footer";
import Landing from "./landing/landing";
import Home from "./home/home";
import SearchRes from "./searchRes/searchRes";
import CourseDetail from "./courseDetail/courseDetail";

export const CDN_API = "http://127.0.0.1:3001"

const App = () => {
  return (
    <div className={styles.App}>


      {/* <MainGrid childElement={<SignIn />}/> */}
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={<div>Index Page, Please Leave</div>} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchRes />} />
            <Route path="/detail" element={<CourseDetail />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>

    </div>
  )
};

export default App;
