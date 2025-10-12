import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if the authentication token exists in local storage
  const token = localStorage.getItem('token');

  // If the token exists, the user is authenticated.
  // The <Outlet /> component renders the actual page they were trying to visit (e.g., the Dashboard).
  // If the token does not exist, redirect them to the /login page.
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;