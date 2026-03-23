import React from 'react';

export default function ReviewCard({ review, onClick }) {
  if (!review.image) return null;

  return (
    <div 
      className="review-card-photo glass-panel" 
      onClick={(e) => {
        e.stopPropagation();
        onClick(review);
      }}
      style={{
        width: '240px',
        overflow: 'hidden',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: '#1e293b',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.05) translateZ(20px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateZ(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <img 
        src={review.image} 
        alt="User Review"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover',
          objectPosition: 'top',
        }}
      />
    </div>
  );
}
