import { Row, Col } from "react-bootstrap";
import Logo from "../components/Logo";
import Wallet from "../components/Wallet";
import Overview from "../components/Overview";

export default function StakingPage() {
  return (
    <div className="container">
      <Row>
        <Col md="6" className="app-logo-container">
          <Logo />
        </Col>
        <Col md="6" className="app-wallet-container">
          <Wallet />
        </Col>
        <Col md="12" className="text-center">
          <Overview />
        </Col>
      </Row>
    </div>
  );
}
