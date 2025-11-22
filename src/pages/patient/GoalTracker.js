import React, { useContext, useState } from "react";
import { Card, Input, Button, Row, Col, Typography, Empty, Slider } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CheckCircleTwoTone,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { PatientContext } from "../../context/PatientContext";
import { useNavigate } from "react-router-dom";
import './patient.css';

const { Title, Text } = Typography;

const GoalTracker = () => {
  const { goals, setGoals } = useContext(PatientContext);
  const [newGoal, setNewGoal] = useState("");
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const addGoal = () => {
    if (!newGoal.trim()) return;

    const updated = [
      ...goals,
      { id: Date.now(), type: newGoal, target: 100, current: 0 }
    ];

    setGoals(updated);
    setNewGoal("");
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const saveGoal = (goal) => {
    setGoals(goals.map((g) => (g.id === goal.id ? goal : g)));
    setEditingId(null);
  };

  return (
    <div
      style={{
        padding: 30,
        maxWidth: "1080px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Breadcrumb + Navigation */}
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>Home / Patient / <b>Goal Tracker</b></div>

        <div>
          <Button onClick={() => navigate(-1)} style={{ marginRight: 10 }}>⬅ Back</Button>
          <Button style={{ marginRight: 10 }} onClick={() => navigate("/patient/dashboard")}>Dashboard</Button>
          <Button type="primary" onClick={() => navigate("/patient/my-profile")}>My Profile</Button>
        </div>
      </div>

      <Title level={2} style={{ textAlign: "center" }}>Goal Tracker</Title>

      {/* Add Goal */}
      <Card
        style={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 10,
          padding: 20,
          margin: "20px auto",
        }}
        className="goalTracker"
      >
        <Row gutter={12}>
          <Col flex="auto">
            <Input
              size="large"
              placeholder="Add new goal (ex: Drink 5 cups)"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} size="large" onClick={addGoal}>
              Add
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Existing Goals */}
      <Row gutter={[16, 16]} style={{ maxWidth: 800, margin: "auto" }}>
        {goals.length === 0 && (
          <Card style={{ textAlign: "center", width: "100%", padding: 40 }}>
            <Empty description="No goals added yet" />
          </Card>
        )}

        {goals.map((goal) => (
          <Col xs={24} md={12} key={goal.id}>
            <Card
              hoverable
              style={{ borderRadius: 12, paddingBottom: 20, position: "relative" }}
            >
              <Title level={4} style={{ display: "flex", alignItems: "center" }}>
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8 }} />
                {goal.type}
              </Title>

              {/* Editable Goal Section */}
              {editingId === goal.id ? (
                <>
                  <Text strong>Target Value</Text>
                  <Slider
                    min={10}
                    max={500}
                    value={goal.target}
                    onChange={(value) =>
                      setGoals(goals.map((g) =>
                        g.id === goal.id ? { ...g, target: value } : g
                      ))
                    }
                  />

                  <Text strong>Current Progress</Text>
                  <Slider
                    min={0}
                    max={goal.target}
                    value={goal.current}
                    onChange={(value) =>
                      setGoals(goals.map((g) =>
                        g.id === goal.id ? { ...g, current: value } : g
                      ))
                    }
                  />

                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={() => saveGoal(goal)}
                    block
                    style={{ marginTop: 10 }}
                  >
                    Save Goal
                  </Button>
                </>
              ) : (
                <>
                  <Text>Target: {goal.target}</Text> <br />
                  <Text>Current: {goal.current}</Text>
                </>
              )}

              {/* Edit + Delete */}
              <Button
                danger
                icon={<DeleteOutlined />}
                style={{ position: "absolute", top: 12, right: 12 }}
                onClick={() => deleteGoal(goal.id)}
              />

              <Button
                icon={<EditOutlined />}
                style={{ position: "absolute", top: 12, right: 60 }}
                onClick={() => setEditingId(goal.id)}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GoalTracker;
