// Notification service for automated patient compliance alerts

const sendAutomatedNotification = async (patient) => {
    try {
        // TODO: Replace with actual API endpoint
        const notificationData = {
            patientId: patient.key,
            patientName: patient.patientName,
            email: patient.email,
            phone: patient.phone,
            compliance: patient.compliance,
            subject: 'Important: Compliance Alert',
            message: `Dear ${patient.patientName},\n\nWe've noticed that your treatment compliance rate is currently at ${patient.compliance}%, which is below our recommended threshold.\n\nMaintaining good compliance is crucial for your health outcomes. Please contact us to discuss your treatment plan and any challenges you may be facing.\n\nBest regards,\nYour Healthcare Team`,
            notificationType: 'email', // Can be 'email', 'sms', or 'both'
            timestamp: new Date().toISOString(),
        };

        // Simulate API call - Replace with actual fetch/axios call
        console.log('Automated notification sent:', notificationData);

        // Example API call structure:
        // const response = await fetch('/api/notifications/send', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(notificationData)
        // });
        // return response.json();

        return {
            success: true,
            message: 'Notification sent successfully',
            data: notificationData
        };
    } catch (error) {
        console.error('Failed to send notification:', error);
        return {
            success: false,
            message: 'Failed to send notification',
            error: error.message
        };
    }
};

// Check and send notifications for low compliance patients
export const checkAndNotifyLowCompliance = async (patients) => {
    const lowCompliancePatients = patients.filter(patient => patient.compliance < 60);

    if (lowCompliancePatients.length === 0) {
        return {
            processed: 0,
            message: 'No patients with low compliance found'
        };
    }

    const results = await Promise.all(
        lowCompliancePatients.map(patient => sendAutomatedNotification(patient))
    );

    const successCount = results.filter(r => r.success).length;

    return {
        processed: lowCompliancePatients.length,
        successful: successCount,
        failed: lowCompliancePatients.length - successCount,
        results
    };
};

// Schedule automated notifications (can be called on component mount or via cron job)
export const scheduleAutomatedNotifications = (patients, interval = 24 * 60 * 60 * 1000) => {
    // Run immediately
    checkAndNotifyLowCompliance(patients);

    // Schedule periodic checks (default: once per day)
    const intervalId = setInterval(() => {
        checkAndNotifyLowCompliance(patients);
    }, interval);

    // Return cleanup function
    return () => clearInterval(intervalId);
};

const notificationService = {
    sendAutomatedNotification,
    checkAndNotifyLowCompliance,
    scheduleAutomatedNotifications
};

export default notificationService;
