import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { deleteJob } from "../../features/jobs/jobsSlice";
import { JobEditorModal } from "./JobEditorModal";
import { ApplicationList } from "./ApplicationList";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";

export const ManageJobs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { jobs } = useAppSelector((state) => state.jobs);

  const [showEditor, setShowEditor] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [viewingAppsForJobId, setViewingAppsForJobId] = useState<string | null>(
    null
  );

  const myJobs = jobs
    .filter((job) => job.employerId === currentUser?.id)
    .sort(
      (a, b) =>
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    );

  const handleEdit = (job: any) => {
    setEditingJob(job);
    setShowEditor(true);
  };

  const handleAddNew = () => {
    setEditingJob(null);
    setShowEditor(true);
  };

  const handleDelete = (jobId: string) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      dispatch(deleteJob(jobId));
    }
  };

  if (viewingAppsForJobId) {
    return (
      <ApplicationList
        jobId={viewingAppsForJobId}
        onBack={() => setViewingAppsForJobId(null)}
      />
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Manage Job Postings</h3>
        <Button variant="primary" onClick={handleAddNew} className="icon-text">
          <Plus size={18} /> Post New Job
        </Button>
      </div>

      {myJobs.length > 0 ? (
        myJobs.map((job) => (
          <Card key={job.id} className="mb-3">
            <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <h5 className="mb-1">{job.title}</h5>
                  <small className="text-secondary">
                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                  </small>
                </Col>
                <Col xs="auto" className="d-flex gap-2">
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => setViewingAppsForJobId(job.id)}
                    className="icon-text"
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleEdit(job)}
                    className="icon-text"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(job.id)}
                    className="icon-text"
                  >
                    <Trash2 size={16} />
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card>
          <Card.Body>
            <p className="mb-0 text-center text-secondary">
              You have not posted any jobs yet.
            </p>
          </Card.Body>
        </Card>
      )}

      <JobEditorModal
        show={showEditor}
        handleClose={() => setShowEditor(false)}
        job={editingJob}
      />
    </div>
  );
};
