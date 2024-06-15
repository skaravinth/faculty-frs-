import React from 'react';
import './FRSSummary.css';
import frsTotalImage from '../../../assets/images/frsTotal.avif';
import frsGainedImage from '../../../assets/images/frsGained2.webp';
import frsLostImage from '../../../assets/images/frsLost.jpg';

function FRSSummary() {
  return (
    <div className="frs-summary">
      <div className="summary1">
      <img className="summary-image" src={frsTotalImage} alt="FRS Total Image" />
       <div className="summary-text">
         <span className="summary-title">FRS Total</span>
         <span className="summary-value" style={{color: '#29B6F6', fontWeight: 'bold'}}>3000</span>
       </div>
      </div>
      <div className="summary2">
      <img className="summary-image" src={frsGainedImage} alt="FRS Gained Image" />
       <div className="summary-text">
         <span className="summary-title">FRS Gained</span>
         <span className="summary-value" style={{color: '#00C853', fontWeight: 'bold'}}>3600</span>
       </div>
      </div>
      <div className="summary3">
      <img className="summary-image" src={frsLostImage} alt="FRS Lossed Image" />
       <div className="summary-text">
         <span className="summary-title">FRS Lossed</span>
         <span className="summary-value" style={{color: '#FF3D00', fontWeight: 'bold'}}>3600</span>
       </div>
      </div>
    </div>
  );
}

export default FRSSummary;
