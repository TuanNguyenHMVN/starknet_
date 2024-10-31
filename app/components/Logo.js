import { Row, Col } from "react-bootstrap";
import styles from "../styles/Logo.module.scss";
import animations from "../styles/Animation.module.scss";
export default function Logo() {
  return (
    <Row className={`${styles["logo-wrapper"]} ${animations.fadeInLeft}`}>
      <Col xs="12" className={`${styles["logo-title"]}`}>
        <span>Manage Your Staking Effortlessly</span>
      </Col>
      <Col xs="12" className="text-center">
        <img src="/images/logo.png" alt="" />
      </Col>
    </Row>
  );
}
