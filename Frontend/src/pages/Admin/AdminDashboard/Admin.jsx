import React from 'react';
import './Admin.css';
import RecentUpdates from './RecentUpdates';
import VerticalwiseFRS from './VerticalwiseFRS';
import MonthwiseFRS from './MonthwiseFRS';
import FRSPercentage from './FRSPrecentage';
import Leaderboard from './Leaderboard';
import NegativeFRS from './NegativeFRS';

function Admin() {
  return (
    <div className="admin">
      <div className='verticalwise-head'>
        Vertical wise Overview
      </div>
      <VerticalwiseFRS />
      <div className="grid-container">
        <MonthwiseFRS />
        <FRSPercentage />
      </div>
      <div className='summary-head'>
        Summary of Recent Updates
      </div>
      <RecentUpdates />
      <div className="leaderboard-frs">
        <NegativeFRS />
        <Leaderboard />
      </div>
    </div>
  );
}

export default Admin;
