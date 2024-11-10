import { Row, Col } from "react-bootstrap";
import styles from "../styles/Overview.module.scss";
export default function Overview() {
  return (
    <div className={`${styles["overview-container"]} d-flex justify-content-center`}>
      <div className={styles['overview-wrapper']}>
      <Row>
        <Col xs="12">
          <div className={styles['title-wrapper']}>
            <span className={styles["overview-title"]}>
              Your Staking Overview
            </span>
          </div>
          <br />
          <span className={styles["sub-title"]}>
            Track your staked assets, earned rewards, and manage your stSTRK
            tokens—all in one place.
          </span>
        </Col>
      </Row>
      <Row className={styles["staking-info-wrapper"]}>
        <Col xs="12" md="6" className={styles["staking-info"]}>
          <div className={styles["staking-number"]}>123,334</div>
          <div className={styles["staking-label"]}>
            Total staked <img src="/images/starknet-icon.svg" />
          </div>
        </Col>
        <Col xs="12" md="6" className={styles["staking-info"]}>
          <div className={styles["staking-number"]}>$1750</div>
          <div className={styles["staking-label"]}>Rewards earned</div>
        </Col>
        <Col xs="12" md="6" className={styles["staking-info"]}>
          <div className={styles["staking-number"]}>123,334</div>
          <div className={styles["staking-label"]}>stSTRK balance</div>
        </Col>
        <Col xs="12" md="6" className={styles["staking-info"]}>
          <div className={styles["staking-number"]}>123,334</div>
          <div className={styles["staking-label"]}>Unstakeable amount</div>
        </Col>
      </Row>
      </div>
    </div>
  );
}
