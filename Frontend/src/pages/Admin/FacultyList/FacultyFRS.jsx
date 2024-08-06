import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import './FacultyFRS.css';

// Custom hook for window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

const FacultyFRS = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [rows, setRows] = useState([]);

  const getColumnWidth = () => {
    if (width < 1024) {
      return { id: 50, facultyId: 140, facultyName: 180, department: 180, designation: 190, frsScore: 100 };
    } else {
      return { id: 70, facultyId: 160, facultyName: 180, department: 250, designation: 210, frsScore: 160 };
    }
  };

  const columnWidths = getColumnWidth();

  const columns = [
    { field: 'sNo', headerName: 'S.No', width: columnWidths.id },  // Use sNo for serial number
    { field: 'facultyId', headerName: 'Faculty ID', width: columnWidths.facultyId },
    { field: 'facultyName', headerName: 'Faculty Name', width: columnWidths.facultyName },
    { field: 'department', headerName: 'Department', width: columnWidths.department },
    { field: 'designation', headerName: 'Designation', width: columnWidths.designation },
    {
      field: 'frsScore',
      headerName: 'FRS Score',
      type: 'number',
      width: columnWidths.frsScore,
      align: 'center',
      renderCell: (params) => (
        <div className={params.value > 0 ? 'frs-positive' : 'frs-negative'}>
          {params.value}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/faculty');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Sort data by frsScore in descending order
        const sortedData = data.sort((a, b) => b.frsScore - a.frsScore);
        setRows(sortedData);
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      }
    };

    fetchFacultyData();
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchText.toLowerCase();
    const filteredData = rows.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredRows(filteredData);
  }, [searchText, rows]);

  const handleBackClick = () => {
    navigate('/admin');
  };

  return (
    <div className="grid-full3">
      <div className="header-container">
        <div className='frs-heading'>
          <FontAwesomeIcon icon={faHistory} className="history-icon" />
          Faculty FRS Score
        </div>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{color: '#bdbdbd'}}/>
              </InputAdornment>
            ),
          }}
          className="search-bar2"
          sx={{
            width: '300px',
            '& .MuiOutlinedInput-root': {
              height: '40px',
              '& fieldset': {
                borderColor: '#bdbdbd',
              },
              '&:hover fieldset': {
                borderColor: '#1565c0',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0d47a1',
              },
            },
            '& .MuiInputAdornment-root': {
              color: '#1e88e5',
            },
            '& .MuiOutlinedInput-input': {
              padding: '8px 14px',
            },
          }}
        />
      </div>
      <div className='data-grid-container'>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row.sNo} // Use sNo as the unique ID
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          checkboxSelection
          sx={{
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              color: '#1a237e',
              fontSize: '17px',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1e88e5',
            },
            '& .MuiDataGrid-footerContainer': {
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            },
            '& .MuiTablePagination-root': {
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            },
            '& .MuiTablePagination-toolbar': {
              justifyContent: 'center',
              flexWrap: 'wrap',
            },
            '& .MuiTablePagination-selectLabel': {
              display: 'inline-block',
              marginRight: '8px',
            },
            '& .MuiTablePagination-input': {
              marginLeft: '8px',
            },
          }}
        />
      </div>
      <button className='back-button3' onClick={handleBackClick}>
        <ArrowBackIcon sx={{ fontSize: '18px', marginTop: '0px', fontWeight: 'bold' }} />
        Back
      </button>
    </div>
  );
};

export default FacultyFRS;
