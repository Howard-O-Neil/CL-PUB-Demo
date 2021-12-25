import React, { ChangeEvent, FormHTMLAttributes, useContext } from "react";
import styles from "./signup.module.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const logo_black = "http://127.0.0.1:3001/img/Logo_Black.png"
const happy_girl = "http://127.0.0.1:3001/img/thumb_up_girl.png"
const vector_9 = "http://127.0.0.1:3001/img/vector_9.png"
const mail = "http://127.0.0.1:3001/img/email.png"
const lock = "http://127.0.0.1:3001/img/lock.png"
import { Input, TextField } from "@mui/material";
import { AppContext } from "@/AppContext";

const ariaLabel = { 'aria-label': 'description' };

const SignUp = () => {
  const [appState, dispatch] = useContext(AppContext)

  return (
    <div className={styles.mainPanel}>

        <img className={styles.curve} src={vector_9}></img>
        <img className={styles.happyGirl} src={happy_girl}></img>

        <div className={styles.welcomeDiv}>
            <div className={styles.header1}>
                <p>Welcome!</p>
            </div>
            <div className={styles.header2}>
                <p>Create your account</p>
            </div>

            <div className={styles.formInput}>
                <div className={styles.inputTxt}>
                    <TextField style={{width: "100%" }} autoComplete="off" inputProps={{style: {fontSize: 20}, autoComplete: "off"}} InputLabelProps={{style: {fontSize: 20}}} type="text" id="standard-basic" label="Username" variant="standard" size="medium" />
                </div>
                <div className={styles.inputTxt}>
                    <TextField style={{width: "100%"}} autoComplete="off" inputProps={{style: {fontSize: 20}, autoComplete: "off"}} InputLabelProps={{style: {fontSize: 20}}} type="text" id="standard-basic" label="Email" variant="standard" size="medium" />
                </div>
                <div className={styles.inputTxt}>
                    <TextField style={{width: "100%"}} autoComplete="off" inputProps={{style: {fontSize: 20}, autoComplete: "off"}} InputLabelProps={{style: {fontSize: 20}}} type="password" id="standard-basic" label="Password" variant="standard" size="medium" />
                </div>
                <div className={styles.inputTxt}>
                    <TextField style={{width: "100%"}} autoComplete="off" inputProps={{style: {fontSize: 20}, autoComplete: "off"}} InputLabelProps={{style: {fontSize: 20}}} type="password" id="standard-basic" label="Retype Password" variant="standard" size="medium" />
                </div>
            </div>

            <div className={styles.signup}>
                <p>SIGN UP</p>
            </div>
            <div className={styles.login} onClick={() => dispatch({type: "handle_open_signin", value: undefined})}>
                <p>LOG IN</p>
            </div>
        </div>
    </div>
  );
};

export default SignUp;
