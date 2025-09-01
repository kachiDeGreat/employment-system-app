// Graduate - Apply Modal
import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addApplication } from "../../features/applications/applicationsSlice";
import { Job } from "../../types";

interface ApplyModalProps {
  job: Job;
  show: boolean;
  handleClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  job,
  show,
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const { applications } = useAppSelector((state) => state.applications);
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");

  const hasApplied = applications.some(
    (app) => app.jobId === job.id && app.graduateId === currentUser?.id
  );

  const handleSubmit = () => {
    if (!currentUser) {
      setError("You must be logged in to apply.");
      return;
    }
    if (coverLetter.trim() === "") {
      setError("A cover letter is required.");
      return;
    }

    dispatch(
      addApplication({
        jobId: job.id,
        graduateId: currentUser.id,
        applicantName: currentUser.name,
        jobTitle: job.title,
        coverLetter: coverLetter,
      })
    );
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Apply for: {job.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          {job.employerName} - {job.location}
        </h5>
        {job.salary && (
          <p>
            <strong>Salary:</strong> ₦{job.salary.toLocaleString()}
          </p>
        )}
        <p>{job.description}</p>
        <hr />
        {hasApplied ? (
          <Alert variant="success">
            You have already applied for this job.
          </Alert>
        ) : (
          <Form>
            <Form.Group controlId="coverLetter">
              <Form.Label>
                <h5>Your Cover Letter</h5>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="Explain why you are the best candidate for this role..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </Form.Group>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {!hasApplied && (
          <Button variant="primary" onClick={handleSubmit}>
            Submit Application
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};