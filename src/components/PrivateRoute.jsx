// src/components/PrivateRoute.jsx

import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ isAuth }) {
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;