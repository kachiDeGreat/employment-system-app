import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { JobSearch } from "../components/graduate/JobSearch";
import { MyApplications } from "../components/graduate/MyApplications";
import { ProfileManager } from "../components/graduate/ProfileManager";
import { Search, FileText, User } from "lucide-react";

type TabKey = "search" | "applications" | "profile";

const GraduateDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("search");

  const renderContent = () => {
    switch (activeTab) {
      case "search":
        return <JobSearch />;
      case "applications":
        return <MyApplications />;
      case "profile":
        return <ProfileManager />;
      default:
        return <JobSearch />;
    }
  };

  return (
    <div>
      <h1 className="mb-4">Graduate Dashboard</h1>
      <Nav
        variant="tabs"
        defaultActiveKey="search"
        onSelect={(k) => setActiveTab(k as TabKey)}
        className="mb-4"
      >
        <Nav.Item>
          <Nav.Link eventKey="search" className="icon-text">
            <Search size={16} /> Job Search
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="applications" className="icon-text">
            <FileText size={16} /> My Applications
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="profile" className="icon-text">
            <User size={16} /> My Profile
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div>{renderContent()}</div>
    </div>
  );
};

export default GraduateDashboardPage;
