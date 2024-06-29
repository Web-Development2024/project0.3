import React from 'react';
import './TherapistCard.css';

const TherapistCard = ({ therapist }) => {
  return (
    <div className="therapist-card">
      <div className="therapist-header">
        <h3>{therapist.name}</h3>
        <p className="therapist-about">{therapist.about}</p>
      </div>
      <div className="therapist-details">
        <div className="phone-tooltip">
          <span className="tooltip">
            ?
            <span className="tooltiptext">{therapist.about}</span>
          </span>
          <p className="therapist-phone">טלפון: {therapist.phone}</p>
        </div>
        <p>מיקום: {therapist.location}</p>
      </div>
    </div>
  );
};


export default TherapistCard;
