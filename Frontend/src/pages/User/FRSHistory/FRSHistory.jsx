import React, { useState, useMemo } from 'react';
import './FRSHistory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faSearch, faChevronRight, faChevronLeft, faFilter, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useNavigate } from 'react-router-dom';

// Sample data creation
function createData(id, date, verticalName, reason, reason_info, frsUpdate) {
  return { id, date, verticalName, reason, reason_info, frsUpdate };
}

// Sample data
const rows = [
  createData(1, '20-06-2024', 'Special Lab', 'Budget Coverage', 'Additional funding received for special projects', 500),
  createData(2, '19-06-2024', 'IQAC', 'Late Online Course Completion', 'Some courses delayed due to technical issues', -300),
  createData(3, '18-06-2024', 'COE', 'New Research Initiative', 'Initiated a new AI research project', 700),
  createData(4, '17-06-2024', 'Skill', 'Staff Training', 'Conducted a new staff training session', 250),
  createData(5, '16-06-2024', 'Academics', 'Budget Adjustment', 'Adjusted budgets to accommodate new policies', -150),
  createData(6, '15-06-2024', 'Special Lab', 'System Upgrade', 'Upgraded server infrastructure for better performance', 400),
  createData(7, '14-06-2024', 'COE', 'New Hiring Policy', 'Implemented a new hiring process', 300),
  createData(8, '13-06-2024', 'Academics', 'Campaign Launch', 'Launched new marketing campaign for outreach', 350),
  createData(9, '12-06-2024', 'Skill', 'Customer Feedback', 'Addressed customer feedback and complaints', -200),
  createData(10, '11-06-2024', 'Iqac', 'Process Optimization', 'Optimized internal processes for efficiency', 600),
  createData(11, '10-06-2024', 'Special Lab', 'Supply Chain Improvement', 'Improved supply chain management', 500),
  createData(12, '09-06-2024', 'Academics', 'Product Release', 'Released new product version 3.2.1', 800),
  createData(13, '08-06-2024', 'Skill', 'Policy Update', 'Updated terms and conditions', 100),
  createData(14, '07-06-2024', 'COE', 'Financial Audit', 'Conducted an internal financial audit', -50),
  createData(15, '06-06-2024', 'IQAC', 'Quality Assurance Testing', 'Completed testing for new software module', 400),
  createData(16, '05-06-2024', 'Special Lab', 'Sales Performance Review', 'Reviewed sales team performance', 300),
  createData(17, '04-06-2024', 'Academics', 'UI Redesign', 'Redesigned user interface for better UX', 450),
  createData(18, '03-06-2024', 'Skill', 'Security Breach', 'Addressed security vulnerabilities', -500),
  createData(19, '02-06-2024', 'COE', 'Regulatory Compliance', 'Ensured compliance with new regulations', 200),
  createData(20, '01-06-2024', 'IQAC', 'Employee Engagement', 'Improved employee engagement programs', 250),
  createData(21, '31-05-2024', 'Special Lab', 'Cost Reduction', 'Implemented cost-saving measures', 300),
  createData(22, '30-05-2024', 'Academics', 'Help Desk Efficiency', 'Increased help desk efficiency', 150),
  createData(23, '29-05-2024', 'Skill', 'Prototype Development', 'Developed new prototype for testing', 600),
  createData(24, '28-05-2024', 'COE', 'Policy Change', 'Updated administrative policies', 100),
  createData(25, '27-05-2024', 'IQAC', 'Network Upgrade', 'Upgraded network infrastructure', 500),
  createData(26, '26-05-2024', 'Special Lab', 'Brand Repositioning', 'Repositioned brand for new market', 450),
  createData(27, '25-05-2024', 'Academics', 'Contract Negotiation', 'Negotiated new contracts with vendors', 200),
  createData(28, '24-05-2024', 'Skill', 'Facility Expansion', 'Expanded operational facilities', 700),
  createData(29, '23-05-2024', 'COE', 'Operational Audit', 'Conducted an operational audit', -100),
  createData(30, '22-05-2024', 'IQAC', 'Workplace Safety', 'Implemented new safety protocols', 300),
];

function parseDate(dateString) {
  const [day, month, year] = dateString.split('-');
  return new Date(year, month - 1, day);
}

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'date') {
    return parseDate(b.date) - parseDate(a.date);
  }
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'id', numeric: true, label: 'S.No', className: 'sno' },
  { id: 'date', numeric: false, label: 'Date' },
  { id: 'verticalName', numeric: false, label: 'Vertical Name', className: 'vertical-name' },
  { id: 'reason', numeric: false, label: 'Reason', className: 'reason' },
  { id: 'frsUpdate', numeric: false, label: 'FRS Update' },
  { id: 'action', numeric: false, label: 'Action' },
];

const verticalOptions = ['All', ...new Set(rows.map(row => row.verticalName))];

const FRSHistory = () => {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [verticalFilter, setVerticalFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);

  const navigate = useNavigate();

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleVerticalFilterChange = (option) => {
    setVerticalFilter(option.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleViewClick = (row) => {
    setSelectedRow(row);
  };

  const handleClosePopup = () => {
    setSelectedRow(null);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).filter(row => {
    if (verticalFilter === 'All') return true;
    return row.verticalName === verticalFilter;
  });

  const visibleRows = useMemo(
    () => stableSort(filteredRows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, order, orderBy, page, rowsPerPage]
  );

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  return (
    <div className="container">
      <div className="toolbar">
        <div className="toolbar-title">
          <FontAwesomeIcon icon={faHistory} className="history-icon" />
          FRS History
        </div>
        <div className="toolbar-actions">
          <div className="search-bar-container">
            <FontAwesomeIcon icon={faSearch} className="search-bar-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-bar"
            />
          </div>
          {/* <Dropdown
            options={verticalOptions}
            onChange={handleVerticalFilterChange}
            value={verticalFilter}
            className="dropdown"
            controlClassName="dropdown-control"
            menuClassName="dropdown-menu"
            arrowClassName="dropdown-arrow"
            placeholder={<FontAwesomeIcon icon={faFilter} className="filter-icon" />}
            arrowClosed={<span className="arrow-closed"></span>}
            arrowOpen={<span className="arrow-open"></span>}
          /> */}
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            {headCells.map((headCell) => (
              <th
                key={headCell.id}
                onClick={() => handleRequestSort(headCell.id)}
                className={headCell.className || ''}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={order === 'desc' ? 'sorted desc' : 'sorted asc'}></span>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => (
            <tr key={row.id}>
              <td className="sno">{row.id}</td>
              <td>{row.date}</td>
              <td className="vertical-name">{row.verticalName}</td>
              <td className="reason">{row.reason}</td>
              <td className={row.frsUpdate > 0 ? 'positive' : 'negative'}>{row.frsUpdate}</td>
              <td>
                <button className="view-button" onClick={() => handleViewClick(row)}>View</button>
              </td>
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 53 * emptyRows }}>
              <td colSpan={6} />
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <div className="rows-per-page">
          
          <label>Rows per page:</label>
          <select value={rowsPerPage} onChange={handleChangeRowsPerPage} >
            {[5, 10, 25].map((rowsOption) => (
              <option key={rowsOption} value={rowsOption}>{rowsOption}</option>
            ))}
          </select>
        </div>
        <div className="pagination-controls">
          <button onClick={(event) => handleChangePage(event, page - 1)} disabled={page === 0}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>{page + 1} of {Math.ceil(filteredRows.length / rowsPerPage)}</span>
          <button onClick={(event) => handleChangePage(event, page + 1)} disabled={page >= Math.ceil(filteredRows.length / rowsPerPage) - 1}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      <button
            variant="contained"
            color="primary"
            onClick={handleBackClick}
            className="back-button"
            >
            <FontAwesomeIcon icon={faArrowLeft} style={{marginRight: '5px'}}/> Back
          </button>
      {selectedRow && (
  <div className="popup-overlay" onClick={handleClosePopup}>
    <div className="popup" onClick={(e) => e.stopPropagation()}>
      <div className="popup-header">
        <h2>Update Summary</h2>
        <button className="close-button" onClick={handleClosePopup}>x</button>
      </div>
      <div className="popup-content">
        <div className="content">
          <p><strong>Date:</strong></p>
          <p>{selectedRow.date}</p>
        </div>
        <div className="content">
          <p><strong>Vertical Name:</strong></p>
          <p>{selectedRow.verticalName}</p>
        </div>
        <div className="content">
          <p><strong>Reason:</strong></p>
          <p>{selectedRow.reason}</p>
        </div>
        <div className="content">
          <p><strong>Reason Info:</strong></p>
          <p>{selectedRow.reason_info}</p>
        </div>
        <div className="content">
          <p><strong>FRS Update:</strong></p>
          <p className={`frs-value ${selectedRow.frsUpdate >= 0 ? 'positive' : 'negative'}`}>{selectedRow.frsUpdate}</p>
        </div>
      </div>
      <div className="popup-footer">
        <button className="ok-button" onClick={handleClosePopup}>OK</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default FRSHistory; 
