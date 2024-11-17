// Footer.js
"use client"; // Top of the file for Next.js if you're using hooks or context

import React, { Fragment } from "react";
import styles from '../styles/Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles["footer-wrapper"]}>
    <footer>
    <div className="footer-container">
      <div className="footer-nav">
        <span>Home</span>
        <span className="nav-separator">|</span>
        <span>Staking</span>
        <span className="nav-separator">|</span>
        <span>FAQs</span>
      </div>
      <div className="footer-logo">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1931.57 462.75"
          width="100%" height="auto"
        >
          <title>starkstake logo</title>
          <text className={styles["cls-1"]} transform="translate(300 300)">
            starkstake_
          </text>
          <text className={styles["cls-2"]} transform="translate(270.65 448.15)">
            starknet’s go to
          </text>
          <text className={styles["cls-3"]} transform="translate(860.29 448.15)">
            liquid staking protocol
          </text>
        </svg>
      </div>
      <div className="social-icons">
        <a href="#" aria-label="Telegram">
          <img src="/images/icon-telegram.svg" placeholder="telegram" />
        </a>
        <a href="#" aria-label="Twitter">
          <img src="/images/icon-twitter.svg" placeholder="telegram" />
        </a>
      </div>
    </div>
    <div className="line" />
  </footer>
  <div className="copyright">© 2024 StakeStark. All Rights reserved.</div>
    </div>
  );
};

export default Footer;
