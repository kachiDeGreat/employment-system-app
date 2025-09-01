// Graduate - My Applications
import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Reviewed":
        return "info";
      case "Rejected":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div>
      <h3 className="mb-4">My Applications</h3>
      {myApps.length > 0 ? (
        <ListGroup>
          {myApps.map((app) => (
            <ListGroup.Item
              key={app.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{app.jobTitle}</h5>
                <small>
                  Applied on:{" "}
                  {new Date(app.applicationDate).toLocaleDateString()}
                </small>
              </div>
              <Badge bg={getStatusBadge(app.status)} pill>
                {app.status}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>You have not applied for any jobs yet.</p>
      )}
    </div>
  );
};