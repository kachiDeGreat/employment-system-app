import React from "react";
import { Col, Row } from "react-bootstrap";
import { SignupForm } from "../components/auth/SignupForm";

const SignupPage: React.FC = () => {
  return (
    <Row className="justify-content-center mt-5">
      <Col md={6} lg={5}>
        <SignupForm />
      </Col>
    </Row>
  );
};

export default SignupPage;
