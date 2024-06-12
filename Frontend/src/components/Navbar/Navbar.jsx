import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VerticalFrsIcon from '@mui/icons-material/VerticalSplit';
import FrsHistoryIcon from '@mui/icons-material/History';
import HeadDashboardIcon from '@mui/icons-material/AccountTree';
import FacultyListIcon from '@mui/icons-material/People';
import FrsEntryIcon from '@mui/icons-material/Edit';
import AdminIcon from '@mui/icons-material/SupervisorAccount';
import VerticalwiseFrsIcon from '@mui/icons-material/VerticalAlignBottom';
import DepartmentwiseFrsIcon from '@mui/icons-material/FormatListBulleted';
import LeaderboardIcon from '@mui/icons-material/Equalizer';
import FacultyEntryIcon from '@mui/icons-material/PersonAdd';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import logo from '../../assets/images/logo1.png';
import AppLayout from '../../AppLayout/AppLayout';
import Notification from './Notification'; // Import Notification component

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : 'white',
  color: theme.palette.mode === 'dark' ? '#fff' : 'black',
  borderBottom: `1px solid ${theme.palette.divider}`, // Set the bottom border color
  transition: 'none',
  boxShadow: 'none',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: 'none',
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const userMenuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
  { text: 'Vertical FRS', icon: <VerticalFrsIcon />, link: '/vertical-frs' },
  { text: 'FRS History', icon: <FrsHistoryIcon />, link: '/frs-history' },
];

const verticalHeadMenuItems = [
  { text: 'Head Dashboard', icon: <HeadDashboardIcon />, link: '/head-dashboard' },
  { text: 'Faculty List', icon: <FacultyListIcon />, link: '/faculty-list' },
  { text: 'FRS Entry', icon: <FrsEntryIcon />, link: '/frs-entry' },
];

const adminMenuItems = [
  { text: 'Admin', icon: <AdminIcon />, link: '/admin' },
  { text: 'Verticalwise FRS', icon: <VerticalwiseFrsIcon />, link: '/verticalwise-frs' },
  { text: 'Departmentwise FRS', icon: <DepartmentwiseFrsIcon />, link: '/departmentwise-frs' },
  { text: 'Leaderboard', icon: <LeaderboardIcon />, link: '/leaderboard' },
  { text: 'Faculty Entry', icon: <FacultyEntryIcon />, link: '/faculty-entry' },
];

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [userRole, setUserRole] = useState('user'); // 'user', 'vertical_head', 'admin'
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null); // State for notification popover anchor element
  const [profileAnchorEl, setProfileAnchorEl] = useState(null); // State for profile popover anchor element

  const isMobile = useMediaQuery('(max-width:500px)');
  const isTablet = useMediaQuery('(max-width:1024px)');

  useEffect(() => {
    if (isMobile || isTablet) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile, isTablet]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
};

const handleToggleTheme = () => {
  setDarkMode(!darkMode);
};

const handleNotificationClick = (event) => {
  setNotificationAnchorEl(event.currentTarget);
};

const handleNotificationClose = () => {
  setNotificationAnchorEl(null);
};

const handleProfileClick = (event) => {
  setProfileAnchorEl(event.currentTarget);
};

const handleProfileClose = () => {
  setProfileAnchorEl(null);
};

const themeToggle = createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: darkMode ? '#90caf9' : '#1976d2', // Adjust primary color for dark mode
    },
    secondary: {
      main: darkMode ? '#f48fb1' : '#f50057', // Adjust secondary color for dark mode
    },
  },
});

const iconTooltips = {
  darkMode: darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode',
  notifications: 'Notifications',
  profile: 'Profile',
};

const renderMenuItems = (items) =>
  items.map((item, index) => (
    <ListItem key={index} disablePadding sx={{ display: 'block', py: 1 }}>
      <ListItemButton
        component={Link}
        to={item.link}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          color: theme.palette.mode === 'dark' ? '#fff' : '#616161', // Adjust text color for dark mode
          '&:hover': {
            color: theme.palette.mode === 'dark' ? '#90caf9' : '#1e90ff',
            marginLeft: '8px',
            marginRight: '8px',
            borderRadius: '10px',
            '& .MuiListItemIcon-root': {
              color: theme.palette.mode === 'dark' ? '#90caf9' : '#1e90ff',
            },
            '& .MuiListItemText-primary': {
              fontWeight: 'bold',
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            color: 'inherit',
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  ));

return (
  <ThemeProvider theme={themeToggle}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {!open && (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  color: theme.palette.mode === 'dark' ? '#fff' : '#616161',
                }}
              >
                <MenuIcon />
              </IconButton>
              <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  fontWeight: 'bold',
                  letterSpacing: '0.3em',
                  color: theme.palette.mode === 'dark' ? '#90caf9' : '#1e90ff',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                Worklog
              </Typography>
            </>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={iconTooltips.darkMode}>
            <IconButton color="inherit" onClick={handleToggleTheme}>
              {darkMode ? <WbSunnyIcon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={iconTooltips.notifications}>
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={iconTooltips.profile}>
            <IconButton edge="end" color="inherit" onClick={handleProfileClick}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
          <Notification
            anchorEl={notificationAnchorEl}
            handleClose={handleNotificationClose}
          /> {/* Render Notification component */}
          <Popover
            open={Boolean(profileAnchorEl)}
            anchorEl={profileAnchorEl}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box sx={{ p: 2 }}>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Box>
          </Popover>
        </Toolbar>
      </AppBar>

      {/* Render Drawer or SwipeableDrawer based on screen width */}
      {isMobile ? (
        <SwipeableDrawer anchor="left" open={open} onClose={handleDrawerClose} onOpen={handleDrawerOpen}>
          <Box
            sx={{ width: drawerWidth }}
            role="presentation"
            onClick={handleDrawerClose}
            onKeyDown={handleDrawerClose}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {userRole === 'user' && renderMenuItems(userMenuItems)}
              {userRole === 'vertical_head' && renderMenuItems(verticalHeadMenuItems)}
              {userRole === 'admin' && renderMenuItems(adminMenuItems)}
            </List>
          </Box>
        </SwipeableDrawer>
      ) : (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <img src={logo} alt="Logo" style={{ height: '40px', marginLeft: '10px' }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                ml: 2,
                fontWeight: 'bold',
                letterSpacing: '0.2em',
                color: theme.palette.mode === 'dark' ? '#90caf9' : '#1e90ff',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              Worklog
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <List>
            {userRole === 'user' && renderMenuItems(userMenuItems)}
            {userRole === 'vertical_head' && renderMenuItems(verticalHeadMenuItems)}
              {userRole === 'admin' && renderMenuItems(adminMenuItems)}
            </List>
          </Drawer>
        )}
        
      </Box>
    </ThemeProvider>
  );
}


