import React, { useState } from "react";
import { Col, Row, Card, Container, Alert } from "react-bootstrap";
import { GraduationCap, Users, Briefcase, Target, Quote } from "lucide-react";
import { LoginForm } from "../components/auth/LoginForm";
import styles from "../styles/LoginPage.module.css";

const LoginPage: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className={styles.loginPage}>
      <div className={styles.backgroundAnimation}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>

      <Container fluid className="h-100">
        <Row className="d-flex align-items-center justify-content-center min-vh-100">
          {/* Left side - Illustration and features */}
          <Col xl={5} className={`d-none d-xl-block ${styles.leftSection}`}>
            <div className={styles.illustrationContainer}>
              <div className={styles.mainContent}>
                <br />
                <br />
                <h1 className={styles.welcomeTitle}>Welcome Back</h1>
                <p className={styles.welcomeSubtitle}>
                  Sign in to continue your career journey with thousands of
                  opportunities
                </p>

                <div className={styles.featuresGrid}>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                      <Briefcase size={24} />
                    </div>
                    <div className={styles.featureContent}>
                      <h5>Curated Opportunities</h5>
                      <p>Hand-picked jobs matching your profile</p>
                    </div>
                  </div>

                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                      <Target size={24} />
                    </div>
                    <div className={styles.featureContent}>
                      <h5>Application Tracking</h5>
                      <p>Monitor your progress in real-time</p>
                    </div>
                  </div>

                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                      <Users size={24} />
                    </div>
                    <div className={styles.featureContent}>
                      <h5>Employer Connections</h5>
                      <p>Direct access to hiring managers</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.testimonialSection}>
                <div className={styles.testimonialCard}>
                  <div className={styles.quoteIcon}>
                    <Quote size={24} />
                  </div>
                  <p className={styles.testimonialText}>
                    GraduateHub transformed my job search. I received 3 offers
                    within 2 weeks of signing up!
                  </p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.authorAvatar}>
                      <span>SJ</span>
                    </div>
                    <div className={styles.authorInfo}>
                      <h6>Sarah Johnson</h6>
                      <p>Software Engineer at TechVision</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* Right side - Login form */}
          <Col xl={7} lg={8} md={10} className={styles.rightSection}>
            <div className={styles.formContainer}>
              <Card className={styles.loginCard}>
                <Card.Body className="p-5">
                  <div className={styles.formHeader}>
                    <div className={styles.mobileLogo}>
                      <GraduationCap size={28} className={styles.logoIcon} />
                      <span className={styles.logoText}>GraduateHub</span>
                    </div>
                    <h2 className={styles.formTitle}>
                      Sign In to Your Account
                    </h2>
                    <p className={styles.formSubtitle}>
                      Enter your credentials to access your personalized
                      dashboard
                    </p>
                  </div>

                  <Alert variant="info" className={styles.demoAlert}>
                    <strong>Demo:</strong> App uses local storage for session
                    management.
                  </Alert>

                  {/* Integrated LoginForm Component */}
                  <LoginForm />

                  <div className={styles.signupPrompt}>
                    <p>
                      Don't have an account?{" "}
                      <a href="/register" className={styles.signupLink}>
                        Create account
                      </a>
                    </p>
                  </div>
                </Card.Body>
              </Card>

              <div className={styles.footer}>
                <p>© 2023 GraduateHub. All rights reserved.</p>
                <div className={styles.footerLinks}>
                  <a href="/privacy">Privacy Policy</a>
                  <a href="/terms">Terms of Service</a>
                  <a href="/help">Help Center</a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
