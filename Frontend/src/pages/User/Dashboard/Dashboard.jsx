// import React from 'react';
import './Dashboard.css';
import VerticalGrid from './VerticalGrid';
import FRSSummary from './FRSSummary';
import FRSChart from './FRSChart';
import RecentFRS from './RecentFRS';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import PropTypes from 'prop-types';

function Dashboard({ user }) {
  console.log(user.verticals);
  const verticalItems = user.verticals || []; // This data can come from your backend

  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate('/frs-history');
  };

  return (
    <div className="main">
      <div className='top'>
        <div className="text1">Verticalwise FRS Score</div>
        <VerticalGrid items={verticalItems} user={user} />
      </div>

      <div className="side-grids">
        <div className="left-grid">
          <div className="text2">FRS Summary</div>
          <FRSSummary user={user}/>
        </div>
        <div className="right-grid">
          <div className="text3">Nnotification</div>
          <Notification />
        </div>
      </div>

      <div className='bottom'>
        <div className='line-graph'>
          <div className='text4'>Monthwise FRS Score for Current Semester</div>
          <FRSChart user={user}/>
          <div className='note2'>Graphical representation of the Monthwise FRS can be seen here</div>
        </div>
        <div className="recent-update">
          <div className="text5">Recent Updates</div>
          <button className="view-all-button" onClick={handleViewAllClick}>
            View All Updates
          </button>
          <RecentFRS user={user} />
          <div className='note3'>Recently updated FRS from all verticals can be seen here</div>
        </div>
      </div>
    </div>
  );
}
Dashboard.propTypes = {
  user: PropTypes.shape({
    verticals: PropTypes.arrayOf(PropTypes.string).isRequired,
    id:PropTypes.string.isRequired
  }).isRequired,
};

export default Dashboard;
