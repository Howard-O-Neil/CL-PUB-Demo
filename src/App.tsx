import React, { ChangeEvent } from "react";
import styles from './App.module.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./AppContext";
import Footer from "./footer/footer";
import Landing from "./landing/landing";
import Home from "./home/home";
import SearchRes from "./searchRes/searchRes";
import CourseDetail from "./courseDetail/courseDetail";
import { ClPub } from "./clpub/clpub";

export const API_PREFIX = "http://34.81.149.110:8087/"

const App = () => {
  return (
    <div className={styles.App}>


      {/* <MainGrid childElement={<SignIn />}/> */}
      <BrowserRouter>
        <AppProvider children={undefined}>
          <Routes>
            <Route path="/" element={<div>Index page, please leave</div>} />
            <Route path="/cl" element={<ClPub />} />
            {/* <Route path="/landing" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchRes />} />
            <Route path="/detail" element={<CourseDetail />} /> */}
          </Routes>
        </AppProvider>
      </BrowserRouter>

    </div>
  )
};

export default App;
