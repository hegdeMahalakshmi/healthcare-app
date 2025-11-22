import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import './ProviderDashboard.css';
import { Button, Table, Tag, Card, Typography, Modal, message } from 'antd';
import { EyeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import PatientDetailCard from './PatientDetailCard';
import { checkAndNotifyLowCompliance } from '../../utils/notificationService';
import { useAuth } from '../../context/AuthContext';

const { Title } = Typography;

// Function to determine compliance status color
const getComplianceTag = (compliance) => {
    if (compliance >= 90) {
        return <Tag color="green">Excellent</Tag>;
    } else if (compliance >= 75) {
        return <Tag color="blue">Good</Tag>;
    } else if (compliance >= 60) {
        return <Tag color="orange">Fair</Tag>;
    } else {
        return <Tag color="red">Poor</Tag>;
    }
};

const ProviderDashboard = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const { logout } = useAuth();
    const navigate = useNavigate();

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

    // Handle view details action
    const handleViewDetails = (record) => {
        setSelectedPatient(record);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedPatient(null);
    };

    const columns = [
        {
            title: 'Patient Name',
            dataIndex: 'patientName',
            key: 'patientName',
            sorter: (a, b) => a.patientName.localeCompare(b.patientName),
            responsive: ['xs', 'sm', 'md', 'lg'],
        },
        {
            title: 'Compliance',
            dataIndex: 'compliance',
            key: 'compliance',
            sorter: (a, b) => a.compliance - b.compliance,
            responsive: ['xs', 'sm', 'md', 'lg'],
            render: (compliance) => (
                <div>
                    <span style={{ marginRight: '8px' }}>{compliance}%</span>
                    {getComplianceTag(compliance)}
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            responsive: ['xs', 'sm', 'md', 'lg'],
            render: (_, record) => (
                <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={() => handleViewDetails(record)}
                >
                    View Details
                </Button>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            patientName: 'John Doe',
            compliance: 85,
            lastVisit: '2025-11-15',
            appointments: 12,
            age: 45,
            gender: 'Male',
            phone: '(555) 123-4567',
            email: 'john.doe@email.com',
            condition: 'Hypertension',
            medication: 'Lisinopril 10mg',
            goalHistory: [
                { date: '2025-11-15', goal: 'Reduce blood pressure to 130/80', status: 'achieved', notes: 'Successfully maintained target BP for 2 weeks' },
                { date: '2025-10-20', goal: 'Daily exercise for 30 minutes', status: 'in-progress', notes: 'Currently at 5 days/week' },
                { date: '2025-09-10', goal: 'Reduce sodium intake to 2000mg/day', status: 'achieved', notes: 'Consistently below target' },
            ],
        },
        {
            key: '2',
            patientName: 'Jane Smith',
            compliance: 92,
            lastVisit: '2025-11-20',
            appointments: 8,
            age: 38,
            gender: 'Female',
            phone: '(555) 234-5678',
            email: 'jane.smith@email.com',
            condition: 'Diabetes Type 2',
            medication: 'Metformin 500mg',
            goalHistory: [
                { date: '2025-11-20', goal: 'HbA1c below 7%', status: 'achieved', notes: 'Latest test: 6.8%' },
                { date: '2025-10-15', goal: 'Weight loss of 10 lbs', status: 'achieved', notes: 'Lost 12 lbs through diet and exercise' },
                { date: '2025-09-01', goal: 'Monitor blood glucose 3x daily', status: 'achieved', notes: 'Excellent record keeping' },
            ],
        },
        {
            key: '3',
            patientName: 'Robert Johnson',
            compliance: 68,
            lastVisit: '2025-11-10',
            appointments: 15,
            age: 62,
            gender: 'Male',
            phone: '(555) 345-6789',
            email: 'robert.j@email.com',
            condition: 'Arthritis',
            medication: 'Ibuprofen 400mg',
            goalHistory: [
                { date: '2025-11-10', goal: 'Attend physical therapy 2x/week', status: 'in-progress', notes: 'Missed 2 sessions last month' },
                { date: '2025-10-05', goal: 'Improve mobility in knee joint', status: 'in-progress', notes: 'Some improvement noted' },
            ],
        },
        {
            key: '4',
            patientName: 'Emily Davis',
            compliance: 95,
            lastVisit: '2025-11-21',
            appointments: 6,
            age: 29,
            gender: 'Female',
            phone: '(555) 456-7890',
            email: 'emily.davis@email.com',
            condition: 'Asthma',
            medication: 'Albuterol Inhaler',
            goalHistory: [
                { date: '2025-11-21', goal: 'Zero asthma attacks this month', status: 'achieved', notes: 'Excellent control' },
                { date: '2025-10-12', goal: 'Identify and avoid triggers', status: 'achieved', notes: 'Keeping detailed trigger diary' },
            ],
        },
        {
            key: '5',
            patientName: 'Michael Wilson',
            compliance: 73,
            lastVisit: '2025-11-18',
            appointments: 10,
            age: 55,
            gender: 'Male',
            phone: '(555) 567-8901',
            email: 'michael.w@email.com',
            condition: 'High Cholesterol',
            medication: 'Atorvastatin 20mg',
            goalHistory: [
                { date: '2025-11-18', goal: 'LDL cholesterol below 100 mg/dL', status: 'in-progress', notes: 'Current: 115 mg/dL, improving' },
                { date: '2025-10-01', goal: 'Reduce dietary fat intake', status: 'in-progress', notes: 'Making progress with meal planning' },
            ],
        },
        {
            key: '6',
            patientName: 'Sarah Anderson',
            compliance: 88,
            lastVisit: '2025-11-19',
            appointments: 9,
            age: 42,
            gender: 'Female',
            phone: '(555) 678-9012',
            email: 'sarah.a@email.com',
            condition: 'Migraine',
            medication: 'Sumatriptan 50mg',
            goalHistory: [
                { date: '2025-11-19', goal: 'Reduce migraines to 2 per month', status: 'achieved', notes: 'Only 1 migraine in November' },
                { date: '2025-09-20', goal: 'Maintain headache diary', status: 'achieved', notes: 'Consistent tracking helps identify patterns' },
            ],
        },
        {
            key: '7',
            patientName: 'David Martinez',
            compliance: 55,
            lastVisit: '2025-11-05',
            appointments: 18,
            age: 68,
            gender: 'Male',
            phone: '(555) 789-0123',
            email: 'david.m@email.com',
            condition: 'COPD',
            medication: 'Spiriva Inhaler',
            goalHistory: [
                { date: '2025-11-05', goal: 'Quit smoking', status: 'in-progress', notes: 'Reduced to 5 cigarettes/day from 20' },
                { date: '2025-09-15', goal: 'Use inhaler as prescribed', status: 'in-progress', notes: 'Needs reminder system' },
            ],
        },
        {
            key: '8',
            patientName: 'Lisa Thompson',
            compliance: 91,
            lastVisit: '2025-11-22',
            appointments: 7,
            age: 34,
            gender: 'Female',
            phone: '(555) 890-1234',
            email: 'lisa.t@email.com',
            condition: 'Anxiety',
            medication: 'Sertraline 50mg',
            goalHistory: [
                { date: '2025-11-22', goal: 'Practice mindfulness 10 min daily', status: 'achieved', notes: 'Consistent daily practice' },
                { date: '2025-10-18', goal: 'Reduce panic attacks', status: 'achieved', notes: 'No panic attacks in 3 weeks' },
                { date: '2025-09-05', goal: 'Attend therapy sessions weekly', status: 'achieved', notes: 'Perfect attendance' },
            ],
        },
    ];

    // Automated notification system
    useEffect(() => {
        // Send automated notifications on component mount
        const sendNotifications = async () => {
            const result = await checkAndNotifyLowCompliance(data);

            if (result.processed > 0) {
                message.info(
                    `Automated notifications sent to ${result.successful} patient(s) with low compliance`,
                    5
                );
            }
        };

        sendNotifications();

        // Set up daily automated notifications (every 24 hours)
        const intervalId = setInterval(() => {
            sendNotifications();
        }, 24 * 60 * 60 * 1000);

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run once on mount and set up daily interval

    return (
        <div className="provider-dashboard-container">
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <Title level={2} style={{ marginBottom: 0 }}>Provider Dashboard</Title>
                        <Title level={4} type="secondary" style={{ marginTop: '8px' }}>
                            Patient Compliance Overview
                        </Title>
                    </div>
                    <Button
                        type="default"
                        danger
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        responsive: true,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} patients`,
                    }}
                />
            </Card>

            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <UserOutlined />
                        <span>Patient Details</span>
                    </div>
                }
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={[
                    <Button key="close" type="primary" onClick={handleModalClose}>
                        Close
                    </Button>,
                ]}
                width={700}
            >
                <PatientDetailCard patient={selectedPatient} />
            </Modal>
        </div>
    );
};

export default ProviderDashboard;