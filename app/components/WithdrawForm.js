"use client";
import React, { useState, useEffect } from "react";
import useStore from "../store/useStore";
import styles from "../styles/WithdrawForm.module.scss";
import { Row, Col, Button, InputGroup, Form } from "react-bootstrap";
import { useDebounce } from "../hooks/useDebounce";

const WithdrawForm = ({}) => {
  const { wallet, availableWithdrawBalance, getPendingWithdraws , estimatedWithdrawal, getEstimatedReward, allWithdrawalRequests, availableWithdrawalRequests } = useStore();

  const [isRequest, setIsRequest] = useState(true);
  const [isClaim, setIsClaim] = useState(false);

  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const debouncedValue = useDebounce(amount, 100);


  useEffect(() => {
    if (debouncedValue) {
      getEstimatedReward(amount, 'withdraw')
    }
  }, [debouncedValue]);

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

  const onRequestWithdrawal = () => {
    requestWithdrawal(amount.value)
    setAmount(0)
  }

  const handleInput = (e) => {
    setAmount(e.target.value)
  }

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
          <b>Withdrawable Amount</b>
        </Col>
        <Col
          md="12"
          className={`${styles["available-funds"]} d-flex align-items-center justify-content-between`}
        >
          <div>{availableWithdrawBalance} stSTRK</div>
          <div className={styles["wallet-info"]}>
            {`${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}`}{" "}
          </div>
        </Col>
        {isClaim && (
          <Col md="12" className={styles["count-request"]}>
            <i className="bi bi-check-circle"></i> {availableWithdrawalRequests} <span>Ready To Claim</span>{" "}
            |{" "}
            <i
              className={`${styles["pending-icon"]} bi bi-clock clock-icon `}
            ></i>{" "}
            {allWithdrawalRequests - availableWithdrawalRequests} <span>Pending</span>
          </Col>
        )}
        <Col md="12" className={styles.label}>
          <b>Amount To Withdraw</b>
        </Col>
        <Col md="12" className="p-0">
          <InputGroup className={`${styles["withdraw-input"]} d-flex align-items-center justify-content-between p-0`}>
            <Form.Control
              type="number"
              value={amount}
              max={availableWithdrawBalance}
              onChange={(e) => handleInput(e)}
              className={styles["stake-input"]}
            />
            <div className={`${styles['combo-input-btn']} d-flex align-items-center justify-content-center`}>
              <Button className={`${styles["max-stake-btn"]} cursor-pointer`} disabled={availableWithdrawBalance == 0}>
                <b>Max.</b>
              </Button>
              <img src="/images/starknet-icon.svg" />
              <span>stSTRK</span>
            </div>
          </InputGroup>
        </Col>
        <Col md="12" className={styles.label}>
          <b>Estimated Rewards</b>
        </Col>
        <Col
          md="12"
          className={`${styles["estimated-reward-input"]} d-flex align-items-center justify-content-between`}
        >
          <div>{estimatedWithdrawal}</div>
          <div>
            <img src="/images/starknet-icon.svg" />
            <span>STRK</span>
          </div>
        </Col>
        <Col md="12" className="p-0">
          <Button variant="primary" className={styles["withdraw-btn"]} disabled={amount == 0 || amount > availableWithdrawBalance} onClick={() => onRequestWithdrawal()}>
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
