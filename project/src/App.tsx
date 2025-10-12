// File: src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages and Components
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { SignIn } from './components/SignIn'; // Ensure paths are correct
import { Signup } from './components/Signup'; // Ensure paths are correct
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;