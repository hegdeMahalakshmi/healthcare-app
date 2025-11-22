// Firebase Cloud Messaging Service Worker
// This file handles background notifications when the app is not in focus

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
    apiKey: "AIzaSyB3QDz4oo18VIaJUi0Z603kX5dH6w29pvU",
    authDomain: "hcl20-f1168.firebaseapp.com",
    projectId: "hcl20-f1168",
    storageBucket: "hcl20-f1168.firebasestorage.app",
    messagingSenderId: "89221867052",
    appId: "1:89221867052:web:96d318a1637b2a84de9389",
    measurementId: "G-Q6YPEVGV81"
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);

    const notificationTitle = payload.notification?.title || '⚠️ Low Compliance Alert';
    const notificationOptions = {
        body: payload.notification?.body || 'A patient requires attention',
        icon: '/logo192.png',
        badge: '/logo192.png',
        tag: payload.data?.patientId || 'default',
        requireInteraction: true,
        data: payload.data,
        actions: [
            {
                action: 'view',
                title: 'View Dashboard'
            },
            {
                action: 'close',
                title: 'Dismiss'
            }
        ]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('[firebase-messaging-sw.js] Notification clicked:', event);

    event.notification.close();

    if (event.action === 'view') {
        // Open the app when user clicks "View Dashboard"
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
