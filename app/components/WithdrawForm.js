"use client";
import React, { useState } from "react";
import styles from "../styles/WithdrawForm.module.scss";
import { Row, Col, Button } from "react-bootstrap";

const WithdrawForm = ({}) => {
  const [isRequest, setIsRequest] = useState(true);
  const [isClaim, setIsClaim] = useState(false);

  const handleAction = (action) => {
    if (action == "Request") {
      setIsRequest(true);
      setIsClaim(false);
    } else if (action == "Claim") {
      setIsClaim(true);
      setIsRequest(false);
    }
  };
  return (
    <div className={styles["withdraw-form-container"]}>
      <Row>
        <Col md="12">
          <div className={`${styles["withdraw-combo-btn"]} mb-3`}>
            <Button
              variant={isRequest ? "primary" : "secondary"}
              onClick={() => handleAction("Request")}
            >
              Request
            </Button>
            <Button
              variant={isClaim ? "primary" : "secondary"}
              onClick={() => handleAction("Claim")}
            >
              Claim
            </Button>
          </div>
        </Col>
        <Col md="12" className={styles.label}>
          <b>Available Funds</b>
        </Col>
        <Col
          md="12"
          className={`${styles["available-funds"]} d-flex align-items-center justify-content-between`}
        >
          <div>213.00 STRK</div>
          <div className={styles["wallet-info"]}>
            0xrht...90J <img src="/images/token-icon.svg" />
          </div>
        </Col>
        {isClaim && (
          <Col md="12" className={styles["count-request"]}>
            <i className="bi bi-check-circle"></i> 2 <span>Ready To Claim</span>{" "}
            |{" "}
            <i
              className={`${styles["pending-icon"]} bi bi-clock clock-icon `}
            ></i>{" "}
            5 <span>Pending</span>
          </Col>
        )}
        <Col md="12" className={styles.label}>
          <b>Amount To Withdraw</b>
        </Col>
        <Col
          md="12"
          className={`${styles["amount-to-withdraw"]} d-flex align-items-center justify-content-between`}
        >
          <div>$0.00</div>
          <div class="d-flex align-items-center justify-content-center">
            <div className={`${styles["max-stake-btn"]} cursor-pointer`}>
              <b>Max.</b>
            </div>
            <img src="/images/starknet-icon.svg" />
            <span>STRK</span>
          </div>
        </Col>
        <Col md="12">
          <Button variant="primary" className={styles["withdraw-btn"]}>
            Withdraw Now
          </Button>
        </Col>
        <Col md="12" className={`${styles.description} font-12`}>
          *Please note that unstaking might take some time due to network
          conditions. Your staking rewards will stop accruing once the unstaking
          process begins.
        </Col>
        {/* <Col md="12" className={styles.label}>
          <b>Available To Stake</b>
        </Col>
        <Col
          md="12"
          className={`${styles["available-to-stake-input"]} d-flex align-items-center justify-content-between`}
        >
          <div>213.00 STRK</div>
          <div className={styles["wallet-info"]}>
            abababa <img src="/images/token-icon.svg" />
          </div>
        </Col>
        <Col md="12" className={styles.label}>
          <b>Amount To Stake</b>
        </Col>
        <Col
          md="12"
          className={`${styles["amount-to-stake-input"]} d-flex align-items-center justify-content-between`}
        >
          <div>$0.00</div>
          <div class="d-flex align-items-center justify-content-center">
            <div className={`${styles["max-stake-btn"]} cursor-pointer`}>
              <b>Max.</b>
            </div>
            <img src="/images/starknet-icon.svg" />
            <span>STRK</span>
          </div>
        </Col>
        <Col md="12" className={styles.label}>
          <b>Estimated Rewards</b>
        </Col>
        <Col
          md="12"
          className={`${styles["estimated-reward-input"]} d-flex align-items-center justify-content-between`}
        >
          <div>---</div>
          <div>
            <img src="/images/starknet-icon.svg" />
            <span>dstSTRK</span>
          </div>
        </Col>
        <Col md="12" className={`${styles.description} font-10`}>
          *By staking, you agree to lock your tokens for a specified period. You
          will earn rewards during this time, and your dstSTRK tokens will
          represent your staked assets.
        </Col> */}
      </Row>
    </div>
  );
};

export default WithdrawForm;