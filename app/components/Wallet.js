"use client";
import React, { useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import styles from "../styles/Wallet.module.scss";
import StakeForm from "./StakeForm";
import WithdrawForm from "./WithdrawForm";
import useStore from "../store/useStore";
export default function Wallet() {
  const { wallet, updateWallet } = useStore();
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

  const connectWallet = async () => {
    if (window.starknet) {
      const starknet = window.starknet;
      await starknet.enable();
      updateWallet(starknet.account)
      console.log("🚀 ~ connectWal ~ starknet:", starknet)
    } else {
      alert('Please install a Starknet wallet like Argent X');
    }
  };

  return (
    <div>
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
      <div>
      { !wallet?.address &&
        <Button
        variant="primary"
        className={styles['login-btn']}
        onClick={() => connectWallet()}
      >
        Connect Wallet
      </Button>
      }
      </div>
    </div>
  );
}
