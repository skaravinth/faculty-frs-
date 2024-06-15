import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import Dashboard from '../pages/User/Dashboard/Dashboard';
import VerticalFRS from '../pages/User/VerticalFRS/VerticalFRS';
import FRSHistory from '../pages/User/FRSHistory/FRSHistory';
import HeadDashboard from '../pages/Head/HeadDashboard/Head';
import FacultyList from '../pages/Head/FacultyList/FacultyList';
import FRSEntry from '../pages/Head/FRSEntry/FRSEntry';
import Admin from '../pages/Admin/AdminDashboard/Admin';
import VerticalwiseFRS from '../pages/Admin/FRSVertical/FRSVertical';
import DepartmentwiseFRS from '../pages/Admin/FRSDepartment/FRSDepartment';
import Leaderboard from '../pages/Admin/Leaderboard/Leaderboard';
import FacultyEntry from '../pages/Admin/FacultyEntry/FacultyEntry';
import LoginPage from '../components/LoginPage/LoginPage'; // Adjust the import path as needed

const AppLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Implement the actual authentication logic here
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        {isAuthenticated ? (
          <>
            <Navbar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                marginTop: 8, // Adjust the marginTop to match the height of the AppBar
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#121212' : '#f4f6f8',
                transition: 'margin 0.3s',
              }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vertical-frs" element={<VerticalFRS />} />
                <Route path="/frs-history" element={<FRSHistory />} />
                <Route path="/head-dashboard" element={<HeadDashboard />} />
                <Route path="/faculty-list" element={<FacultyList />} />
                <Route path="/frs-entry" element={<FRSEntry />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/verticalwise-frs" element={<VerticalwiseFRS />} />
                <Route path="/departmentwise-frs" element={<DepartmentwiseFRS />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/faculty-entry" element={<FacultyEntry />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>
          </>
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </Box>
    </Router>
  );
};

export default AppLayout;
