import React from 'react';
import './Dashboard.css';
import VerticalGrid from './VerticalGrid';
import FRSSummary from './FRSSummary';
import FRSChart from './FRSChart';
import RecentFRS from './RecentFRS';

function Dashboard() {
  const verticalItems = ['1', '2', '3', '4']; // This data can come from your backend

  return (
    <div className="main">
      <div className="text2">Verticalwise FRS Score</div>
      <VerticalGrid items={verticalItems} />
      <div className="side-grids">
        <div className="left-grid">
          <div className="text">FRS Summary</div>
          <FRSSummary />
          <div className="text">Monthwise FRS Score for this Current Semester is represented Graphically</div>
          <FRSChart />
        </div>
        <div className="right-grid">
          <div className='note'>Note</div>
          <div className="text">Recent Updates</div>
          <RecentFRS />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
