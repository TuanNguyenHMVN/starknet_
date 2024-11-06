"use client";
import React, { useState, useEffect } from "react";
import useStore from "../store/useStore";
import styles from "../styles/WithdrawForm.module.scss";
import { Row, Col, Button, InputGroup, Form } from "react-bootstrap";

const WithdrawForm = ({}) => {
  const { availableWithdrawBalance, getPendingWithdraws , pendingWithdraws, availableRequests } = useStore();
  const [isRequest, setIsRequest] = useState(true);
  const [isClaim, setIsClaim] = useState(false);

  const handleAction = (action) => {
    if (action == "Request") {
      setIsRequest(true);
      setIsClaim(false);
    } else if (action == "Claim") {
      setIsClaim(true);
      setIsRequest(false);
      getPendingWithdraws();
    }
  };
  const { wallet } = useStore();

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    setWalletAddress(wallet.address || "");
  }, [wallet]);
  return (
    <div className={styles["withdraw-form-container"]}>
      <Row>
        <Col md="12" className="p-0">
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
          <div>{availableWithdrawBalance} STRK</div>
          <div className={styles["wallet-info"]}>
            {`${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}`}{" "}
          </div>
        </Col>
        {isClaim && (
          <Col md="12" className={styles["count-request"]}>
            <i className="bi bi-check-circle"></i> {availableRequests} <span>Ready To Claim</span>{" "}
            |{" "}
            <i
              className={`${styles["pending-icon"]} bi bi-clock clock-icon `}
            ></i>{" "}
            {pendingWithdraws} <span>Pending</span>
          </Col>
        )}
        <Col md="12" className={styles.label}>
          <b>Amount To Withdraw</b>
        </Col>
        <Col md="12" className="p-0">
          <InputGroup className={`${styles["withdraw-input"]} d-flex align-items-center justify-content-between p-0`}>
            <Form.Control
              type="number"
              value="0"
              className={styles["stake-input"]}
            />
            <div className={`${styles['combo-input-btn']} d-flex align-items-center justify-content-center`}>
              <div className={`${styles["max-stake-btn"]} cursor-pointer`}>
                <b>Max.</b>
              </div>
              <img src="/images/starknet-icon.svg" />
              <span>STRK</span>
            </div>
          </InputGroup>
        </Col>
        {/* <Col
          md="12"
          className={`${styles["amount-to-withdraw"]} d-flex align-items-center justify-content-between`}
        >
          <div>$0.00</div>
          <div className="d-flex align-items-center justify-content-center">
            <div className={`${styles["max-stake-btn"]} cursor-pointer`}>
              <b>Max.</b>
            </div>
            <img src="/images/starknet-icon.svg" />
            <span>STRK</span>
          </div>
        </Col> */}
        <Col md="12" className="p-0">
          <Button variant="primary" className={styles["withdraw-btn"]}>
            Withdraw Now
          </Button>
        </Col>
        <Col md="12" className={`${styles.description} font-14 height-63`}>
          *Please note that unstaking might take some time due to network
          conditions. Your staking rewards will stop accruing once the unstaking
          process begins.
        </Col>
      </Row>
    </div>
  );
};

export default WithdrawForm;
