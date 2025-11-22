import React, { useState } from 'react';
import { Table, Button, Tag, Card, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import './ProviderDashboard.css';

const { Title } = Typography;

const ProviderDashboard = () => {
    // Sample patient compliance data
    const [patientData] = useState([
        {
            key: '1',
            patientName: 'John Doe',
            compliance: 85,
            lastVisit: '2025-11-15',
            appointments: 12,
        },
        {
            key: '2',
            patientName: 'Jane Smith',
            compliance: 92,
            lastVisit: '2025-11-20',
            appointments: 8,
        },
        {
            key: '3',
            patientName: 'Robert Johnson',
            compliance: 68,
            lastVisit: '2025-11-10',
            appointments: 15,
        },
        {
            key: '4',
            patientName: 'Emily Davis',
            compliance: 95,
            lastVisit: '2025-11-21',
            appointments: 6,
        },
        {
            key: '5',
            patientName: 'Michael Wilson',
            compliance: 73,
            lastVisit: '2025-11-18',
            appointments: 10,
        },
    ]);

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

    // Handle view details action
    const handleViewDetails = (record) => {
        console.log('View details for:', record);
        // TODO: Implement navigation to patient details page
        alert(`Viewing details for ${record.patientName}`);
    };

    // Table columns configuration
    const columns = [
        {
            title: 'Patient Name',
            dataIndex: 'patientName',
            key: 'patientName',
            sorter: (a, b) => a.patientName.localeCompare(b.patientName),
        },
        {
            title: 'Compliance',
            dataIndex: 'compliance',
            key: 'compliance',
            sorter: (a, b) => a.compliance - b.compliance,
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

    return (
        <div className="provider-dashboard">
            <Card>
                <Title level={2}>Provider Dashboard</Title>
                <Title level={4} type="secondary">
                    Patient Compliance Overview
                </Title>
                <Table
                    columns={columns}
                    dataSource={patientData}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} patients`,
                    }}
                    bordered
                />
            </Card>
        </div>
    );
};

export default ProviderDashboard;
