import React, { useContext } from "react";
import { Card, Progress, Row, Col, Typography, Divider, Tag, Button, message } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import { PatientContext } from "../../context/PatientContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;

const Dashboard = () => {
  const { goals } = useContext(PatientContext);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      message.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      message.error('Failed to logout');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: "1080px", margin: "auto" }}>

      {/* ================================
            BREADCRUMB + ACTION BUTTONS
      ================================= */}
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>Home / Patient / <b>Dashboard</b></div>

        <div>
          <Button
            style={{ marginRight: 10 }}
            onClick={() => navigate(-1)}
          >
            ⬅ Back
          </Button>

          <Button
            style={{ marginRight: 10 }}
            onClick={() => navigate("/patient/profile")}
          >
            My Profile
          </Button>

          <Button
            type="primary"
            onClick={() => navigate("/patient/goals")}
          >
            Goal Tracker
          </Button>

          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ marginLeft: 10 }}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* ================================
              PAGE TITLE
      ================================= */}
      <Title level={2} style={{ marginBottom: 20 }}>
        Patient Dashboard
      </Title>

      {/* ================================
              SUMMARY KPIs
      ================================= */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Title level={4}>Today's Steps</Title>
            <Text strong style={{ fontSize: 28 }}>6,200</Text>
            <p>Goal: 8,000</p>
            <Progress percent={75} />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Title level={4}>Water Intake</Title>
            <Text strong style={{ fontSize: 28 }}>5 / 8 cups</Text>
            <p>Hydrated Level</p>
            <Progress percent={62} strokeColor="#4caf50" />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Title level={4}>Sleep</Title>
            <Text strong style={{ fontSize: 28 }}>7 hrs</Text>
            <p>Goal: 8 hours</p>
            <Progress percent={87} strokeColor="#9c27b0" />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* ================================
              DAILY GOALS — DYNAMIC
      ================================= */}
      <Title level={3} style={{ marginTop: 30 }}>
        Daily Wellness Goals
      </Title>

      <Row gutter={[16, 16]}>
        {goals.map((g) => (
          <Col xs={24} md={12} lg={6} key={g.id}>
            <Card hoverable>
              <Title level={4}>{g.type}</Title>

              <Progress
                percent={Math.round((g.current / g.target) * 100)}
                strokeColor="#1890ff"
                style={{ marginBottom: 10 }}
              />

              <Text>
                <strong>{g.current}</strong> / {g.target}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider />

      {/* ================================
              HEALTH ACTIVITY OVERVIEW
      ================================= */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Activity Overview</Title>
            <ul style={{ paddingLeft: 18, marginTop: 10 }}>
              <li>🚶 6,200 steps walked today</li>
              <li>💧 5 cups water consumed</li>
              <li>😴 Slept 7 hours last night</li>
              <li>🔥 Burned 380 calories</li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Health Notifications</Title>

            <div style={{ marginTop: 10 }}>
              <Tag color="red">High Priority</Tag>
              <p>Upcoming blood test reminder for Jan 25, 2025</p>
            </div>

            <div style={{ marginTop: 10 }}>
              <Tag color="blue">Info</Tag>
              <p>Your average sleep improved by 12% this week.</p>
            </div>

            <div style={{ marginTop: 10 }}>
              <Tag color="green">Success</Tag>
              <p>You reached your hydration goal for 3 days in a row!</p>
            </div>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* ================================
              HEALTH TIP
      ================================= */}
      <Card style={{ marginTop: 20 }}>
        <Title level={4}>Health Tip of the Day</Title>
        <p>✨ Drink at least 8 cups of water and walk for 30 minutes daily.</p>
      </Card>
    </div>
  );
};

export default Dashboard;
