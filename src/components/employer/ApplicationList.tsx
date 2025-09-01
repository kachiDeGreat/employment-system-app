import React from "react";
import { Card, Button, ListGroup, Dropdown, Badge } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ApplicationStatus } from "../../types";
import { updateApplicationStatus } from "../../features/applications/applicationsSlice";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { EmptyState } from "../common/EmptyState";

interface ApplicationListProps {
  jobId: string;
  onBack: () => void;
}

export const ApplicationList: React.FC<ApplicationListProps> = ({
  jobId,
  onBack,
}) => {
  const dispatch = useAppDispatch();
  const { applications } = useAppSelector((state) => state.applications);
  const job = useAppSelector((state) =>
    state.jobs.jobs.find((j) => j.id === jobId)
  );

  const jobApplications = applications.filter((app) => app.jobId === jobId);

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    dispatch(updateApplicationStatus({ id, status }));
    toast.success(`Application status updated to ${status}`);
  };

  const getStatusVariant = (status: ApplicationStatus) => {
    switch (status) {
      case "Pending":
        return "secondary";
      case "Reviewed":
        return "info";
      case "Shortlisted":
        return "success";
      case "Rejected":
        return "danger";
      default:
        return "primary";
    }
  };

  return (
    <div>
      <Button
        variant="outline-secondary"
        onClick={onBack}
        className="mb-3 icon-text"
      >
        <ArrowLeft size={16} /> Back to Jobs
      </Button>
      <h3 className="mb-4">Applications for: {job?.title}</h3>
      {jobApplications.length > 0 ? (
        <ListGroup>
          {jobApplications.map((app) => (
            <ListGroup.Item key={app.id}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5>{app.applicantName}</h5>
                  <p>
                    <strong>Applied on:</strong>{" "}
                    {new Date(app.applicationDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Badge pill bg={getStatusVariant(app.status)}>
                    {app.status}
                  </Badge>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-primary"
                      size="sm"
                      id="dropdown-basic"
                    >
                      Change Status
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleStatusChange(app.id, "Reviewed")}
                      >
                        Reviewed
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleStatusChange(app.id, "Shortlisted")
                        }
                      >
                        Shortlisted
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleStatusChange(app.id, "Rejected")}
                      >
                        Rejected
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <Card bg="dark" text="white" className="mt-2">
                <Card.Header>Cover Letter</Card.Header>
                <Card.Body>
                  <Card.Text>{app.coverLetter}</Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <EmptyState
          message="No applications received yet."
          details="Once a graduate applies, their application will appear here."
        />
      )}
    </div>
  );
};
