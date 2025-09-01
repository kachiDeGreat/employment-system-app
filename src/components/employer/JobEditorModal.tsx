import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addJob, updateJob } from "../../features/jobs/jobsSlice";
import { Job } from "../../types";

interface JobEditorModalProps {
  show: boolean;
  handleClose: () => void;
  job: Job | null;
}

export const JobEditorModal: React.FC<JobEditorModalProps> = ({
  show,
  handleClose,
  job,
}) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: 0,
    jobType: "Full-time" as Job["jobType"],
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary || 0,
        jobType: job.jobType,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        location: "",
        salary: 0,
        jobType: "Full-time",
      });
    }
  }, [job, show]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    if (!currentUser) return;
    if (job) {
      dispatch(updateJob({ ...job, ...formData }));
    } else {
      dispatch(
        addJob({
          ...formData,
          employerId: currentUser.id,
          employerName: currentUser.name,
        })
      );
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {job ? "Edit Job Posting" : "Create New Job Posting"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* ... (title, location, salary fields remain the same) ... */}
          <Form.Group className="mb-3">
            <Form.Label>Job Type</Form.Label>
            <Form.Select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Job
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
