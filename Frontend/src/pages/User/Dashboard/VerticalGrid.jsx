import React from 'react';
import './VerticalGrid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract, faGraduationCap, faBook, faFlaskVial } from '@fortawesome/free-solid-svg-icons'; 

function VerticalGrid() {
  return (
    <div className="vertical">
      <div className='vertical1'>
        <div className='fa-icon'>
          <FontAwesomeIcon icon={faGraduationCap} className="fa-image" />
          <span className="vertical-title">Academics</span>
        </div>
        <div className="vertical-text">
          <span className="vertical-value">FRS</span>
          <span className='vertical-frs'>1200</span>
        </div>
      </div>
      <div className='vertical2'>
      <div className='fa-icon'>
        <FontAwesomeIcon icon={faBook} className="fa-image" />
        <span className="vertical-title">Skill</span>
      </div>
        <div className="vertical-text">
          <span className="vertical-value">FRS</span>
          <span className='vertical-frs'>800</span>
        </div>
      </div>
      <div className='vertical3'>
      <div className='fa-icon'>
      <FontAwesomeIcon icon={faFileContract} className="fa-image" />
      <span className="vertical-title">Special</span>
      </div>
        <div className="vertical-text">
          <span className="vertical-value">FRS</span>
          <span className='vertical-frs'>550</span>
        </div>
      </div>
      <div className='vertical4'>
        <div className='fa-icon'>
        <FontAwesomeIcon icon={faFlaskVial} className="fa-image" />
        <span className="vertical-title">COE</span>
        </div>
        <div className="vertical-text">
          <span className="vertical-value">FRS</span>
          <span className='vertical-frs'>450</span>
        </div>
      </div>
    </div>
  );
}

export default VerticalGrid;
