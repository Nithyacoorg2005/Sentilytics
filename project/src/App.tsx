import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignIn from './components/SignIn';   // Using default export now
import Signup from './components/Signup';   // Using default export now
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
        {/* These pages are for users who are NOT logged in */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />

        {/* --- Protected Route --- */}
        {/* The main page of your app is now at the root path "/" */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        
        {/* Optional: Redirect any other path to the main page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;