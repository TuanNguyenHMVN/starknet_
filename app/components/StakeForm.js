import styles from "../styles/StakeForm.module.scss";
import { Row, Col } from "react-bootstrap";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";

const StakeForm = ({}) => {
  const {wallet} = useStore();

  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    setWalletAddress(wallet.address || '')
  }, [wallet])

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
          <div>213.00 STRK</div>
          <div className={styles["wallet-info"]}>
            {`${walletAddress.slice(0,5)}...${walletAddress.slice(-3)}`} <img src="/images/token-icon.svg" />
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
          <div className="d-flex align-items-center justify-content-center">
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
        <Col md="12" className={`${styles.description} font-12`}>
          *By staking, you agree to lock your tokens for a specified period. You
          will earn rewards during this time, and your dstSTRK tokens will
          represent your staked assets.
        </Col>
      </Row>
    </div>
  );
};

export default StakeForm;
