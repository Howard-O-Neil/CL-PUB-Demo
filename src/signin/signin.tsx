import React, { ChangeEvent, FormHTMLAttributes, useContext } from "react";
import styles from "./signin.module.scss";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const logo_black = "http://127.0.0.1:3001/img/Logo_Black.png"
const happy_girl = "http://127.0.0.1:3001/img/thumb_up_girl.png"
const vector_9 = "http://127.0.0.1:3001/img/vector_9.png"
const mail = "http://127.0.0.1:3001/img/email.png"
const lock = "http://127.0.0.1:3001/img/lock.png"
import { TextField } from "@mui/material";
import { AppContext } from "@/AppContext";

const SignIn = () => {
    const [appState, dispatch] = useContext(AppContext)
    const navigate = useNavigate()

  return (
    <div className={styles.mainPanel}>

        <img className={styles.curve} src={vector_9}></img>
        <img className={styles.happyGirl} src={happy_girl}></img>

        <div className={styles.welcomeDiv}>
            <div className={styles.header1}>
                <p>Welcome!</p>
            </div>
            <div className={styles.header2}>
                <p>Sign in to your account</p>
            </div>

            <div className={styles.formInput}>
                <div className={styles.email}>
                    <img className={styles.icon} src={mail}></img>

                    <div className={styles.inputTxt}>
                    <TextField style={{width: "100%"}} autoComplete="off" inputProps={{style: {fontSize: 20}, autoComplete: "off"}} InputLabelProps={{style: {fontSize: 20}}} type="text" id="standard-basic" label="Email" variant="standard" />
                    </div>
                </div>
                <div className={styles.pass}>
                    <img className={styles.icon} src={lock}></img>
                    <div className={styles.inputTxt}>
                        <TextField style={{width: "100%"}} autoComplete="off" inputProps={{style: {fontSize: 20}, autoComplete: "off"}} InputLabelProps={{style: {fontSize: 20}}} type="password" id="standard-basic" label="Password" variant="standard" />
                    </div>
                </div>
            </div>

            <div className={styles.forgotpass} onClick={() => dispatch({type: "handle_open_resetForm", value: undefined})}> 
                <p>Forgot Password?</p>
            </div>

            <div className={styles.login} onClick={() => {
                dispatch({type: "update_login", value: undefined});
                dispatch({type: "handle_close_signin", value: undefined});
                navigate("/home");
            }} >
                <p>LOG IN</p>
            </div>
            <div className={styles.signup} onClick={() => dispatch({type: "handle_open_signup", value: undefined})}>
                <p>SIGN UP</p>
            </div>
        </div>
    </div>
  );
};

export default SignIn;
