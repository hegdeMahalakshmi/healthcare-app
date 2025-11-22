## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/hegdeMahalakshmi/healthcare-app.git
cd healthcare-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable **Authentication** (Email/Password and Google Sign-In)
4. Create a **Firestore Database**
5. Get your Firebase configuration:

   - Go to Project Settings → General
   - Scroll down to "Your apps" section
   - Click the web icon (</>) to create a web app
   - Copy the configuration object

6. Update `src/firebase.js` with your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};
```

### 4. Set Up Firestore Database

Create a collection named `users` with the following structure:

```
users/
  {userId}/
    email: string
    role: "patient" | "provider"
    createdAt: timestamp
```

### 5. Start the Development Server

```bash
npm start
```

The app will open automatically in your browser at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder

### `npm run eject`

**Note: This is a one-way operation!** Ejects from Create React App configuration

# Healthcare App

A comprehensive healthcare management application built with React that enables patient wellness tracking and provider-patient management. The app features role-based dashboards for both patients and healthcare providers with real-time compliance monitoring and goal tracking.

## Features

### Patient Dashboard

- 📊 Track daily wellness goals (steps, water intake, sleep, etc.)
- 📈 Monitor health metrics and progress
- 👤 Manage personal profile and health information
- 🎯 Set and track health goals
- 🔔 Receive health notifications and reminders

### Provider Dashboard

- 👥 View and manage patient list
- 📉 Monitor patient compliance rates
- 📋 View detailed patient information and goal history
- 🔔 Automated notifications for low compliance patients
- 📊 Sortable and filterable patient data tables

### Authentication

- 🔐 Email/Password authentication
- 🌐 Google Sign-In integration
- 🔒 Role-based access control (Patient/Provider)
- 🚪 Secure logout functionality

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A **Firebase account** - [Create one here](https://firebase.google.com/)

## Project Structure

```
healthcare-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable components
│   │   ├── ErrorBoundary.js
│   │   ├── Login/
│   │   └── ProviderDashboard/
│   ├── context/         # React Context for state management
│   │   ├── AuthContext.jsx
│   │   └── PatientContext.jsx
│   ├── pages/           # Page components
│   │   ├── patient/
│   │   └── ErrorPage.js
│   ├── Routes/          # Route configuration
│   │   └── routes.js
│   ├── utils/           # Utility functions
│   │   └── notificationService.js
│   ├── App.js           # Main App component
│   ├── firebase.js      # Firebase configuration
│   └── index.js         # Entry point
├── package.json
└── README.md
```

## User Roles

### Patient

- Access to personal dashboard
- View and update profile
- Track health goals and metrics
- View health notifications

### Provider

- Access to provider dashboard
- View all patients and their compliance
- Monitor patient progress
- Send automated notifications

## Technologies Used

- **React** (v19.2.0) - Frontend framework
- **React Router** (v7.9.6) - Navigation and routing
- **Firebase** (v12.6.0) - Authentication and database
- **Ant Design** (v4.24.16) - UI component library
- **Recharts** (v3.4.1) - Data visualization

## Login Credentials for Testing

After setting up Firebase:

1. Create test accounts using the Sign Up page
2. Assign roles in Firestore:
   - For patients: Set `role: "patient"`
   - For providers: Set `role: "provider"`

## Troubleshooting

### Firebase Authentication Error

- Ensure Firebase Authentication is enabled in Firebase Console
- Verify your Firebase configuration in `src/firebase.js`

### Build Errors

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear cache: `npm cache clean --force`

### Port Already in Use

- Kill the process using port 3000
- Or run on a different port: `PORT=3001 npm start`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is part of an HCL training program.

## Support

For issues or questions, please create an issue in the GitHub repository.

---

Built with ❤️ using React and Firebase
