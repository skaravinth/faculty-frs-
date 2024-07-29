import React from 'react';
import './Dashboard.css';
import VerticalGrid from './VerticalGrid';
import FRSSummary from './FRSSummary';
import FRSChart from './FRSChart';
import RecentFRS from './RecentFRS';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
const verticalItems = ['1', '2', '3', '4']; // This data can come from your backend

const navigate = useNavigate();

const handleViewAllClick = () => {
    navigate('/frs-history');
  };


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
<div className="text">Recent Updates</div>
<button className="view-all-button" onClick={handleViewAllClick}>
    View All Updates
</button>
<RecentFRS />
<div className='text3'>
Entire FRS Update History can be seen by clicking the View All button
</div>
</div>
</div>
</div>
);
}

export default Dashboard;