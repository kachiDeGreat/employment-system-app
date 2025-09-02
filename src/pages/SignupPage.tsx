import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { SignupForm } from "../components/auth/SignupForm";
import styles from "../styles/SignupPage.module.css";

const SignupPage: React.FC = () => {
  return (
    <div className={styles.signupPage}>
      <div className={styles.backgroundAnimation}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>

      <Container fluid className="h-100">
        <Row className="align-items-center justify-content-center min-vh-100">
          <Col xl={5} lg={6} md={8} className={styles.formSection}>
            <div className={styles.formContainer}>
              <div className={styles.header}>
                {/* <div className={styles.logo}>
                  <span className={styles.logoText}>GraduateHub</span>
                </div> */}
                <h2 className={styles.title}>Create Your Account</h2>
                <p className={styles.subtitle}>
                  Join thousands of graduates launching their careers
                </p>
              </div>

              <SignupForm />

              <div className={styles.footer}>
                <p>
                  Already have an account? <a href="/login">Sign in</a>
                </p>
                <div className={styles.footerLinks}>
                  <p>© 2023 GraduateHub. All rights reserved.</p>
                  <div>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                    <a href="/help">Help Center</a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage;
