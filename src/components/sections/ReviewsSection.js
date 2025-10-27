import React from 'react';
import { reviewsData } from '../../data/tourData';
import ReviewCard from '../common/ReviewCard';

function ReviewsSection() {
  return (
    <section id="reviews" className="tour-section" data-aos="fade-up">
      <div className="container-inner">
        <h2 className="section-title">ĐÁNH GIÁ TỪ KHÁCH HÀNG</h2>
        <div className="row g-3">
          {reviewsData.map((review, index) => (
            <ReviewCard
              key={index}
              initials={review.initials}
              name={review.name}
              date={review.date}
              text={review.text}
              delay={index * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;