import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Users, Target } from "lucide-react";
import { useAppSelector } from "../app/hooks";

const HomePage: React.FC = () => {
  const { jobs } = useAppSelector((state) => state.jobs);
  const featuredJobs = jobs.slice(0, 3); // Show first 3 jobs

  return (
    <div className="home-page">
      {/* --- Hero Section --- */}
      <Container
        fluid
        className="text-center p-5 rounded-3"
        style={{
          background: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--text-primary)", // Text color changed for light theme
        }}
      >
        <h1 className="display-3 fw-bold my-4">
          Your Career Journey Starts Here
        </h1>
        <p className="lead mb-4" style={{ maxWidth: "700px", margin: "auto" }}>
          Explore opportunities from leading companies and find a role that
          aligns with your passion and skills.
        </p>
        <Button
          as={Link}
          to="/graduate-dashboard"
          variant="primary"
          size="lg"
          className="icon-text"
        >
          Find a Job <ArrowRight size={20} />
        </Button>
      </Container>

      {/* --- How It Works Section --- */}
      <Container className="py-5 text-center">
        <h2 className="mb-5">How It Works</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Users size={48} className="text-primary mb-3" />
            <h4>Create an Account</h4>
            <p className="text-secondary">
              Sign up as a graduate or an employer to get started.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <Briefcase size={48} className="text-primary mb-3" />
            <h4>Find or Post Jobs</h4>
            <p className="text-secondary">
              Graduates can search for jobs, while employers post opportunities.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <Target size={48} className="text-primary mb-3" />
            <h4>Apply & Hire</h4>
            <p className="text-secondary">
              Easily apply for jobs and let employers manage applicants
              seamlessly.
            </p>
          </Col>
        </Row>
      </Container>

      {/* --- Featured Jobs Section --- */}
      <div style={{ background: "var(--background-tertiary)" }}>
        <Container className="py-5">
          <h2 className="text-center mb-5">Featured Jobs</h2>
          {featuredJobs.length > 0 ? (
            <Row>
              {featuredJobs.map((job) => (
                <Col md={4} key={job.id} className="mb-3">
                  <Card className="h-100 card-hover">
                    <Card.Body>
                      <Card.Title>{job.title}</Card.Title>
                      <Card.Subtitle className="text-muted">
                        {job.employerName}
                      </Card.Subtitle>
                      <Card.Text className="mt-2">
                        {job.description.substring(0, 80)}...
                      </Card.Text>
                      <Button
                        as={Link}
                        to="/graduate-dashboard"
                        variant="outline-primary"
                        className="mt-auto"
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center text-secondary">
              No jobs posted yet. Check back soon!
            </p>
          )}
        </Container>
      </div>

      {/* --- Testimonials Section --- */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Success Stories</h2>
        <Row>
          <Col md={6} className="mb-3">
            <Card>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    "This portal connected me with my dream job right after
                    graduation. The process was incredibly smooth!"
                  </p>
                  <footer className="blockquote-footer">
                    Jane Doe,{" "}
                    <cite title="Source Title">Software Engineer</cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    "We found the perfect candidate for our junior developer
                    role in just under a week. Highly recommended for
                    employers."
                  </p>
                  <footer className="blockquote-footer">
                    Tech Solutions Ltd,{" "}
                    <cite title="Source Title">Port Harcourt</cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
