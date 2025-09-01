import React from "react";
import { AnalyticsDashboard } from "../components/institution/AnalyticsDashboard";

const InstitutionDashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="mb-4">Institution Dashboard</h1>
      <AnalyticsDashboard />
    </div>
  );
};

export default InstitutionDashboardPage;
