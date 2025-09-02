import React from "react";
import { Card, Badge, ProgressBar, Button } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { Clock, CheckCircle, XCircle, Eye, FileText } from "lucide-react";
import styles from "../../styles/GraduateDashboard.module.css";

export const MyApplications: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { applications } = useAppSelector((state) => state.applications);

  const myApps = applications
    .filter((app) => app.graduateId === currentUser?.id)
    .sort(
      (a, b) =>
        new Date(b.applicationDate).getTime() -
        new Date(a.applicationDate).getTime()
    );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Submitted":
        return "primary";
      case "Reviewed":
        return "info";
      case "Interview":
        return "warning";
      case "Rejected":
        return "danger";
      case "Accepted":
        return "success";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Submitted":
        return <FileText size={16} />;
      case "Reviewed":
        return <Eye size={16} />;
      case "Interview":
        return <Clock size={16} />;
      case "Rejected":
        return <XCircle size={16} />;
      case "Accepted":
        return <CheckCircle size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getApplicationProgress = (status: string) => {
    switch (status) {
      case "Submitted":
        return 25;
      case "Reviewed":
        return 50;
      case "Interview":
        return 75;
      case "Rejected":
        return 100;
      case "Accepted":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>My Applications</h3>
        <p className={styles.sectionSubtitle}>
          Track the status of your job applications
        </p>
      </div>

      {myApps.length > 0 ? (
        <div className={styles.applicationsGrid}>
          {myApps.map((app) => (
            <Card key={app.id} className={styles.applicationCard}>
              <Card.Body>
                <div className={styles.applicationHeader}>
                  <div className={styles.applicationInfo}>
                    <h5 className={styles.jobTitle}>{app.jobTitle}</h5>
                    <p className={styles.companyName}>{app.employerName}</p>
                  </div>
                  <Badge
                    bg={getStatusVariant(app.status)}
                    className={styles.statusBadge}
                  >
                    {getStatusIcon(app.status)}
                    <span>{app.status}</span>
                  </Badge>
                </div>

                <div className={styles.applicationMeta}>
                  <div className={styles.metaItem}>
                    <Clock size={14} />
                    <span>
                      Applied on{" "}
                      {new Date(app.applicationDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <span>Application ID: #{app.id.slice(0, 8)}</span>
                  </div>
                </div>

                <div className={styles.progressSection}>
                  <div className={styles.progressLabels}>
                    <span>Application Progress</span>
                    <span>{getApplicationProgress(app.status)}%</span>
                  </div>
                  <ProgressBar
                    now={getApplicationProgress(app.status)}
                    variant={getStatusVariant(app.status)}
                    className={styles.progressBar}
                  />
                </div>

                <div className={styles.applicationActions}>
                  <Button variant="outline-primary" size="sm">
                    View Job Details
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    Contact Employer
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <Card className={styles.emptyStateCard}>
          <Card.Body className="text-center py-5">
            <FileText size={48} className={styles.emptyStateIcon} />
            <h5 className={styles.emptyStateTitle}>No applications yet</h5>
            <p className={styles.emptyStateText}>
              You haven't applied to any jobs yet. Start browsing opportunities
              and apply to kickstart your career!
            </p>
            <Button variant="primary" className={styles.emptyStateButton}>
              Browse Jobs
            </Button>
          </Card.Body>
        </Card>
      )}

      {myApps.length > 0 && (
        <Card className={styles.statsCard}>
          <Card.Body>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{myApps.length}</span>
                <span className={styles.statLabel}>Total Applications</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {myApps.filter((app) => app.status === "Reviewed").length}
                </span>
                <span className={styles.statLabel}>Under Review</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {myApps.filter((app) => app.status === "Interview").length}
                </span>
                <span className={styles.statLabel}>Interviews</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {myApps.filter((app) => app.status === "Accepted").length}
                </span>
                <span className={styles.statLabel}>Accepted</span>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
