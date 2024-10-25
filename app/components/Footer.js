// Footer.js
"use client"; // Top of the file for Next.js if you're using hooks or context

import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../styles/Footer.module.scss";
import { Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Row>
      <Col md="3" className="d-flex align-items-center justify-content-center">
        <div
          className={`${styles["menu-links"]} ${styles["footer-links"]} text-center`}
        >
          <a href="/starknet-demoapp" className={styles["home-link"]}>
            Home
          </a>
          <a
            href="/starknet-demoapp/staking"
            className={styles["staking-link"]}
          >
            Staking
          </a>
          <a href="/starknet-demoapp/faq" className={styles["faq-link"]}>
            FAQs
          </a>
        </div>
      </Col>
      <Col md="6">
        <div className={`${styles["footer-site-name"]} text-center`}>
          <span className={`${styles["site-name"]} font-64`}>stakestark_</span>
          <br />
          <span className={`${styles.subtitle} font-14`}>starknet's to-go</span>
          <br />
          <span className={`${styles["highlight-text"]} font-14`}>
            liquid staking protocol
          </span>
        </div>
      </Col>
      <Col md="3" className="d-flex align-items-center justify-content-center">
        <div className={`${styles["footer-social"]} text-center`}>
          <i
            className={`${styles["social-icon"]} bi bi-telegram telegram-icon cursor-pointer font-24`}
          ></i>
          <i
            className={`${styles["social-icon"]} bi bi-twitter-x font-24 cursor-pointer`}
          ></i>
        </div>
      </Col>
    </Row>
    // <div className={styles["footer-container"]}>
    //   {/* Medium Footer */}
    //   <div className="md-footer d-flex align-items-center justify-content-space-around">
    //     <div
    //       className={`${styles["menu-links"]} ${styles["footer-links"]} text-center`}
    //     >
    //       <a href="/home" className={styles["home-link"]}>
    //         Home
    //       </a>
    //       <a href="/staking" className={styles["staking-link"]}>
    //         Staking
    //       </a>
    //       <a href="/faq" className={styles["faq-link"]}>
    //         FAQs
    //       </a>
    //     </div>
    //     <div className={`${styles["footer-site-name"]} text-center`}>
    //       <span className={`${styles["site-name"]} font-64`}>stakestark_</span>
    //       <br />
    //       <span className={`${styles.subtitle} font-14`}>starknet's to-go</span>
    //       <br />
    //       <span className={`${styles["highlight-text"]} font-14`}>
    //         liquid staking protocol
    //       </span>
    //     </div>
    // <div className={`${styles["footer-social"]} text-right `}>
    //   <i
    //     className={`${styles["social-icon"]} bi bi-telegram telegram-icon cursor-pointer font-24`}
    //   ></i>
    //   <i
    //     className={`${styles["social-icon"]} bi bi-twitter-x font-24 cursor-pointer`}
    //   ></i>
    // </div>
    //   </div>

    //   {/* Small Footer */}
    //   <div className="sm-footer d-flex flex-column align-items-center justify-content-center">
    //     <div className="text-center">
    //       <span className="site-name font-64">stakestark_</span>
    //       <br />
    //       <span className="subtitle font-14">starknet's to-go</span>
    //       <br />
    //       <span className="highlight-text font-14">
    //         liquid staking protocol
    //       </span>
    //     </div>
    //     <div className="text-center footer-links">
    //       <a href="/starknet-demoapp" className={styles["home-link"]}>
    //         Home
    //       </a>
    //       <a
    //         href="/starknet-demoapp/staking"
    //         className={styles["staking-link"]}
    //       >
    //         Staking
    //       </a>
    //       <a href="/starknet-demoapp/faq" className={styles["faq-link"]}>
    //         FAQs
    //       </a>
    //     </div>
    //     <div className="text-right footer-social">
    //       <i className="bi bi-telegram telegram-icon social-icon font-24 cursor-pointer"></i>
    //       <i className="bi bi-twitter-x social-icon font-24 cursor-pointer"></i>
    //     </div>
    //   </div>

    //   {/* Authorship Section */}
    //   <div className="text-center authorship">
    //     <i className="bi bi-c-circle"></i>
    //     <span>2024 StakeStark. All Rights reserved.</span>
    //   </div>
    // </div>
  );
};

export default Footer;
