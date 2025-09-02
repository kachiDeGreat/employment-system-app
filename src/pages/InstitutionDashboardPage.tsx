import React, { useState } from "react";
import { Nav, Container, Row, Col, Badge, Button } from "react-bootstrap";
import { AnalyticsDashboard } from "../components/institution/AnalyticsDashboard";
import {
  BarChart3,
  Users,
  Building,
  Bell,
  LogOut,
  Settings,
  School,
  Download,
} from "lucide-react";
import styles from "../styles/InstitutionDashboard.module.css";

type TabKey = "analytics" | "graduates" | "employers";

const InstitutionDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("analytics");
  const [notificationCount, setNotificationCount] = useState(2); // Mock notification count

  const renderContent = () => {
    switch (activeTab) {
      case "analytics":
        return <AnalyticsDashboard />;
      // case "graduates":
      //   return (
      //     <div className={styles.comingSoon}>
      //       Graduate Management - Coming Soon
      //     </div>
      //   );
      // case "employers":
      //   return (
      //     <div className={styles.comingSoon}>
      //       Employer Management - Coming Soon
      //     </div>
      //   );
      default:
        return <AnalyticsDashboard />;
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
                <School size={32} className={styles.brandIcon} />
                <span className={styles.brandText}>InstitutionHub</span>
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
                <School size={40} />
              </div>
              <div className={styles.userInfo}>
                <h5 className={styles.userName}>University of Tech</h5>
                <span className={styles.userRole}>Institution</span>
              </div>
            </div>

            <Nav className="flex-column" variant="pills">
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
              {/* <Nav.Item className={styles.navItem}>
                <Nav.Link
                  eventKey="graduates"
                  className={`${styles.navLink} ${
                    activeTab === "graduates" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("graduates")}
                >
                  <Users size={18} className={styles.navIcon} />
                  <span>Graduates</span>
                  <Badge bg="primary" pill className={styles.navBadge}>
                    248
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={styles.navItem}>
                <Nav.Link
                  eventKey="employers"
                  className={`${styles.navLink} ${
                    activeTab === "employers" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("employers")}
                >
                  <Building size={18} className={styles.navIcon} />
                  <span>Employers</span>
                  <Badge bg="primary" pill className={styles.navBadge}>
                    45
                  </Badge>
                </Nav.Link>
              </Nav.Item> */}
            </Nav>

            <div className={styles.sidebarFooter}>
              <div className={styles.quickStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>92%</span>
                  <span className={styles.statLabel}>Placement Rate</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>156</span>
                  <span className={styles.statLabel}>Hired This Year</span>
                </div>
              </div>
            </div>
          </Col>

          {/* Main Content */}
          <Col md={9} lg={10} className={styles.contentArea}>
            <div className={styles.contentHeader}>
              <div>
                <h1 className={styles.pageTitle}>
                  {activeTab === "analytics" && "Analytics Dashboard"}
                  {activeTab === "graduates" && "Graduate Management"}
                  {activeTab === "employers" && "Employer Management"}
                </h1>
                <div className={styles.breadcrumb}>
                  <span>Dashboard</span>
                  <span className={styles.breadcrumbDivider}>/</span>
                  <span className={styles.breadcrumbActive}>
                    {activeTab === "analytics" && "Analytics"}
                    {activeTab === "graduates" && "Graduates"}
                    {activeTab === "employers" && "Employers"}
                  </span>
                </div>
              </div>
              {activeTab === "analytics" && (
                <Button
                  variant="outline-primary"
                  className={styles.exportButton}
                >
                  <Download size={18} className="me-2" />
                  Export Report
                </Button>
              )}
            </div>

            <div className={styles.mainContent}>{renderContent()}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InstitutionDashboardPage;
