import * as React from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';

const FRSHistory = () => {
  // Sample data for demonstration
  const data = [
    { date: '2024-06-10', verticalName: 'Academics', reason: 'Lorem ipsum...', incharge: 'John Doe', frsChange: '+100' },
    // Add more data objects as needed
  ];

  // State for search query
  const [searchQuery, setSearchQuery] = React.useState('');

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'right', mb: 2 }}>
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Box>
      {/* Search bar */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <SearchIcon />
            ),
          }}
          size="small"
        />
      </Box>
      {/* Responsive table */}
      <TableContainer component={Paper}>
      <Typography variant="h6">FRS History</Typography>
        <Table sx={{ minWidth: 650 }}>
          {/* Table head */}
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Vertical Name</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Incharge</TableCell>
              <TableCell>FRS Change</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {/* Map through filtered data and display table rows */}
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.verticalName}</TableCell>
                <TableCell>{row.reason}</TableCell>
                <TableCell>{row.incharge}</TableCell>
                <TableCell>{row.frsChange}</TableCell>
                <TableCell>
                  {/* Action button with eye icon */}
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FRSHistory;
