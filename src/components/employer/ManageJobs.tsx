import React, { useState } from "react";
import { Button, Card, Col, Row, Badge } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { deleteJob } from "../../features/jobs/jobsSlice";
import { JobEditorModal } from "./JobEditorModal";
import { ApplicationList } from "./ApplicationList";
import { Plus, Eye, Edit, Trash2, MapPin, Calendar, Users, Briefcase } from "lucide-react";
import styles from "../../styles/EmployerDashboard.module.css";

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
      <div className={styles.sectionHeader}>
        <div>
          <h3 className={styles.sectionTitle}>Manage Job Postings</h3>
          <p className={styles.sectionSubtitle}>
            Create and manage your job listings, track applications, and find
            the perfect candidates
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleAddNew}
          className={styles.addJobButton}
        >
          <Plus size={18} className="me-2" />
          Post New Job
        </Button>
      </div>

      {myJobs.length > 0 ? (
        <div className={styles.jobsGrid}>
          {myJobs.map((job) => (
            <Card key={job.id} className={styles.jobCard}>
              <Card.Body>
                <div className={styles.jobHeader}>
                  <div className={styles.jobInfo}>
                    <h5 className={styles.jobTitle}>{job.title}</h5>
                    <p className={styles.companyName}>{job.employerName}</p>
                  </div>
                  <Badge bg="success" className={styles.statusBadge}>
                    Active
                  </Badge>
                </div>

                <div className={styles.jobMeta}>
                  <div className={styles.metaItem}>
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Calendar size={14} />
                    <span>
                      Posted {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <Users size={14} />
                    <span>12 Applications</span>
                  </div>
                </div>

                <p className={styles.jobDescription}>
                  {job.description.substring(0, 120)}...
                </p>

                <div className={styles.jobActions}>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setViewingAppsForJobId(job.id)}
                    className={styles.actionButton}
                  >
                    <Eye size={16} className="me-1" />
                    View Applications
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleEdit(job)}
                    className={styles.actionButton}
                  >
                    <Edit size={16} className="me-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(job.id)}
                    className={styles.actionButton}
                  >
                    <Trash2 size={16} className="me-1" />
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <Card className={styles.emptyState}>
          <Card.Body className="text-center py-5">
            <div className={styles.emptyStateIcon}>
              <Briefcase size={48} />
            </div>
            <h5 className={styles.emptyStateTitle}>No job postings yet</h5>
            <p className={styles.emptyStateText}>
              Get started by creating your first job posting to attract talented
              candidates.
            </p>
            <Button
              variant="primary"
              onClick={handleAddNew}
              className={styles.emptyStateButton}
            >
              <Plus size={18} className="me-2" />
              Create Your First Job
            </Button>
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
