import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
    const navigate = useNavigate();

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <div style={containerStyle}>
            <Result
                status="400"
                title="400"
                subTitle="Sorry, you don't have permission to access this page. Only providers can access the dashboard."
                extra={
                    <Button type="primary" onClick={handleBackToLogin}>
                        Back to Login
                    </Button>
                }
            />
        </div>
    );
}
