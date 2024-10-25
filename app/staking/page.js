import { Row, Col } from "react-bootstrap";
import Logo from "../components/Logo";

export default function StakingPage() {
  return (
    <div className="container">
      <Row>
        <Col md="6">
          <Logo />
        </Col>
        <Col md="6"></Col>
      </Row>
    </div>
  );
}
