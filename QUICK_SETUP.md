# Quick Setup Guide - Firebase Notifications

## ⚡ Quick Start (3 Steps)

### Step 1: Get VAPID Key from Firebase Console

1. Go to: https://console.firebase.google.com/project/hcl20-f1168/settings/cloudmessaging
2. Scroll to "Web Push certificates"
3. Click "Generate key pair" button
4. Copy the generated key

### Step 2: Update VAPID Keys

Replace `YOUR_VAPID_KEY_HERE` with your actual VAPID key in these 2 files:

**File 1: `src/firebase.js` (Line 39)**

```javascript
vapidKey: "YOUR_ACTUAL_VAPID_KEY";
```

**File 2: `src/utils/notificationService.js` (Line 19)**

```javascript
vapidKey: "YOUR_ACTUAL_VAPID_KEY";
```

### Step 3: Run the App

```bash
npm start
```

When you open the Provider Dashboard, click "Allow" when asked for notification permission.

## ✅ What's Already Done

- ✅ Firebase Cloud Messaging initialized
- ✅ Service worker created and registered
- ✅ Automatic compliance checking (every 5 minutes)
- ✅ Browser notifications implemented
- ✅ Background notification support
- ✅ Notifications trigger for patients with compliance < 60%

## 🔔 Current Low Compliance Patients

The system will automatically notify you about:

- **David Martinez** - 55% compliance (COPD patient)

## 🔧 Customize Settings

### Change notification frequency

In `src/components/ProviderDashboard/ProviderDashboard.js` (line 265):

```javascript
5 * 60 * 1000; // Current: every 5 minutes
```

### Change compliance threshold

In `src/utils/notificationService.js` (line 80):

```javascript
patient.compliance < 60; // Current: 60%
```

## 📝 Testing

1. Open Provider Dashboard
2. Allow notifications when prompted
3. Check console for "FCM Token" message
4. You should see notifications for David Martinez (55% compliance)
5. Test by closing the browser tab - notifications will still appear!

## 🐛 Troubleshooting

**No notifications?**

- Check if browser notifications are blocked (click lock icon in address bar)
- Check console for errors
- Ensure VAPID key is added

**Token not generated?**

- Verify you added the correct VAPID key
- Check if Cloud Messaging is enabled in Firebase Console

## 📚 Full Documentation

See `FIREBASE_NOTIFICATIONS_SETUP.md` for complete details.
