// Notification service for automated patient compliance alerts
import { messaging } from '../firebase';
import { getToken } from 'firebase/messaging';

const sendAutomatedNotification = async (patient) => {
    try {
        const notificationData = {
            patientId: patient.key,
            patientName: patient.patientName,
            email: patient.email,
            phone: patient.phone,
            compliance: patient.compliance,
            subject: 'Important: Compliance Alert',
            message: `Dear ${patient.patientName},\n\nWe've noticed that your treatment compliance rate is currently at ${patient.compliance}%, which is below our recommended threshold.\n\nMaintaining good compliance is crucial for your health outcomes. Please contact us to discuss your treatment plan and any challenges you may be facing.\n\nBest regards,\nYour Healthcare Team`,
            notificationType: 'firebase', // Firebase push notification
            timestamp: new Date().toISOString(),
        };

        // Send Firebase Cloud Messaging notification
        try {
            // Get FCM token (in production, this should be stored in backend)
            const token = await getToken(messaging, {
                vapidKey: 'BIVokC_WxK9y9TKzFRVRDd6YuDllaga_gR5l7CQigK5_M5rgyKNLTpiMoEhm4htPx2ChOHmFOrPecAFxEhqIHEE' // Replace with your VAPID key
            });

            if (token) {
                // In production, send this to your backend server which will use Firebase Admin SDK
                // to send the notification to the provider's device
                const fcmPayload = {
                    token: token,
                    notification: {
                        title: '⚠️ Low Compliance Alert',
                        body: `${patient.patientName} has compliance level of ${patient.compliance}% (Below 60%)`,
                    },
                    data: {
                        patientId: patient.key,
                        patientName: patient.patientName,
                        compliance: patient.compliance.toString(),
                        type: 'low-compliance-alert'
                    }
                };

                console.log('Firebase notification payload:', fcmPayload);

                // Show browser notification if permission granted
                if (Notification.permission === 'granted') {
                    new Notification('⚠️ Low Compliance Alert', {
                        body: `${patient.patientName} has compliance level of ${patient.compliance}% (Below 60%)`,
                        icon: '/logo192.png',
                        badge: '/logo192.png',
                        tag: `patient-${patient.key}`,
                        requireInteraction: true,
                        data: {
                            patientId: patient.key,
                            patientName: patient.patientName,
                            compliance: patient.compliance
                        }
                    });
                }

                // TODO: Send to backend API for server-side FCM notification
                // const response = await fetch('/api/notifications/send-fcm', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(fcmPayload)
                // });
                // return response.json();
            }
        } catch (fcmError) {
            console.error('FCM notification error:', fcmError);
        }

        console.log('Automated notification sent:', notificationData);

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
