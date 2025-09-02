import React, { useState } from "react";
import { Nav, Container, Row, Col, Badge, Button } from "react-bootstrap";
import { ManageJobs } from "../components/employer/ManageJobs";
import {
  Briefcase,
  Users,
  BarChart3,
  Bell,
  LogOut,
  Settings,
  Building,
} from "lucide-react";
import styles from "../styles/EmployerDashboard.module.css";

type TabKey = "jobs" | "applications" | "analytics";

const EmployerDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("jobs");
  const [notificationCount, setNotificationCount] = useState(5); // Mock notification count

  const renderContent = () => {
    switch (activeTab) {
      case "jobs":
        return <ManageJobs />;
      case "applications":
        return (
          <div className={styles.comingSoon}>
            Applications View - Coming Soon
          </div>
        );
      case "analytics":
        return (
          <div className={styles.comingSoon}>
            Analytics Dashboard - Coming Soon
          </div>
        );
      default:
        return <ManageJobs />;
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
                <Building size={32} className={styles.brandIcon} />
                <span className={styles.brandText}>EmployerHub</span>
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
                <Building size={40} />
              </div>
              <div className={styles.userInfo}>
                <h5 className={styles.userName}>Tech Solutions Ltd</h5>
                <span className={styles.userRole}>Employer</span>
              </div>
            </div>

            <Nav className="flex-column" variant="pills">
              <Nav.Item className={styles.navItem}>
                <Nav.Link
                  eventKey="jobs"
                  className={`${styles.navLink} ${
                    activeTab === "jobs" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("jobs")}
                >
                  <Briefcase size={18} className={styles.navIcon} />
                  <span>Manage Jobs</span>
                  <Badge bg="primary" pill className={styles.navBadge}>
                    8
                  </Badge>
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
                  <Users size={18} className={styles.navIcon} />
                  <span>Applications</span>
                  <Badge bg="primary" pill className={styles.navBadge}>
                    24
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={styles.navItem}>
                <Nav.Link
                  eventKey="analytics"
                  className={`${styles.navLink} ${
                    activeTab === "analytics" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("analytics")}
                >
                  <BarChart3 size={18} className={styles.navIcon} />
                  <span>Analytics</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <div className={styles.sidebarFooter}>
              <div className={styles.quickStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>8</span>
                  <span className={styles.statLabel}>Active Jobs</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>24</span>
                  <span className={styles.statLabel}>Total Applications</span>
                </div>
              </div>
            </div>
          </Col>

          {/* Main Content */}
          <Col md={9} lg={10} className={styles.contentArea}>
            <div className={styles.contentHeader}>
              <h1 className={styles.pageTitle}>
                {activeTab === "jobs" && "Manage Job Postings"}
                {activeTab === "applications" && "Applications"}
                {activeTab === "analytics" && "Analytics Dashboard"}
              </h1>
              <div className={styles.breadcrumb}>
                <span>Dashboard</span>
                <span className={styles.breadcrumbDivider}>/</span>
                <span className={styles.breadcrumbActive}>
                  {activeTab === "jobs" && "Jobs"}
                  {activeTab === "applications" && "Applications"}
                  {activeTab === "analytics" && "Analytics"}
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

export default EmployerDashboardPage;
