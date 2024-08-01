import React from 'react';
import './FRSSummary.css';
import frsTotalImage from '../../../assets/images/frs_total.png';
import frsGainedImage from '../../../assets/images/frs_gained.png';
import frsLostImage from '../../../assets/images/frs_lost.png';

function FRSSummary() {
  return (
    <div className="frs-summary">
      <div className="summary1">
      <img className="summary-image" src={frsTotalImage} alt="FRS Total Image" />
       <div className="summary-text">
         <span className="summary-title">FRS Total</span>
         <span className="summary-value" style={{color: '#29B6F6', fontWeight: 'bold'}}>4000</span>
       </div>
      </div>
      <div className="summary2">
      <img className="summary-image" src={frsGainedImage} alt="FRS Gained Image" />
       <div className="summary-text">
         <span className="summary-title">FRS Gained</span>
         <span className="summary-value" style={{color: '#00C853', fontWeight: 'bold'}}>4600</span>
       </div>
      </div>
      <div className="summary3">
      <img className="summary-image" src={frsLostImage} alt="FRS Lossed Image" />
       <div className="summary-text">
         <span className="summary-title">FRS Lossed</span>
         <span className="summary-value" style={{color: '#FF3D00', fontWeight: 'bold'}}>600</span>
       </div>
      </div>
    </div>
  );
}

export default FRSSummary;
