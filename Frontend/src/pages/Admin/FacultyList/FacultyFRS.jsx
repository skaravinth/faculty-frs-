import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import './FacultyFRS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

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

  const getColumnWidth = () => {
    if (width < 1024) {
      return { id: 50, facultyId: 140, facultyName: 180, department: 180, designation: 190, frsScore: 100 };
    } else {
      return { id: 70, facultyId: 160, facultyName: 180, department: 250, designation: 210, frsScore: 160 };
    }
  };

  const columnWidths = getColumnWidth();

  const columns = [
    { field: 'id', headerName: 'ID', width: columnWidths.id },
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

  const rows = [
    { id: 1, facultyId: '2024F001', facultyName: 'Harish Kumar', department: 'Computer Science and Engineering', designation: 'Assistant Professor Level-3', frsScore: 123 },
    { id: 2, facultyId: '2024F002', facultyName: 'Vasanth Kumar', department: 'Information Technology', designation: 'Assistant Professor Level-2', frsScore: -456 },
    // ... (rest of the rows)
  ];

  const handleBackClick = () => {
    navigate('/admin');
  };

  return (
    <div className="grid-full3">
      <div className='frs-heading'>
        <FontAwesomeIcon icon={faHistory} className="history-icon" />
        Faculty FRS Score
      </div>
      <div className='data-grid-container'>
        <DataGrid
          rows={rows}
          columns={columns}
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
