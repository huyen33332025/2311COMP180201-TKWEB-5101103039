import React from 'react';

function InfoCard({ icon, title, text, delay }) {
  return (
    <div className="info-card" data-aos="fade-up" data-aos-delay={delay}>
      <i className={icon}></i>
      <div>
        <strong>{title}</strong>
        <div>{text}</div>
      </div>
    </div>
  );
}

export default InfoCard;