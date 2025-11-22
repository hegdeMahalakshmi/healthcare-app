import HomePage from "../pages/HomePage";
import ProviderDashboard from "../components/ProviderDashboard/ProviderDashboard";

/* PATIENT PAGES */
import PatientDashboard from "../pages/patient/Dashboard";
import MyProfile from "../pages/patient/MyProfile";
import GoalTracker from "../pages/patient/GoalTracker";

export const routesConfig = [
  {
    path: "/",
    component: HomePage,
    layout: null
  },
  {
    path: "/provider-dashboard",
    component: ProviderDashboard,
    layout: null
  },
  {
    path: "/patient/dashboard",
    component: PatientDashboard,
    layout: null
  },
  {
    path: "/patient/my-profile",
    component: MyProfile,
    layout: null
  },
  {
    path: "/patient/goals",
    component: GoalTracker,
    layout: null
  }
];
