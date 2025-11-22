# Firebase Cloud Messaging Setup for Healthcare App

## Overview

This implementation provides automatic Firebase notifications for providers when a patient's compliance level falls below 60%. The system checks patient compliance levels automatically and sends push notifications to healthcare providers.

## Features Implemented

### 1. **Automatic Compliance Monitoring**

- Monitors all patients' compliance levels automatically
- Checks every 5 minutes (configurable in `ProviderDashboard.js`)
- Identifies patients with compliance < 60%

### 2. **Firebase Cloud Messaging Integration**

- Browser push notifications
- Background notification support via service worker
- Foreground notification handling
- Rich notification with patient details

### 3. **Notification Types**

- **Browser Notifications**: Native browser notifications when app is in focus
- **Background Notifications**: Via service worker when app is in background
- **In-App Messages**: Ant Design message alerts within the dashboard

## Setup Instructions

### Step 1: Enable Firebase Cloud Messaging

1. **Go to Firebase Console** (https://console.firebase.google.com)

   - Select your project: `hcl20-f1168`
   - Navigate to **Project Settings** > **Cloud Messaging**

2. **Generate VAPID Key**

   - Under "Web configuration" section
   - Click **Generate key pair** under "Web Push certificates"
   - Copy the generated VAPID key

3. **Update VAPID Key in Code**

   Update in `src/firebase.js`:

   ```javascript
   const token = await getToken(messaging, {
     vapidKey: "YOUR_VAPID_KEY_HERE", // Replace with your actual VAPID key
   });
   ```

   Update in `src/utils/notificationService.js`:

   ```javascript
   const token = await getToken(messaging, {
     vapidKey: "YOUR_VAPID_KEY_HERE", // Replace with your actual VAPID key
   });
   ```

### Step 2: Register Service Worker

The service worker is already created at `public/firebase-messaging-sw.js`. To register it:

1. **Update `public/index.html`** - Add before closing `</body>` tag:
   ```html
   <script>
     if ("serviceWorker" in navigator) {
       navigator.serviceWorker
         .register("/firebase-messaging-sw.js")
         .then((registration) => {
           console.log("Service Worker registered:", registration);
         })
         .catch((error) => {
           console.log("Service Worker registration failed:", error);
         });
     }
   </script>
   ```

### Step 3: Enable Browser Notifications

When the provider first logs into the dashboard, they will be prompted to allow notifications:

1. Click **Allow** when the browser asks for notification permission
2. If blocked, enable manually:
   - **Chrome/Edge**: Click lock icon in address bar → Site settings → Notifications → Allow
   - **Firefox**: Click lock icon → Permissions → Notifications → Allow
   - **Safari**: Safari → Settings → Websites → Notifications → Allow

### Step 4: Test the Implementation

1. **Start the application**:

   ```bash
   npm start
   ```

2. **Log in as a Provider**

3. **Check Console Logs**:

   - You should see: "Notification permission granted"
   - You should see: "FCM Token: [your-token]"
   - You should see: "Automated notification sent" for patients with compliance < 60%

4. **Verify Notifications**:
   - Currently, two patients have compliance < 60%:
     - David Martinez: 55%
   - You should receive notifications for these patients

## File Structure

```
src/
├── firebase.js                           # Firebase initialization + FCM setup
├── utils/
│   └── notificationService.js            # Notification logic
└── components/
    └── ProviderDashboard/
        └── ProviderDashboard.js          # Dashboard with auto-notifications

public/
└── firebase-messaging-sw.js              # Service worker for background notifications
```

## Configuration

### Adjust Notification Frequency

In `ProviderDashboard.js`, modify the interval (default: 5 minutes):

```javascript
const intervalId = setInterval(() => {
  sendNotifications();
}, 5 * 60 * 1000); // Change to desired interval in milliseconds
```

Common intervals:

- Every 5 minutes: `5 * 60 * 1000`
- Every hour: `60 * 60 * 1000`
- Every 6 hours: `6 * 60 * 60 * 1000`
- Daily: `24 * 60 * 60 * 1000`

### Adjust Compliance Threshold

In `notificationService.js`, modify the threshold (default: 60%):

```javascript
const lowCompliancePatients = patients.filter(
  (patient) => patient.compliance < 60
);
```

Change `60` to your desired threshold percentage.

## Production Deployment

### Backend Integration Required

For production, you need a backend server to send FCM notifications:

1. **Set up Firebase Admin SDK** on your backend
2. **Create API endpoint** (e.g., `/api/notifications/send-fcm`)
3. **Update `notificationService.js`**:

```javascript
// Uncomment and update this section:
const response = await fetch("/api/notifications/send-fcm", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(fcmPayload),
});
return response.json();
```

4. **Backend Example (Node.js)**:

```javascript
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/api/notifications/send-fcm", async (req, res) => {
  const { token, notification, data } = req.body;

  try {
    const response = await admin.messaging().send({
      token: token,
      notification: notification,
      data: data,
    });
    res.json({ success: true, messageId: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

## Troubleshooting

### Notifications Not Appearing

1. **Check browser permissions**: Ensure notifications are allowed
2. **Check console**: Look for FCM token in logs
3. **VAPID key**: Ensure you've added your VAPID key
4. **HTTPS**: FCM requires HTTPS in production (localhost is OK for dev)
5. **Service Worker**: Check if registered in Chrome DevTools → Application → Service Workers

### Token Not Generated

- Ensure VAPID key is correct
- Check browser console for errors
- Verify Firebase Cloud Messaging is enabled in Firebase Console

### Background Notifications Not Working

- Ensure service worker is registered
- Check service worker in DevTools
- Verify `firebase-messaging-sw.js` is in `public/` folder

## Security Notes

1. **Never expose Firebase config** in production without security rules
2. **Validate tokens** on backend before sending notifications
3. **Store FCM tokens securely** in your database
4. **Implement user authentication** for notification endpoints
5. **Use Firebase Security Rules** to protect data

## Current Patients with Low Compliance

Based on the current data, these patients will trigger automatic notifications:

| Patient Name   | Compliance | Status |
| -------------- | ---------- | ------ |
| David Martinez | 55%        | Poor   |

## Next Steps

1. ✅ Replace `YOUR_VAPID_KEY_HERE` with actual VAPID key
2. ✅ Register service worker in `index.html`
3. ✅ Test notifications in browser
4. ⏳ Set up backend API for production FCM
5. ⏳ Store FCM tokens in Firestore
6. ⏳ Implement real-time patient data from Firestore
7. ⏳ Add notification history/logs
8. ⏳ Add notification preferences for providers

## Resources

- [Firebase Cloud Messaging Docs](https://firebase.google.com/docs/cloud-messaging/js/client)
- [Web Push Notifications Guide](https://web.dev/push-notifications-overview/)
- [Service Workers Guide](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
