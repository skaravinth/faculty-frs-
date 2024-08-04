import React from 'react';
import './Admin.css';
import RecentUpdates from './RecentUpdates';
import VerticalwiseFRS from './VerticalwiseFRS';
import MonthwiseFRS from './MonthwiseFRS';
import FRSPercentage from './FRSPrecentage';
import Leaderboard from './Leaderboard';
import EventDetails from './EventDetails';

function Admin() {
  return (
    <div className="admin">
      <div className='verticalwise-head'>
        Vertical wise Overview
      </div>
      <VerticalwiseFRS />
      <div className='verticalwise-tail'>
        Overall FRS provided for the Faculties in Positive and Negative from each vertical can be seen here
      </div>
      <div className="grid-container">
        <MonthwiseFRS />
        <FRSPercentage />
      </div>
      {/* <div className='summary-head'>
        Summary of Recent Updates
      </div>
      <RecentUpdates /> */}
      <div className="leaderboard-frs">
        <EventDetails />
        <Leaderboard />
      </div>
    </div>
  );
}

export default Admin;
