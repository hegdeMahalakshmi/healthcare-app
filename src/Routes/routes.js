import ProviderDashboard from '../components/ProviderDashboard/ProviderDashboard';
import { lazy } from 'react';
import Login from '../components/Login/Login.jsx';
import ErrorPage from '../pages/ErrorPage';

const SignUp = lazy(() => import('../components/Login/SignUp.jsx'));

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
    }
];
