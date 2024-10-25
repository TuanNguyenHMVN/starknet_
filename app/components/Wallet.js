"use client";
import React, { useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import styles from "../styles/Wallet.module.scss";
import StakeForm from "./StakeForm";
import WithdrawForm from "./WithdrawForm";
export default function Wallet() {
  const [isStake, setIsStake] = useState(true);
  const [isWithdraw, setIsWithdraw] = useState(false);

  const handleAction = (action) => {
    if (action == "Stake") {
      setIsStake(true);
      setIsWithdraw(false);
    } else if (action == "Withdraw") {
      setIsWithdraw(true);
      setIsStake(false);
    }
  };

  return (
    <div className={styles["wallet-wrapper"]}>
      <Row>
        <Col md="12" className={styles["combo-btn-wrapper"]}>
          <div
            className={`${styles["stake-withdraw-btn"]} d-flex align-items-center`}
          >
            <Button
              variant={isStake ? "primary" : "secondary"}
              onClick={() => handleAction("Stake")}
            >
              Stake
            </Button>
            <Button
              variant={isWithdraw ? "primary" : "secondary"}
              onClick={() => handleAction("Withdraw")}
            >
              Withdraw
            </Button>
          </div>
        </Col>
      </Row>
      <Row className={styles.wallet}>
        {isStake && <StakeForm />} {isWithdraw && <WithdrawForm />}
      </Row>
    </div>
  );
}
