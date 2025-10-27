import React from 'react';

function ReviewCard({ initials, name, date, text, delay }) {
  return (
    <div className="col-md-4" data-aos="fade-up" data-aos-delay={delay}>
      <div className="review-card p-3">
        <div className="d-flex align-items-center mb-2">
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#f1f5fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: 'var(--accent)', marginRight: '10px' }}>
            {initials}
          </div>
          <div>
            <div style={{ fontWeight: '800' }}>{name}</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{date}</div>
          </div>
        </div>
        <div>{text}</div>
        <div style={{ marginTop: '8px', color: '#f1c40f' }}>★★★★★</div>
      </div>
    </div>
  );
}

export default ReviewCard;