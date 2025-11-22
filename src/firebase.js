// src/firebase.js
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB3QDz4oo18VIaJUi0Z603kX5dH6w29pvU",
    authDomain: "hcl20-f1168.firebaseapp.com",
    projectId: "hcl20-f1168",
    storageBucket: "hcl20-f1168.firebasestorage.app",
    messagingSenderId: "89221867052",
    appId: "1:89221867052:web:96d318a1637b2a84de9389",
    measurementId: "G-Q6YPEVGV81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firebase Cloud Messaging
export const messaging = getMessaging(app);

// Request notification permission and get FCM token
export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // Get FCM token
            const token = await getToken(messaging, {
                vapidKey: 'BIVokC_WxK9y9TKzFRVRDd6YuDllaga_gR5l7CQigK5_M5rgyKNLTpiMoEhm4htPx2ChOHmFOrPecAFxEhqIHEE' // Replace with your VAPID key from Firebase Console
            });
            if (token) {
                console.log('FCM Token:', token);
                return token;
            } else {
                console.log('No registration token available.');
                return null;
            }
        } else {
            console.log('Notification permission denied.');
            return null;
        }
    } catch (error) {
        console.error('Error getting notification permission:', error);
        return null;
    }
};

// Handle foreground messages
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log('Message received in foreground:', payload);
            resolve(payload);
        });
    });