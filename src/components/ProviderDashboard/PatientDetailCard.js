import React from 'react';
import { Card, Typography, Descriptions, Timeline, Divider, Tag, Button, Alert, Space, message } from 'antd';
import { CalendarOutlined, MedicineBoxOutlined, CheckCircleOutlined, ClockCircleOutlined, TrophyOutlined, BellOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Function to determine compliance status color
const getComplianceTag = (compliance) => {
    if (compliance >= 90) return <Tag color="green">Excellent</Tag>;
    if (compliance >= 75) return <Tag color="blue">Good</Tag>;
    if (compliance >= 60) return <Tag color="orange">Fair</Tag>;
    return <Tag color="red">Poor</Tag>;
};

// Goal Timeline Item Component
const GoalTimelineItem = ({ goal, index }) => (
    <Timeline.Item
        key={index}
        color={goal.status === 'achieved' ? 'green' : 'blue'}
        dot={goal.status === 'achieved'
            ? <CheckCircleOutlined style={{ fontSize: '16px' }} />
            : <ClockCircleOutlined style={{ fontSize: '16px' }} />
        }
    >
        <div style={{ marginBottom: '8px' }}>
            <strong>{goal.date}</strong>
            <Tag
                color={goal.status === 'achieved' ? 'green' : 'blue'}
                style={{ marginLeft: '8px' }}
            >
                {goal.status === 'achieved' ? 'Achieved' : 'In Progress'}
            </Tag>
        </div>
        <div style={{ marginBottom: '4px' }}>
            <strong>Goal:</strong> {goal.goal}
        </div>
        <div style={{ color: '#666' }}>
            <strong>Notes:</strong> {goal.notes}
        </div>
    </Timeline.Item>
);

// Patient Info Section Component
const PatientInfo = ({ patient }) => {
    const patientDetails = [
        { label: 'Age', value: `${patient.age} years` },
        { label: 'Gender', value: patient.gender },
        { label: 'Phone', value: patient.phone },
        { label: 'Email', value: patient.email },
        {
            label: (
                <span>
                    <MedicineBoxOutlined style={{ marginRight: '8px' }} />
                    Condition
                </span>
            ),
            value: patient.condition
        },
        {
            label: (
                <span>
                    <MedicineBoxOutlined style={{ marginRight: '8px' }} />
                    Medication
                </span>
            ),
            value: patient.medication
        },
        {
            label: (
                <span>
                    <CalendarOutlined style={{ marginRight: '8px' }} />
                    Last Visit
                </span>
            ),
            value: patient.lastVisit
        },
        { label: 'Total Appointments', value: patient.appointments }
    ];

    return (
        <Descriptions bordered column={1}>
            {patientDetails.map((detail, index) => (
                <Descriptions.Item key={index} label={detail.label}>
                    {detail.value}
                </Descriptions.Item>
            ))}
        </Descriptions>
    );
};

const PatientDetailCard = ({ patient }) => {
    if (!patient) return null;

    const isLowCompliance = patient.compliance < 60;

    const handleSendNotification = () => {
        // TODO: Implement actual notification API call
        message.success(`Notification sent to ${patient.patientName} at ${patient.email}`);
        console.log('Sending notification to:', {
            patientName: patient.patientName,
            email: patient.email,
            phone: patient.phone,
            compliance: patient.compliance,
            message: 'Your compliance rate is below 60%. Please schedule an appointment to discuss your treatment plan.'
        });
    };

    return (
        <div className="patient-detail-card">
            <Card bordered={false}>
                <div style={{ marginBottom: '24px' }}>
                    <Title level={3}>{patient.patientName}</Title>
                    <div style={{ marginTop: '12px' }}>
                        <span style={{ fontSize: '18px', marginRight: '8px' }}>
                            Compliance: {patient.compliance}%
                        </span>
                        {getComplianceTag(patient.compliance)}
                    </div>
                </div>

                {isLowCompliance && (
                    <Alert
                        message="Low Compliance Alert"
                        description={
                            <Space direction="vertical" size="small">
                                <span>
                                    This patient's compliance is below 60%. Consider sending a notification to encourage follow-up.
                                </span>
                                <Button
                                    type="primary"
                                    icon={<BellOutlined />}
                                    onClick={handleSendNotification}
                                    size="small"
                                >
                                    Send Notification
                                </Button>
                            </Space>
                        }
                        type="warning"
                        showIcon
                        style={{ marginBottom: '20px' }}
                    />
                )}

                <PatientInfo patient={patient} />

                {patient.goalHistory && patient.goalHistory.length > 0 && (
                    <>
                        <Divider orientation="left">
                            <TrophyOutlined /> Goal History
                        </Divider>
                        <Timeline mode="left">
                            {patient.goalHistory.map((goal, index) => (
                                <GoalTimelineItem key={index} goal={goal} index={index} />
                            ))}
                        </Timeline>
                    </>
                )}
            </Card>
        </div>
    );
};

export default PatientDetailCard;
