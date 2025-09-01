import React, { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { Job } from "../../types";
import { ApplyModal } from "./ApplyModal";
import { MapPin } from "lucide-react";

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
      <h3 className="mb-4">Find Your Next Opportunity</h3>
      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row className="align-items-end">
              <Col md={5}>
                <Form.Group controlId="searchTerm">
                  <Form.Label>Job Title or Keyword</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Software Engineer"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group controlId="locationFilter">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Port Harcourt"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={2} className="d-grid">
                <Button variant="primary">Search</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Col key={job.id}>
              <Card className="h-100 card-hover">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-secondary">
                    {job.employerName}
                  </Card.Subtitle>
                  <Card.Text className="text-secondary icon-text small mb-3">
                    <MapPin size={14} /> {job.location}
                  </Card.Text>
                  <Card.Text className="flex-grow-1">
                    {job.description.substring(0, 100)}...
                  </Card.Text>
                  <div className="mt-auto pt-3">
                    <Button
                      variant="outline-primary"
                      className="w-100"
                      onClick={() => handleApplyClick(job)}
                    >
                      View & Apply
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer className="text-muted small">
                  Posted on {new Date(job.postedDate).toLocaleDateString()}
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No jobs found matching your criteria.</p>
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
