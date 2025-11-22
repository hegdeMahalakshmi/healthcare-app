import ProviderDashboard from '../components/ProviderDashboard/ProviderDashboard';
import { lazy } from 'react';
import Login from '../components/Login/Login.jsx';
import ErrorPage from '../pages/ErrorPage';
import PatientDashboard from "../pages/patient/Dashboard";
import MyProfile from "../pages/patient/MyProfile";
import GoalTracker from "../pages/patient/GoalTracker";
import ProfileForm from "../pages/patient/ProfileForm";

const SignUp = lazy(() => import('../components/Login/SignUp.jsx'));

// Suspense fallback component
export const SuspenseFallback = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
    }}>
        Loading...
    </div>
);

export const routesConfig = [
    {
        path: '/',
        component: Login,
        exact: true
    },
    {
        path: '/login',
        component: Login,
        exact: true
    },
    {
        path: '/signup',
        component: SignUp,
        exact: true
    },
    {
        path: '/provider-dashboard',
        component: ProviderDashboard,
        exact: true
    },
    {
        path: '/error',
        component: ErrorPage,
        exact: true
    },
    {
        path: "/",
        component: MyProfile,
        layout: null
    },
    //   {
    //     path: "/provider-dashboard",
    //     component: ProviderDashboard,
    //     layout: null
    //   },
    {
        path: "/patient/dashboard",
        component: PatientDashboard,
        layout: null
    },
    {
        path: "/patient/Profile",
        component: ProfileForm,
        layout: null
    },
    {
        path: "/patient/goals",
        component: GoalTracker,
        layout: null
    }
];