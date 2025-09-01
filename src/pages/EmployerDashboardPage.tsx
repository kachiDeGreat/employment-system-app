import React from "react";
import { ManageJobs } from "../components/employer/ManageJobs";

const EmployerDashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="mb-4">Employer Dashboard</h1>
      <ManageJobs />
    </div>
  );
};

export default EmployerDashboardPage;
