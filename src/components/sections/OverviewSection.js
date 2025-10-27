import React from 'react';
import { overviewInfo } from '../../data/tourData';
import InfoCard from '../common/InfoCard';

function OverviewSection() {
  return (
    <section id="tongquan" className="tour-section" data-aos="fade-up">
      <div className="container-inner">
        <h2 className="section-title">THÔNG TIN THÊM VỀ CHUYẾN ĐI</h2>
        <div className="info-grid">
          {overviewInfo.map((item, index) => (
            <InfoCard
              key={index}
              icon={item.icon}
              title={item.title}
              text={item.text}
              delay={index * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;