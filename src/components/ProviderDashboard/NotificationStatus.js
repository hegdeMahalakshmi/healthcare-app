import React from 'react';
import { Alert, Badge, Space, Typography } from 'antd';
import { BellOutlined, WarningOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * NotificationStatus component displays the current notification system status
 * and shows alerts for patients with low compliance
 */
const NotificationStatus = ({ patients, notificationEnabled }) => {
    // Filter patients with compliance below 60%
    const lowCompliancePatients = patients.filter(
        patient => patient.compliance < 60
    );

    if (!notificationEnabled) {
        return (
            <Alert
                message="Enable Notifications"
                description="Please enable browser notifications to receive automatic alerts for patients with low compliance."
                type="warning"
                showIcon
                icon={<BellOutlined />}
                style={{ marginBottom: 16 }}
            />
        );
    }

    if (lowCompliancePatients.length === 0) {
        return (
            <Alert
                message="All Patients on Track"
                description="No patients currently have compliance levels below 60%. Automatic monitoring is active."
                type="success"
                showIcon
                style={{ marginBottom: 16 }}
            />
        );
    }

    return (
        <Alert
            message={
                <Space>
                    <WarningOutlined />
                    <Text strong>Low Compliance Alerts Active</Text>
                    <Badge
                        count={lowCompliancePatients.length}
                        style={{ backgroundColor: '#ff4d4f' }}
                    />
                </Space>
            }
            description={
                <div>
                    <Text>
                        {lowCompliancePatients.length} patient{lowCompliancePatients.length > 1 ? 's' : ''} with compliance below 60%:
                    </Text>
                    <ul style={{ marginTop: 8, marginBottom: 0 }}>
                        {lowCompliancePatients.map(patient => (
                            <li key={patient.key}>
                                <Text strong>{patient.patientName}</Text> - {patient.compliance}% compliance
                            </li>
                        ))}
                    </ul>
                    <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: 'block' }}>
                        Automatic notifications are being sent every 1 minutes
                    </Text>
                </div>
            }
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
        />
    );
};

export default NotificationStatus;
