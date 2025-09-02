import React, { useState } from "react";
import { Nav, Container, Row, Col, Badge } from "react-bootstrap";
import { JobSearch } from "../components/graduate/JobSearch";
import { MyApplications } from "../components/graduate/MyApplications";
import { ProfileManager } from "../components/graduate/ProfileManager";
import {
  Search,
  FileText,
  User,
  Bell,
  LogOut,
  Settings,
  Briefcase,
} from "lucide-react";
import styles from "../styles/GraduateDashboard.module.css";

type TabKey = "search" | "applications" | "profile";

const GraduateDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("search");
  const [notificationCount, setNotificationCount] = useState(3); // Mock notification count

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
    <div className={styles.dashboard}>
      {/* Header */}
      {/* <header className={styles.header}>
        <Container fluid>
          <Row className="align-items-center">
            <Col>
              <div className={styles.brand}>
                <Briefcase size={32} className={styles.brandIcon} />
                <span className={styles.brandText}>GraduateHub</span>
              </div>
            </Col>
            <Col xs="auto">
              <div className={styles.headerActions}>
                <button className={styles.notificationBtn}>
                  <Bell size={20} />
                  {notificationCount > 0 && (
                    <Badge bg="danger" className={styles.notificationBadge}>
                      {notificationCount}
                    </Badge>
                  )}
                </button>
                <button className={styles.settingsBtn}>
                  <Settings size={20} />
                </button>
                <button className={styles.logoutBtn}>
                  <LogOut size={20} />
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </header> */}

      <Container fluid className={styles.mainContainer}>
        <Row>
          {/* Sidebar Navigation */}
          <Col md={3} lg={2} className={styles.sidebar}>
            <div className={styles.userPanel}>
              <div className={styles.userAvatar}>
                <User size={40} />
              </div>
              <div className={styles.userInfo}>
                <h5 className={styles.userName}>John Doe</h5>
                <span className={styles.userRole}>Graduate</span>
              </div>
            </div>

            <Nav className="flex-column" variant="pills">
              <Nav.Item className={styles.navItem}>
                <Nav.Link
                  eventKey="search"
                  className={`${styles.navLink} ${
                    activeTab === "search" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("search")}
                >
                  <Search size={18} className={styles.navIcon} />
                  <span>Job Search</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={styles.navItem}>
                <Nav.Link
                  eventKey="applications"
                  className={`${styles.navLink} ${
                    activeTab === "applications" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("applications")}
                >
                  <FileText size={18} className={styles.navIcon} />
                  <span>My Applications</span>
                  <Badge bg="primary" pill className={styles.navBadge}>
                    5
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={styles.navItem}>
                <Nav.Link
                  eventKey="profile"
                  className={`${styles.navLink} ${
                    activeTab === "profile" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <User size={18} className={styles.navIcon} />
                  <span>My Profile</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <div className={styles.sidebarFooter}>
              <div className={styles.quickStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>12</span>
                  <span className={styles.statLabel}>Jobs Viewed</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>5</span>
                  <span className={styles.statLabel}>Applications</span>
                </div>
              </div>
            </div>
          </Col>

          {/* Main Content */}
          <Col md={9} lg={10} className={styles.contentArea}>
            <div className={styles.contentHeader}>
              <h1 className={styles.pageTitle}>
                {activeTab === "search" && "Job Search"}
                {activeTab === "applications" && "My Applications"}
                {activeTab === "profile" && "My Profile"}
              </h1>
              <div className={styles.breadcrumb}>
                <span>Dashboard</span>
                <span className={styles.breadcrumbDivider}>/</span>
                <span className={styles.breadcrumbActive}>
                  {activeTab === "search" && "Job Search"}
                  {activeTab === "applications" && "Applications"}
                  {activeTab === "profile" && "Profile"}
                </span>
              </div>
            </div>

            <div className={styles.mainContent}>{renderContent()}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GraduateDashboardPage;
