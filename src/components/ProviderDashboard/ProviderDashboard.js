import React from 'react';
import 'antd/dist/antd.css';
import './ProviderDashboard.css';
import { Button, Table, Tag, Card, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

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

// Handle view details action
const handleViewDetails = (record) => {
    console.log('View details for:', record);
    // TODO: Implement navigation to patient details page
    alert(`Viewing details for ${record.patientName}`);
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
    {
        key: '6',
        patientName: 'Sarah Anderson',
        compliance: 88,
        lastVisit: '2025-11-19',
        appointments: 9,
    },
    {
        key: '7',
        patientName: 'David Martinez',
        compliance: 55,
        lastVisit: '2025-11-05',
        appointments: 18,
    },
    {
        key: '8',
        patientName: 'Lisa Thompson',
        compliance: 91,
        lastVisit: '2025-11-22',
        appointments: 7,
    },
];

const ProviderDashboard = () => (
    <div className="provider-dashboard-container">
        <Card>
            <Title level={2}>Provider Dashboard</Title>
            <Title level={4} type="secondary">
                Patient Compliance Overview
            </Title>
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
    </div>
);

export default ProviderDashboard;