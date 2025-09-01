import React from "react";
import { Col, Row } from "react-bootstrap";
import { LoginForm } from "../components/auth/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Row className="justify-content-center mt-5">
      <Col md={6} lg={4}>
        <LoginForm />
      </Col>
    </Row>
  );
};

export default LoginPage;
