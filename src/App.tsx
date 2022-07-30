import React, { ChangeEvent } from "react";
import styles from './App.module.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./AppContext";
import { ClPub } from "./clpub/clpub";

export const API_PREFIX = "http://35.194.244.214:8087/"

const App = () => {
  return (
    <div className={styles.App}>


      {/* <MainGrid childElement={<SignIn />}/> */}
      <BrowserRouter>
        <AppProvider>
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
