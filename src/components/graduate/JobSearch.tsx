import React, { useState } from "react";
import { Card, Form, Row, Col, Button, Badge } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { Job } from "../../types";
import { ApplyModal } from "./ApplyModal";
import { MapPin, Clock, DollarSign, Search as SearchIcon } from "lucide-react";
import styles from "../../styles/GraduateDashboard.module.css";

export const JobSearch: React.FC = () => {
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const filteredJobs = jobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    );

  return (
    <div>
      <div className={styles.searchHeader}>
        <h3 className={styles.sectionTitle}>Find Your Next Opportunity</h3>
        <p className={styles.sectionSubtitle}>
          Discover jobs that match your skills and aspirations
        </p>
      </div>

      <Card className={styles.searchCard}>
        <Card.Body>
          <Form>
            <Row className="align-items-end">
              <Col md={5}>
                <Form.Group controlId="searchTerm">
                  <Form.Label className={styles.filterLabel}>
                    <SearchIcon size={16} className="me-2" />
                    Job Title or Keyword
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Software Engineer, Web Developer"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group controlId="locationFilter">
                  <Form.Label className={styles.filterLabel}>
                    <MapPin size={16} className="me-2" />
                    Location
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Port Harcourt, Lagos, Remote"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className={styles.searchInput}
                  />
                </Form.Group>
              </Col>
              <Col md={2} className="d-grid">
                <Button variant="primary" className={styles.searchBtn}>
                  Search Jobs
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <div className={styles.resultsInfo}>
        <span className={styles.resultsCount}>
          {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
        </span>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Col key={job.id}>
              <Card className={`${styles.jobCard} h-100`}>
                <Card.Body className="d-flex flex-column">
                  <div className={styles.jobHeader}>
                    <Card.Title className={styles.jobTitle}>
                      {job.title}
                    </Card.Title>
                    <Badge bg="primary" className={styles.jobType}>
                      Full-time
                    </Badge>
                  </div>

                  <Card.Subtitle className={styles.companyName}>
                    {job.employerName}
                  </Card.Subtitle>

                  <div className={styles.jobMeta}>
                    <div className={styles.metaItem}>
                      <MapPin size={14} />
                      <span>{job.location}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Clock size={14} />
                      <span>
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.metaItem}>
                      <DollarSign size={14} />
                      <span>Competitive salary</span>
                    </div>
                  </div>

                  <Card.Text className={styles.jobDescription}>
                    {job.description.substring(0, 120)}...
                  </Card.Text>

                  <div className={styles.jobSkills}>
                    <Badge bg="light" text="dark" className={styles.skillTag}>
                      React
                    </Badge>
                    <Badge bg="light" text="dark" className={styles.skillTag}>
                      Node.js
                    </Badge>
                    <Badge bg="light" text="dark" className={styles.skillTag}>
                      JavaScript
                    </Badge>
                  </div>

                  <div className="mt-auto pt-3">
                    <Button
                      variant="primary"
                      className={styles.applyBtn}
                      onClick={() => handleApplyClick(job)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <div className={styles.noResults}>
              <SearchIcon size={48} className={styles.noResultsIcon} />
              <h4>No jobs found</h4>
              <p>
                Try adjusting your search criteria or browse all available
                positions.
              </p>
            </div>
          </Col>
        )}
      </Row>

      {selectedJob && (
        <ApplyModal
          job={selectedJob}
          show={showApplyModal}
          handleClose={() => setShowApplyModal(false)}
        />
      )}
    </div>
  );
};
