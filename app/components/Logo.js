import { Row, Col } from "react-bootstrap";
import styles from "../styles/Logo.module.scss";
export default function Logo() {
  return (
    <Row className={styles["logo-wrapper"]}>
      <Col xs="12">
        <h1>Manage Your Staking Effortlessly</h1>
      </Col>
      <Col xs="12">
        <img src="/images/logo.png" alt="" />
      </Col>
    </Row>
  );
}
