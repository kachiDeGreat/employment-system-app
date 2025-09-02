import React from "react";
import { Button, Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Users,
  Target,
  Star,
  MapPin,
  Clock,
  Award,
  TrendingUp,
  Heart,
} from "lucide-react";
import { useAppSelector } from "../app/hooks";
import styles from "../styles/HomePage.module.css";

const HomePage: React.FC = () => {
  const { jobs } = useAppSelector((state) => state.jobs);
  const featuredJobs = jobs.slice(0, 3); // Show first 3 jobs

  return (
    <div className={styles.homePage}>
      {/* --- Hero Section --- */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <Container>
            <Row className="align-items-center min-vh-75 my-0">
              <Col lg={6} className={styles.heroContent}>
                <div className={styles.heroBadge}>
                  <TrendingUp size={14} />
                  <span>Trusted by 10,000+ graduates</span>
                </div>
                <h1 className={styles.heroTitle}>
                  Launch Your <span className={styles.highlight}>Career</span>{" "}
                  Journey
                </h1>
                <p className={styles.heroSubtitle}>
                  Connect with top employers and discover opportunities that
                  match your skills and aspirations. Your perfect career start
                  is just a click away.
                </p>
                <div className={styles.heroButtons}>
                  <Button
                    as={Link}
                    to="/graduate-dashboard"
                    className={`${styles.ctaButton} ${styles.ctaPrimary}`}
                  >
                    Explore Jobs <ArrowRight size={18} />
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    className={`${styles.ctaButton} ${styles.ctaSecondary}`}
                  >
                    Create Account
                  </Button>
                </div>
              </Col>
              <Col lg={6} className="d-none d-lg-block">
                <div className={styles.heroVisual}>
                  <div className={styles.floatingCard}>
                    <Briefcase size={24} />
                    <span>5,000+ Jobs</span>
                  </div>
                  <div className={styles.floatingCard}>
                    <Users size={24} />
                    <span>500+ Companies</span>
                  </div>
                  <div className={styles.floatingCard}>
                    <Award size={24} />
                    <span>10,000+ Hires</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section className={`${styles.section} ${styles.howItWorks}`}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              Getting started with your career journey is simple and
              straightforward
            </p>
          </div>
          <Row>
            <Col md={4} className="mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureNumber}>01</div>
                <div className={styles.featureIcon}>
                  <Users size={32} />
                </div>
                <h4>Create Your Profile</h4>
                <p>
                  Sign up as a graduate or employer and build your profile to
                  get noticed.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureNumber}>02</div>
                <div className={styles.featureIcon}>
                  <Briefcase size={32} />
                </div>
                <h4>Find or Post Opportunities</h4>
                <p>
                  Graduates discover roles that fit, employers find perfect
                  candidates.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureNumber}>03</div>
                <div className={styles.featureIcon}>
                  <Target size={32} />
                </div>
                <h4>Connect & Succeed</h4>
                <p>
                  Apply to positions or hire talent through our seamless
                  platform.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- Featured Jobs Section --- */}
      <section className={`${styles.section} ${styles.featuredJobs}`}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Opportunities</h2>
            <p className={styles.sectionSubtitle}>
              Discover hand-picked roles from leading companies
            </p>
          </div>
          {featuredJobs.length > 0 ? (
            <Row>
              {featuredJobs.map((job) => (
                <Col lg={4} md={6} key={job.id} className="mb-4">
                  <Card className={styles.jobCard}>
                    <Card.Body className={styles.jobCardBody}>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <Badge bg="light" text="dark" className="mb-2">
                            {job.category || "Technology"}
                          </Badge>
                          <Card.Title className="h5">{job.title}</Card.Title>
                          <Card.Subtitle className="text-muted mb-2">
                            {job.employerName}
                          </Card.Subtitle>
                        </div>
                        <div className={styles.companyLogo}>
                          <Briefcase size={20} />
                        </div>
                      </div>

                      <div className="d-flex gap-3 mb-3">
                        <small className="text-muted">
                          <MapPin size={14} className="me-1" />
                          {job.location}
                        </small>
                        <small className="text-muted">
                          <Clock size={14} className="me-1" />
                          Full-time
                        </small>
                      </div>

                      <Card.Text className="text-secondary mb-3">
                        {job.description.substring(0, 100)}...
                      </Card.Text>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Star size={16} className="text-warning me-1" />
                          <small className="text-muted">4.8 (36 reviews)</small>
                        </div>
                        <Button
                          as={Link}
                          to="/graduate-dashboard"
                          variant="outline-primary"
                          size="sm"
                          className={styles.jobButton}
                        >
                          View Details
                        </Button>
                      </div>
                    </Card.Body>
                    <div className={styles.jobCardFooter}>
                      <small>Posted 2 days ago • 15 applications</small>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className={styles.noJobs}>
              <Briefcase size={48} className="text-muted mb-3" />
              <p className={styles.noJobsMessage}>
                No opportunities posted yet. Check back soon!
              </p>
            </div>
          )}

          <div className="text-center mt-5">
            <Button
              as={Link}
              to="/graduate-dashboard"
              className={`${styles.ctaButton} ${styles.ctaPrimary}`}
            >
              Browse All Opportunities <ArrowRight size={18} />
            </Button>
          </div>
        </Container>
      </section>

      {/* --- Testimonials Section --- */}
      <section className={`${styles.section} ${styles.testimonials}`}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Success Stories</h2>
            <p className={styles.sectionSubtitle}>
              Hear from graduates and employers who found success through our
              platform
            </p>
          </div>
          <Row>
            <Col lg={6} className="mb-4">
              <Card className={styles.testimonialCard}>
                <Card.Body className={styles.testimonialContent}>
                  <div className={styles.quoteIcon}>"</div>
                  <div className="d-flex align-items-center mb-3">
                    <div className={styles.testimonialAvatar}>
                      <Users size={20} />
                    </div>
                    <div>
                      <h6 className="mb-0">Jane Doe</h6>
                      <small className="text-muted">
                        Software Engineer at TechCorp
                      </small>
                    </div>
                  </div>
                  <blockquote className="mb-0">
                    <p>
                      "This platform connected me with my dream job right after
                      graduation. The application process was smooth and I
                      received responses faster than any other platform!"
                    </p>
                  </blockquote>
                  <div className="d-flex mt-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        fill="currentColor"
                        className="text-warning me-1"
                      />
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} className="mb-4">
              <Card className={styles.testimonialCard}>
                <Card.Body className={styles.testimonialContent}>
                  <div className={styles.quoteIcon}>"</div>
                  <div className="d-flex align-items-center mb-3">
                    <div className={styles.testimonialAvatar}>
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h6 className="mb-0">John Smith</h6>
                      <small className="text-muted">
                        HR Director at Tech Solutions Ltd
                      </small>
                    </div>
                  </div>
                  <blockquote className="mb-0">
                    <p>
                      "We found the perfect candidate for our junior developer
                      role in just under a week. The quality of graduates on
                      this platform is exceptional compared to other job
                      boards."
                    </p>
                  </blockquote>
                  <div className="d-flex mt-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        fill="currentColor"
                        className="text-warning me-1"
                      />
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- CTA Section --- */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <Container>
          <Card className={styles.ctaCard}>
            <Card.Body className="p-5">
              <Row className="align-items-center">
                <Col lg={8}>
                  <h3>Ready to launch your career?</h3>
                  <p className="mb-3 mb-md-0">
                    Join thousands of graduates who have found their dream jobs
                    through our platform.
                  </p>
                </Col>
                <Col lg={4} className="text-lg-end">
                  <Button
                    as={Link}
                    to="/register"
                    className={`${styles.ctaButton} ${styles.ctaPrimary}`}
                  >
                    Get Started <ArrowRight size={18} />
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
