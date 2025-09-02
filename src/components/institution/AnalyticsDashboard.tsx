import React from "react";
import { Card, Col, Row, Badge } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { UserRole } from "../../types";
import {
  Users,
  Briefcase,
  FileText,
  CheckSquare,
  TrendingUp,
  MapPin,
  Clock,
} from "lucide-react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import styles from "../../styles/InstitutionDashboard.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend?: number;
}> = ({ title, value, icon, color, trend }) => (
  <Card className={styles.statCard}>
    <Card.Body>
      <div className={styles.statHeader}>
        <div className={styles.statIcon} style={{ color }}>
          {icon}
        </div>
        {trend !== undefined && (
          <Badge
            bg={trend >= 0 ? "success" : "danger"}
            className={styles.trendBadge}
          >
            {trend >= 0 ? "+" : ""}
            {trend}%
          </Badge>
        )}
      </div>
      <div className={styles.statContent}>
        <div className={styles.statValue}>{value.toLocaleString()}</div>
        <div className={styles.statTitle}>{title}</div>
      </div>
    </Card.Body>
  </Card>
);

export const AnalyticsDashboard: React.FC = () => {
  const { users } = useAppSelector((state) => state.auth);
  const { jobs } = useAppSelector((state) => state.jobs);
  const { applications } = useAppSelector((state) => state.applications);

  // Data for Stats
  const totalGraduates = users.filter(
    (u) => u.role === UserRole.Graduate
  ).length;
  const totalEmployers = users.filter(
    (u) => u.role === UserRole.Employer
  ).length;

  // Data for Jobs by Location Chart
  const jobsByLocation = jobs.reduce((acc, job) => {
    acc[job.location] = (acc[job.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = {
    labels: Object.keys(jobsByLocation),
    datasets: [
      {
        label: "Job Postings",
        data: Object.values(jobsByLocation),
        backgroundColor: "rgba(67, 97, 238, 0.8)",
        borderColor: "rgba(67, 97, 238, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Data for Application Status Pie Chart
  const appStatusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = {
    labels: Object.keys(appStatusCounts),
    datasets: [
      {
        label: "Applications",
        data: Object.values(appStatusCounts),
        backgroundColor: [
          "rgba(108, 117, 125, 0.8)",
          "rgba(23, 162, 184, 0.8)",
          "rgba(40, 167, 69, 0.8)",
          "rgba(220, 53, 69, 0.8)",
          "rgba(255, 193, 7, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  // Data for Monthly Applications Line Chart
  const monthlyApplicationsData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Applications",
        data: [65, 59, 80, 81, 56, 55, 72, 68, 75, 82, 90, 96],
        borderColor: "rgba(67, 97, 238, 1)",
        backgroundColor: "rgba(67, 97, 238, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div>
      <div className={styles.analyticsHeader}>
        <h3 className={styles.sectionTitle}>Portal Analytics Overview</h3>
        <p className={styles.sectionSubtitle}>
          Comprehensive insights into platform usage and engagement metrics
        </p>
      </div>

      <Row className={styles.statsRow}>
        <Col xs={12} md={6} lg={3} className="mb-4">
          <StatCard
            title="Total Graduates"
            value={totalGraduates}
            icon={<Users size={24} />}
            color="#17A2B8"
            trend={12}
          />
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-4">
          <StatCard
            title="Active Employers"
            value={totalEmployers}
            icon={<Briefcase size={24} />}
            color="#28A745"
            trend={8}
          />
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-4">
          <StatCard
            title="Open Positions"
            value={jobs.length}
            icon={<FileText size={24} />}
            color="#FFC107"
            trend={15}
          />
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-4">
          <StatCard
            title="Total Applications"
            value={applications.length}
            icon={<CheckSquare size={24} />}
            color="#DC3545"
            trend={22}
          />
        </Col>
      </Row>

      <Row className={styles.chartsRow}>
        <Col lg={8} className="mb-4">
          <Card className={styles.chartCard}>
            <Card.Header className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <MapPin size={20} className="me-2" />
                Job Distribution by Location
              </div>
            </Card.Header>
            <Card.Body>
              <Bar data={barChartData} options={barChartOptions} height={300} />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-4">
          <Card className={styles.chartCard}>
            <Card.Header className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <CheckSquare size={20} className="me-2" />
                Application Status
              </div>
            </Card.Header>
            <Card.Body>
              <Pie data={pieChartData} options={pieChartOptions} height={300} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12} className="mb-4">
          <Card className={styles.chartCard}>
            <Card.Header className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <TrendingUp size={20} className="me-2" />
                Monthly Applications Trend
              </div>
            </Card.Header>
            <Card.Body>
              <Line
                data={monthlyApplicationsData}
                options={lineChartOptions}
                height={100}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className={styles.insightsRow}>
        <Col md={6} className="mb-4">
          <Card className={styles.insightCard}>
            <Card.Header className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <Clock size={20} className="me-2" />
                Recent Activity
              </div>
            </Card.Header>
            <Card.Body>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <Users size={16} />
                  </div>
                  <div className={styles.activityContent}>
                    <p>25 new graduates registered this week</p>
                    <small className="text-muted">2 hours ago</small>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <Briefcase size={16} />
                  </div>
                  <div className={styles.activityContent}>
                    <p>TechCorp posted 3 new job positions</p>
                    <small className="text-muted">5 hours ago</small>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <CheckSquare size={16} />
                  </div>
                  <div className={styles.activityContent}>
                    <p>15 applications submitted in the last 24 hours</p>
                    <small className="text-muted">1 day ago</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className={styles.insightCard}>
            <Card.Header className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <TrendingUp size={20} className="me-2" />
                Performance Metrics
              </div>
            </Card.Header>
            <Card.Body>
              <div className={styles.metricsGrid}>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>92%</span>
                  <span className={styles.metricLabel}>Placement Rate</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>14 days</span>
                  <span className={styles.metricLabel}>Avg. Time to Hire </span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>78%</span>
                  <span className={styles.metricLabel}>
                    Employer Satisfaction
                  </span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricValue}>85%</span>
                  <span className={styles.metricLabel}>
                    Graduate Satisfaction
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
