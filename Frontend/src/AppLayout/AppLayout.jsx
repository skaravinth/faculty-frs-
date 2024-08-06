import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import Dashboard from '../pages/User/Dashboard/Dashboard';
import VerticalFRS from '../pages/User/VerticalFRS/VerticalFRS';
import FRSHistory from '../pages/User/FRSHistory/FRSHistory';
import HeadDashboard from '../pages/Head/HeadDashboard/Head';
import FRSEntry from '../pages/Head/FRSEntry/FRSEntry';
import Admin from '../pages/Admin/AdminDashboard/Admin';
import VerticalwiseFRS from '../pages/Admin/FRSVertical/FRSVertical';
import DepartmentwiseFRS from '../pages/Admin/FRSDepartment/FRSDepartment';
import Leaderboard from '../pages/Admin/Leaderboard/Leaderboard';
import FacultyFRS from '../pages/Admin/FacultyList/FacultyFRS';
import LoginPage from '../components/LoginPage/LoginPage';
import VerticalGrid from '../pages/User/Dashboard/VerticalGrid';
import VerticalHistory from '../pages/Head/VerticalFRSHistory/VerticalHistory';

const AppLayout = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(false); // Update to true if user data exists
    }
  }, []);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Redirect based on role
  if (isAuthenticated && user) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Navbar user={user} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: 8,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#121212' : '#f4f6f8',
            transition: 'margin 0.3s',
          }}
        >
          <Routes>
            {user.role === 'admin' && (
              <>
                <Route path="/" element={<Admin user={user} />} />
                <Route path="/verticalwise-frs" element={<VerticalwiseFRS />} />
                <Route path="/departmentwise-frs" element={<DepartmentwiseFRS />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/faculty-entry" element={<FacultyFRS />} />
              </>
            )}
            {user.role === 'vertical_head' && (
              <>
                <Route path="/" element={<HeadDashboard />} />
                <Route path="/vertical-history" element={<VerticalHistory />} />
                <Route path="/frs-entry" element={<FRSEntry user={user} />} />
              </>
            )}
            {user.role === 'user' && (
              <>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/vertical-frs" element={<VerticalFRS user={user}/>} />
                <Route path="/frs-history" element={<FRSHistory user={user} />} />
                <Route path="/vertical-grid" element={<VerticalGrid user={user} />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
    );
  }

  // Default fallback route
  return <Navigate to="/" />;
};

export default AppLayout;
