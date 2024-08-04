import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './Leaderboard.css';

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

const Leaderboard = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const getColumnWidth = () => {
    if (width < 1024) {
      return { id: 50, facultyName: 190, department: 190, frsScore: 120 };
    } else if (width < 900) {
      return { id: 100, facultyName: 300, department: 300, frsScore: 150 };
    } else if (width < 800) {
      return { id: 100, facultyName: 250, department: 250, frsScore: 120 };
    } else if (width < 700) {
      return { id: 90, facultyName: 220, department: 220, frsScore: 110 };
    } else if (width < 600) {
      return { id: 80, facultyName: 200, department: 200, frsScore: 80 };
    } else if (width < 500) {
      return { id: 60, facultyName: 180, department: 180, frsScore: 70 };
    } else if (width < 450) {
      return { id: 50, facultyName: 150, department: 150, frsScore: 80 };
    } else if (width < 400) {
      return { id: 40, facultyName: 140, department: 140, frsScore: 60 };
    } else {
      return { id: 70, facultyName: 200, department: 200, frsScore: 120 };
    }
  };

  const getRowHeight = () => {
    if (width < 450) {
      return 100;
    } else if (width < 1024) {
      return 80;
    } else {
      return 80;
    }
  };

  const getFontSize = () => {
    if (width < 450) {
      return '20px';
    } else if (width < 1024) {
      return '16px';
    } else {
      return '16px';
    }
  };

  const getHeaderFontSize = () => {
    if (width >1024) {
      return '24px';
    } else if (width <= 1024) {
      return '20px';
    } else if (width < 450) {
      return '30px';
    }
  };

  const rowHeight = getRowHeight();
  const fontSize = getFontSize();
  const headerFontSize = getHeaderFontSize();
  const columnWidths = getColumnWidth();

  const columns = [
    { field: 'id', headerName: 'ID', width: columnWidths.id, headerClassName: 'custom-header' },
    { field: 'facultyName', headerName: 'Faculty Name', width: columnWidths.facultyName, headerClassName: 'custom-header' },
    { field: 'department', headerName: 'Department', width: columnWidths.department, headerClassName: 'custom-header' },
    {
      field: 'frsScore',
      headerName: 'FRS Score',
      type: 'number',
      width: columnWidths.frsScore,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'custom-header',
      renderCell: (params) => (
        <span style={{ 
          fontWeight: 'bold',
          color: params.value >= 0 ? 'green' : 'red',
        }}>
          {params.value}
        </span>
      ),
    },
  ];

  const rows = [
    { id: 1, facultyName: 'John Doe', department: 'Computer Science', frsScore: 88 },
    { id: 2, facultyName: 'Jane Smith', department: 'Mathematics', frsScore: 92 },
    { id: 3, facultyName: 'Alice Johnson', department: 'Physics', frsScore: -5 },
    { id: 4, facultyName: 'Bob Brown', department: 'Chemistry', frsScore: 90 },
    { id: 5, facultyName: 'Charlie Green', department: 'Biology', frsScore: 95 },
    { id: 6, facultyName: 'Diana Prince', department: 'Philosophy', frsScore: -10 },
    { id: 7, facultyName: 'Edward Cullen', department: 'Literature', frsScore: 87 },
    { id: 8, facultyName: 'Fiona Black', department: 'Engineering', frsScore: 91 },
    { id: 9, facultyName: 'George White', department: 'History', frsScore: 84 },
  ];

  const handleViewAllClick = () => {
    navigate('/faculty-entry'); // Adjust the path to your route
  };

  return (
    <div className="grid-full2">
      <div className="grid2-head">
        <span>Faculty FRS Score</span>
        <button className="view-all-button5" onClick={handleViewAllClick}>
          View All Faculty
        </button>
      </div>
      <div className="data-grid-wrapper">
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          autoHeight
          disableSelectionOnClick
          stickyHeader
          sx={{
            '& .MuiDataGrid-cell': {
              fontSize: fontSize,
            },
            '& .MuiDataGrid-columnHeaders': {
              fontSize: headerFontSize,
            },
          }}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
