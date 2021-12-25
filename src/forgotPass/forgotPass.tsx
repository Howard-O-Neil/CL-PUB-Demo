import React, { ChangeEvent, FormHTMLAttributes, useContext } from "react";
import styles from "./forgotPass.module.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const logo_black = "http://127.0.0.1:3001/img/Logo_Black.png"
const happy_girl = "http://127.0.0.1:3001/img/thumb_up_girl.png"
const vector_9 = "http://127.0.0.1:3001/img/vector_9.png"
const mail = "http://127.0.0.1:3001/img/email.png"
const lock = "http://127.0.0.1:3001/img/lock.png"
import { Input, TextField } from "@mui/material";
import { AppContext } from "@/AppContext";

const ariaLabel = { 'aria-label': 'description' };

const ForgotPass = () => {
  const [appState, dispatch] = useContext(AppContext)

  return (
    <div className={styles.mainPanel}>

        <img className={styles.curve} src={vector_9}></img>
        <img className={styles.happyGirl} src={happy_girl}></img>

        <div className={styles.welcomeDiv}>
            <div className={styles.header1}>
                <p>Reset your password</p>
            </div>
            <div className={styles.header2}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat accumsan mi eget pellentesque.</p>
            </div>

            <div className={styles.inputTxt}>
                <TextField style={{width: "100%", height: "100%" }} autoComplete="off" inputProps={{style: {fontSize: 20}, autoComplete: "off"}} InputLabelProps={{style: {fontSize: 20}}} type="email" id="standard-basic" label="Type Your Email" variant="filled" size="medium" />
            </div>

            <div className={styles.submit} onClick={() => dispatch({type: "handle_open_signin", value: undefined})}>
                <p>SUBMIT</p>
            </div>
        </div>
    </div>
  );
};

export default ForgotPass;
