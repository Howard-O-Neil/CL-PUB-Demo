import React, { ChangeEvent, FormHTMLAttributes } from "react";
import styles from "./footer.module.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const logo_black = "http://127.0.0.1:3001/img/Logo_Black.png"

const Footer = () => {
  return (
    <div className={styles.mainPanel}>

        <div className={styles.flexDiv}>
            <div className={styles.groupDiv}>
                <button className={styles.btn}>Collego Business</button>
                <button className={styles.btn}>Tech on collego</button>
                <button className={styles.btn}>Supported platform</button>
                <button className={styles.btn}>About us</button>
                <button className={styles.btn}>Contact us</button>
            </div>

            <div className={styles.groupDiv}>
                <button className={styles.btn}>Careers</button>
                <button className={styles.btn}>Blog</button>
                <button className={styles.btn}>Help and Support</button>
                <button className={styles.btn}>Affiliate</button>
                <button className={styles.btn}>Investors</button>
            </div>

            <div className={styles.groupDiv}>
                <button className={styles.btn}>Terms</button>
                <button className={styles.btn}>Privacy policy</button>
                <button className={styles.btn}>Sitemap</button>
                <button className={styles.btn}>Accessibility statement</button>
            </div>
        </div>
    
        <img className={styles.icon} src={logo_black} />
        <div className={styles.collegonInc}>© Collegon, Inc.</div>
    </div>
  );
};

export default Footer;
