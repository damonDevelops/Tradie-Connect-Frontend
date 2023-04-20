import Developer from "../../pages/DevDashboard";
import SignIn from "../../pages/Common-Pages/SignIn";
import SignUp from "../../pages/Common-Pages/SignUp";

const routes = [
  {
    path: "/SignUp",
    component: SignUp,
    allowedRoles: ["Admin", "CUSTOMER", "SERVICE_PROVIDER"],
  },
  {
    path: "/SignIn",
    component: SignIn,
    allowedRoles: ["Admin", "CUSTOMER", "SERVICE_PROVIDER"],
  },
  {
    path: "/DevDashboard",
    component: Developer,
    allowedRoles: ["Admin"],
  },
];