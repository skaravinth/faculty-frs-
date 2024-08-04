import React, { useState } from 'react';
import './RecentFRS.css';

function RecentFRS() {
  const data = [
    { date: '12-06-2024', verticalName: 'Skill', reason: 'Late Submission', reason_info: 'The given task was not completed on time and it will be considered as late submission', frsUpdate: 50 },
    { date: '13-06-2024', verticalName: 'Academics', reason: 'Insufficient Data', reason_info: 'The Qusetion Paper taken by you is not having sufficient data in some questions', frsUpdate: -100 },
    { date: '14-06-2024', verticalName: 'COE', reason: 'Incorrect Entry', reason_info: 'The Entry was not entered properly and it is showing wrong data which is not matching with actuall data', frsUpdate: 150 },
    { date: '15-06-2024', verticalName: 'IQAC', reason: 'System Error', reason_info: 'The system is not handeled professionally by you and it is showing errors', frsUpdate: -200 },
    { date: '16-06-2024', verticalName: 'Special Lab', reason: 'Data Mismatch', reason_info: 'The report given by you is showing wrong data and it is not matching with the true data', frsUpdate: 250 },
  ];

  const [selectedRow, setSelectedRow] = useState(null); // State to track selected row for popup

  // Open popup with row details
  const handleViewClick = (row) => {
    setSelectedRow(row);
  };

  // Close popup
  const handleClosePopup = () => {
    setSelectedRow(null);
  };

  return (
    <div className="recent-frs">
      <table className="recent-frs-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Vertical Name</th>
            <th>Reason</th>
            <th>FRS Update</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.verticalName}</td>
              <td>{item.reason}</td>
              <td className={`frs-value ${item.frsUpdate >= 0 ? 'positive' : 'negative'}`}>{item.frsUpdate}</td>
              <td><button className="view-button" onClick={() => handleViewClick(item)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
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
}

export default RecentFRS;
