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
        >
          <defs>
            <style
              dangerouslySetInnerHTML={{
                __html:`
                  .cls-1 {
                    font-size: 342.74px;
                    fill: #100857;
                    font-family: 'Adolfine Bold';
                  }
                  .cls-2, .cls-3 {
                    font-size: 68.84px;
                    font-family: 'Adolfine Bold';
                    font-weight: 700;}
                    .cls-3 {
                      fill: #da80a4;}`
              }}
            />
          </defs>
          <title>starkstake logo</title>
          <text className="cls-1" transform="translate(3.05 294.21)">
            starkstake_
          </text>
          <text className="cls-2" transform="translate(270.65 448.15)">
            starknet’s go to
          </text>
          <text className="cls-3" transform="translate(829.29 448.15)">
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
    // <Fragment>
    //   <Row>
    //     <Col
    //       md="3"
    //       className={`${styles["md-footer"]} d-flex align-items-center justify-content-center`}
    //     >
    //       <div
    //         className={`${styles["menu-links"]} ${styles["footer-links"]} text-center`}
    //       >
    //         <a href="/" className={styles["home-link"]}>
    //           Home
    //         </a>
    //         <a href="/staking" className={styles["staking-link"]}>
    //           Staking
    //         </a>
    //         <a href="/faq" className={styles["faq-link"]}>
    //           FAQs
    //         </a>
    //       </div>
    //     </Col>
    //     <Col md="6">
    //       <div className={`${styles["footer-site-name"]} text-center`}>
    //         <img src='/images/new-footer.svg' />
    //       </div>
    //     </Col>
    //     <Col
    //       md="3"
    //       className={`${styles["sm-footer"]} d-flex align-items-center justify-content-center mb-4`}
    //     >
    //       <div
    //         className={`${styles["menu-links"]} ${styles["footer-links"]} text-center`}
    //       >
    //         <a href="/" className={styles["home-link"]}>
    //           Home
    //         </a>
    //         <a href="/staking" className={styles["staking-link"]}>
    //           Staking
    //         </a>
    //         <a href="/faq" className={styles["faq-link"]}>
    //           FAQs
    //         </a>
    //       </div>
    //     </Col>
    //     <Col
    //       md="3"
    //       className="d-flex align-items-center justify-content-center"
    //     >
    //       <div className={`${styles["footer-social"]} text-center`}>
    //         <img src="/images/telegram-icon.svg"/>
    //         <img src="/images/ri_telegram-fill.svg"/>
    //       </div>
    //     </Col>
    //   </Row>
    //   <Row className={styles.authorship}>
    //     <Col className="text-center">
    //       <i className="bi bi-c-circle"></i>
    //       <span>2024 Starkstake. All Rights reserved.</span>
    //     </Col>
    //   </Row>
    // </Fragment>
  );
};

export default Footer;
