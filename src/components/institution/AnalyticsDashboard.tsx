import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { UserRole } from "../../types";
import { Users, Briefcase, FileText, CheckSquare } from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <Card className="h-100" style={{ borderLeft: `5px solid ${color}` }}>
    <Card.Body className="d-flex align-items-center">
      <div className="flex-shrink-0 me-3" style={{ fontSize: "2.5rem", color }}>
        {icon}
      </div>
      <div>
        <div className="text-secondary">{title}</div>
        <div className="fs-2 fw-bold">{value}</div>
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
        label: "# of Jobs",
        data: Object.values(jobsByLocation),
        backgroundColor: "rgba(0, 123, 255, 0.5)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
      },
    ],
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
        label: "Application Status",
        data: Object.values(appStatusCounts),
        backgroundColor: ["#6c757d", "#17a2b8", "#28a745", "#dc3545"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3 className="mb-4">Portal Analytics Dashboard</h3>
      <Row xs={1} md={2} xl={4} className="g-4 mb-4">
        <Col>
          <StatCard
            title="Total Graduates"
            value={totalGraduates}
            icon={<Users />}
            color="#17A2B8"
          />
        </Col>
        <Col>
          <StatCard
            title="Total Employers"
            value={totalEmployers}
            icon={<Briefcase />}
            color="#28A745"
          />
        </Col>
        <Col>
          <StatCard
            title="Open Jobs"
            value={jobs.length}
            icon={<FileText />}
            color="#FFC107"
          />
        </Col>
        <Col>
          <StatCard
            title="Total Applications"
            value={applications.length}
            icon={<CheckSquare />}
            color="#DC3545"
          />
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <Card.Title>Jobs by Location</Card.Title>
              <Bar data={barChartData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Application Status Overview</Card.Title>
              <Pie data={pieChartData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
