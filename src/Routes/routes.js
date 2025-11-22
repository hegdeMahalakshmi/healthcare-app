import HomePage from '../pages/HomePage';
import ProviderDashboard from '../components/ProviderDashboard/ProviderDashboard';

export const signin_path = "/";

export const routesConfig = [
    {
        path: signin_path,
        component: HomePage,
    },
    {
        path: '/provider-dashboard',
        component: ProviderDashboard,
        exact: true
    }
];
