"use client";
import styles from "../styles/StakeForm.module.scss";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

const StakeForm = ({}) => {
  const {
    userWallet,
    availableAmount,
    getEstimatedReward,
    estimatedRewards,
    stakeToken,
    connectWallet,
    isProcessing,
  } = useStore();

  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const debouncedValue = useDebounce(amount, 100);

  useEffect(() => {
    if (debouncedValue) {
      getEstimatedReward(amount);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setWalletAddress(userWallet.selectedAddress || "");
  }, [userWallet]);
  const handleInput = (e) => {
    setAmount(e.target.value);
  };

  const onStake = async () => {
    stakeToken(amount);
  };

  return (
    <div className={styles["stake-form-container"]}>
      <Row>
        <Col md="12" className={styles.label}>
          <b>Available To Stake</b>
        </Col>
        <Col
          md="12"
          className={`${styles["available-to-stake-input"]} d-flex align-items-center justify-content-between`}
        >
          <div>{availableAmount} STRK</div>
          <div className={styles["wallet-info"]}>
            {`${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}`}{" "}
          </div>
        </Col>
        <Col md="12" className={styles.label}>
          <b>Amount To Stake</b>
        </Col>
        <Col md="12" className="p-0">
          <InputGroup
            className={`${styles["stake-input"]} d-flex align-items-center justify-content-between p-0`}
          >
            <Form.Control
              type="number"
              value={amount}
              max={availableAmount}
              min={0}
              className={styles["stake-input"]}
              onChange={(e) => handleInput(e)}
            />
            <div
              className={`${styles["combo-input-btn"]} d-flex align-items-center justify-content-center`}
            >
              <Button
                className={`${styles["max-stake-btn"]} ${
                  amount > 0 ? "cursor-pointer" : ""
                }`}
                variant={availableAmount > 0 ? "primary" : "secondary"}
                disabled={availableAmount == 0}
                onClick={() => setAmount(availableAmount)}
              >
                <b>Max.</b>
              </Button>
              <img src="/images/starknet-icon.svg" />
              <span>STRK</span>
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
          <div>{estimatedRewards}</div>
          <div>
            <img src="/images/starknet-icon.svg" />
            <span>stSTRK</span>
          </div>
        </Col>
        <Col md="12" className="p-0">
          {userWallet.selectedAddress && (
            <Button
              variant="primary"
              className={styles["stake-btn"]}
              disabled={amount == 0 || isProcessing}
              onClick={() => onStake()}
            >
              Stake Now
            </Button>
          )}
          {!userWallet.selectedAddress && (
            <div
              className={`${styles["login-btn-wrappper"]} d-flex align-items-center`}
            >
              <Button
                variant="primary"
                className={styles["login-btn"]}
                onClick={() => connectWallet()}
              >
                Connect Wallet
              </Button>
            </div>
          )}
        </Col>
        <Col md="12" className={`${styles.description} font-14`}>
          *By staking, you agree to lock your tokens for a specified period. You
          will earn rewards during this time, and your stSTRK tokens will
          represent your staked assets.
        </Col>
      </Row>
    </div>
  );
};

export default StakeForm;
