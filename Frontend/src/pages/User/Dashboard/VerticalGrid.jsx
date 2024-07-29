import React from 'react';
import './VerticalGrid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract, faGraduationCap, faBook, faFlaskVial } from '@fortawesome/free-solid-svg-icons';

function VerticalGrid() {
  return (
    <div className="vertical">
      <div className='vertical1'>
        <div className='vertical-content'>
          <div className='fa-icon'>
            <FontAwesomeIcon icon={faGraduationCap} className="fa-image" />
          </div>
          <div className="vertical-text" style={{marginLeft: '100px'}}>
            <span className="vertical-value">FRS</span>
            <span className='vertical-frs'>1200</span>
          </div>
        </div>
        <span className="vertical-title" style={{marginRight: '110px'}}>Academics</span>
      </div>

      <div className='vertical2'>
        <div className='vertical-content'>
          <div className='fa-icon'>
            <FontAwesomeIcon icon={faBook} className="fa-image" />
          </div>
          <div className="vertical-text" style={{marginLeft: '110px'}}>
            <span className="vertical-value">FRS</span>
            <span className='vertical-frs'>800</span>
          </div>
        </div>
        <span className="vertical-title" style={{marginRight: '160px'}}>Skill</span>
      </div>

      <div className='vertical3'>
        <div className='vertical-content'>
          <div className='fa-icon'>
            <FontAwesomeIcon icon={faFileContract} className="fa-image" />
          </div>
          <div className="vertical-text" style={{marginLeft: '120px'}}>
            <span className="vertical-value">FRS</span>
            <span className='vertical-frs'>550</span>
          </div>
        </div>
        <span className="vertical-title" style={{marginRight: '110px'}}>Special Lab</span>
      </div>

      <div className='vertical4'>
        <div className='vertical-content'>
          <div className='fa-icon'>
            <FontAwesomeIcon icon={faFlaskVial} className="fa-image" />
          </div>
          <div className="vertical-text" style={{marginLeft: '100px'}}>
            <span className="vertical-value">FRS</span>
            <span className='vertical-frs'>450</span>
          </div>
        </div>
        <span className="vertical-title" style={{marginRight: '160px'}}>COE</span>
      </div>
    </div>
  );
}

export default VerticalGrid;
