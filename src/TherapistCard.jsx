import React from 'react';
import './TherapistCard.css';

const TherapistCard = ({ therapist, onHover, onClick }) => {
  return (
    <div 
      className="therapist-card"
      onMouseEnter={() => onHover(therapist)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(therapist)}
    >
      <div className="therapist-header">
        <h3>{therapist.name}</h3>
        <p className="therapist-about">{therapist.therapy_type}</p>
      </div>
      <div className="therapist-details">
        <div className="phone-tooltip">
          <span className="tooltip">
            <span className="tooltiptext">{therapist.categories}</span>
          </span>
          <p className="therapist-phone">טלפון: {therapist.phone}</p>
        </div>
        <p>מיקום: {therapist.address + ', ' + therapist.city}</p>
      </div>
    </div>
  );
};

export default TherapistCard;
