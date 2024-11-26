"use client";
import React, { useState, useEffect } from "react";
import useStore from "../store/useStore";
import styles from "../styles/WithdrawForm.module.scss";
import { Row, Col, Button, InputGroup, Form } from "react-bootstrap";
import { useDebounce } from "../hooks/useDebounce";

const WithdrawForm = ({}) => {
  const {
    userWallet,
    withdrawableBalance,
    getWithdrawalRequests,
    convertToAssets,
    strkRewards,
    allWithdrawalRequests,
    availableWithdrawalRequests,
    withdraw,
    requestWithdrawal,
    getStakedStrkBalance,
    getWithdrawableBalance,
    availableStakedStrkAmount,
    isProcessing,
  } = useStore();

  const [isRequest, setIsRequest] = useState(true);
  const [isClaim, setIsClaim] = useState(false);

  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("0");
  const debouncedValue = useDebounce(amount, 10);

  useEffect(() => {
    convertToAssets(amount);
  }, [debouncedValue]);
  const handleInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    if (e.target.value) {
      const maxAmount = isRequest ? availableStakedStrkAmount : withdrawableBalance;
      if (Number(e.target.value) > Number(maxAmount)) {
        e.target.value = Number(maxAmount);
      }
      setAmount(Math.floor(e.target.value));
    } else {
      setAmount("0");
    }
  };



  useEffect(() => {
    getStakedStrkBalance();
  }, []);

  const handleAction = (action) => {
    if (action == "Request") {
      setIsRequest(true);
      setIsClaim(false);
      getStakedStrkBalance();
    } else if (action == "Claim") {
      setIsClaim(true);
      setIsRequest(false);
      getWithdrawableBalance();
      getWithdrawalRequests();
    }
  };

  const onRequestWithdrawal = () => {
    requestWithdrawal(amount);
    // setAmount(0);
  };
  useEffect(() => {
    setWalletAddress(userWallet.selectedAddress || "");
  }, [userWallet]);
  return (
    <div
      className={
        isRequest
          ? `${styles["withdraw-form-container"]}`
          : `${styles["withdraw-form-container"]} ${styles["claim-form"]}`
      }
    >
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
          <div>
            {isRequest ? availableStakedStrkAmount : withdrawableBalance} {isRequest ? "stSTRK" : "STRK"}
          </div>
          <div className={styles["wallet-info"]}>
            {`${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}`}{" "}
          </div>
        </Col>
        {isClaim && (
          <Col md="12" className={styles["count-request"]}>
            <i className="bi bi-check-circle font-18"></i>
            <span className={styles["count-number"]}>
              {availableWithdrawalRequests}
            </span>
            <span>Ready To Claim</span> |{" "}
            <i
              className={`${styles["pending-icon"]} bi bi-clock clock-icon font-18`}
            ></i>{" "}
            <span className={styles["count-number"]}>
              {allWithdrawalRequests - availableWithdrawalRequests}
            </span>
            <span>Pending</span>
          </Col>
        )}
        {isRequest && (
          <>
            <Col md="12" className={styles.label}>
              <b>Amount To Withdraw</b>
            </Col>
            <Col md="12" className="p-0">
              <InputGroup
                className={`${styles["withdraw-input"]} d-flex align-items-center justify-content-between p-0`}
              >
                <Form.Control
                  type="text"
                  value={amount}
                  onChange={(e) => handleInput(e)}
                  className={styles["stake-input"]}
                />
                <div
                  className={`${styles["combo-input-btn"]} d-flex align-items-center justify-content-center`}
                >
                  <Button
                    className={`${styles["max-stake-btn"]} cursor-pointer`}
                    disabled={isRequest ? availableStakedStrkAmount == 0 : withdrawableBalance == 0}
                    onClick={() => setAmount(Math.floor(isRequest ? availableStakedStrkAmount : withdrawableBalance))}
                  >
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
              <div>{strkRewards}</div>
              <div>
                <img src="/images/starknet-icon.svg" />
                <span>STRK</span>
              </div>
            </Col>
          </>
        )}
        <Col md="12" className="p-0">
          <Button
            variant="primary"
            className={styles["withdraw-btn"]}
            // disabled={
            //   amount == 0 || amount > availableWithdrawBalanc || isProcessing
            // }
            onClick={() => (isRequest ? onRequestWithdrawal() : withdraw())}
          >
            {isRequest ? "Request" : "Withdraw Now"}
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
