import React from 'react';
import './RecentFRS.css';

function RecentFRS() {
  const data = [
    { date: '12-06-2024', verticalName: 'Skill', reason: 'Late Submission', frsUpdate: 50 },
    { date: '13-06-2024', verticalName: 'Academics', reason: 'Insufficient Data', frsUpdate: -100 },
    { date: '14-06-2024', verticalName: 'COE', reason: 'Incorrect Entry', frsUpdate: 150 },
    { date: '15-06-2024', verticalName: 'IQAC', reason: 'System Error', frsUpdate: -200 },
    { date: '16-06-2024', verticalName: 'Special Lab', reason: 'Data Mismatch', frsUpdate: 250 },
  ];

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
              <td><button className="view-button">View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentFRS;
