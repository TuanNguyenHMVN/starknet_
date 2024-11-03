// Footer.js
"use client"; // Top of the file for Next.js if you're using hooks or context

import React, { Fragment } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../styles/Footer.module.scss";
import { Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Fragment>
      <Row>
        <Col
          md="3"
          className={`${styles["md-footer"]} d-flex align-items-center justify-content-center`}
        >
          <div
            className={`${styles["menu-links"]} ${styles["footer-links"]} text-center`}
          >
            <a href="/" className={styles["home-link"]}>
              Home
            </a>
            <a href="/staking" className={styles["staking-link"]}>
              Staking
            </a>
            <a href="/faq" className={styles["faq-link"]}>
              FAQs
            </a>
          </div>
        </Col>
        <Col md="6">
          <div className={`${styles["footer-site-name"]} text-center`}>
            <img src='/images/footer-image.svg' />
          </div>
        </Col>
        <Col
          md="3"
          className={`${styles["sm-footer"]} d-flex align-items-center justify-content-center mb-4`}
        >
          <div
            className={`${styles["menu-links"]} ${styles["footer-links"]} text-center`}
          >
            <a href="/" className={styles["home-link"]}>
              Home
            </a>
            <a href="/staking" className={styles["staking-link"]}>
              Staking
            </a>
            <a href="/faq" className={styles["faq-link"]}>
              FAQs
            </a>
          </div>
        </Col>
        <Col
          md="3"
          className="d-flex align-items-center justify-content-center"
        >
          <div className={`${styles["footer-social"]} text-center`}>
            <img src="/images/telegram-icon.svg"/>
            <img src="/images/ri_telegram-fill.svg"/>
            
            {/* <i
              className={`${styles["social-icon"]} m-3 bi bi-telegram telegram-icon cursor-pointer font-24`}
            ></i>
            <i
              className={`${styles["social-icon"]} bi bi-twitter-x font-24 cursor-pointer`}
            ></i> */}
          </div>
        </Col>
      </Row>
      <Row className={styles.authorship}>
        <Col className="text-center">
          <i className="bi bi-c-circle"></i>
          <span>2024 StakeStark. All Rights reserved.</span>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Footer;
