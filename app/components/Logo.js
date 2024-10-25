import { Row, Col } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import { Image } from "react-bootstrap";
export default function Logo() {
  return (
    <Row>
      <Col xs="12">
        <h1>Manage Your Staking Effortlessly</h1>
      </Col>
      <Col xs="12">
        <Image src="app/assets/images/logo.png" alt="" />
      </Col>
    </Row>
  );
}
