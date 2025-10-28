import React from 'react';
import { aboutData } from '../../data/tourData';

function AboutSection() {
  return (
    <section id="gioithieu" className="tour-section" data-aos="fade-up">
      <div className="container-inner">
        <h2 className="section-title">{aboutData.title}</h2>
        <div className="about-content">
          {aboutData.content}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;