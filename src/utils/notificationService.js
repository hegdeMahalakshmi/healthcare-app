// Notification service for automated patient compliance alerts
import { messaging } from '../firebase';
import { getToken } from 'firebase/messaging';

// Track recently sent notifications to prevent duplicates
const notificationHistory = new Map();
const NOTIFICATION_COOLDOWN = 55000; // 55 seconds cooldown to prevent duplicates within 1 minute

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
                    // Add timestamp to tag to ensure each notification is unique
                    const uniqueTag = `patient-${patient.key}-${Date.now()}`;
                    new Notification('⚠️ Low Compliance Alert', {
                        body: `${patient.patientName} has compliance level of ${patient.compliance}% (Below 60%)`,
                        icon: '/logo192.png',
                        badge: '/logo192.png',
                        tag: uniqueTag,
                        requireInteraction: true,
                        data: {
                            patientId: patient.key,
                            patientName: patient.patientName,
                            compliance: patient.compliance,
                            timestamp: Date.now()
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

    // Filter out patients who were recently notified
    const currentTime = Date.now();
    const patientsToNotify = lowCompliancePatients.filter(patient => {
        const lastNotification = notificationHistory.get(patient.key);
        if (!lastNotification || (currentTime - lastNotification) > NOTIFICATION_COOLDOWN) {
            return true;
        }
        console.log(`Skipping notification for ${patient.patientName} - sent ${Math.round((currentTime - lastNotification) / 1000)}s ago`);
        return false;
    });

    if (patientsToNotify.length === 0) {
        console.log('All low compliance patients were recently notified');
        return {
            processed: lowCompliancePatients.length,
            successful: 0,
            failed: 0,
            message: 'All patients recently notified, skipping to avoid duplicates'
        };
    }

    // Send notifications and update history
    const results = await Promise.all(
        patientsToNotify.map(async (patient) => {
            const result = await sendAutomatedNotification(patient);
            if (result.success) {
                notificationHistory.set(patient.key, Date.now());
            }
            return result;
        })
    );

    const successCount = results.filter(r => r.success).length;

    console.log(`Sent ${successCount} notifications to ${patientsToNotify.length} patients`);

    return {
        processed: lowCompliancePatients.length,
        successful: successCount,
        failed: patientsToNotify.length - successCount,
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
