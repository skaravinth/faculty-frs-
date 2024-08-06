import React, { useEffect, useState } from 'react';
import './FRSSummary.css';
import frsTotalImage from '../../../assets/images/frs_total.png';
import frsGainedImage from '../../../assets/images/frs_gained.png';
import frsLostImage from '../../../assets/images/frs_lost.png';
import PropTypes from 'prop-types';

function FRSSummary({ user }) {
  const [summary, setSummary] = useState({
    total: 0,
    gained: 0,
    lost: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:4000/frssummary/${user.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Summary Data:', data); // Log the response data for debugging
          setSummary({
            total: parseInt(data.total, 10) || 0,
            gained: parseInt(data.gained, 10) || 0,
            lost: parseInt(data.lost, 10) || 0,
          });
        })
        .catch(error => {
          console.error('Error fetching summary data:', error);
          setError(error.message);
        });
    }
  }, [user.id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="frs-summary">
      <div className="summary1">
        <img className="summary-image" src={frsTotalImage} alt="FRS Total Image" />
        <div className="summary-text">
          <span className="summary-title">FRS Total</span>
          <span className="summary-value" style={{ color: '#29B6F6', fontWeight: 'bold' }}>{summary.total}</span>
        </div>
      </div>
      <div className="summary2">
        <img className="summary-image" src={frsGainedImage} alt="FRS Gained Image" />
        <div className="summary-text">
          <span className="summary-title">FRS Gained</span>
          <span className="summary-value" style={{ color: '#00C853', fontWeight: 'bold' }}>{summary.gained}</span>
        </div>
      </div>
      <div className="summary3">
        <img className="summary-image" src={frsLostImage} alt="FRS Lost Image" />
        <div className="summary-text">
          <span className="summary-title">FRS Lost</span>
          <span className="summary-value" style={{ color: '#FF3D00', fontWeight: 'bold' }}>{summary.lost}</span>
        </div>
      </div>
    </div>
  );
}

FRSSummary.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default FRSSummary;
