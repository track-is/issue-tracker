import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import IssuesPage from "../../pages/issues";

const Home = lazy(() => import("../../pages/home"));
const Dashboard = lazy(() => import("../../pages/dashboard"));
const Login = lazy(() => import("../../pages/auth/login"));
const Signup = lazy(() => import("../../pages/auth/signup"));
const Profile = lazy(() => import("../../pages/profile"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/issues" element={<IssuesPage />} />
      </Route>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
