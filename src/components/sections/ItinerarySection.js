import React from 'react';
import { itineraryDays } from '../../data/tourData';
import AccordionItem from '../common/AccordionItem';

function ItinerarySection() {
  return (
    <section id="lichtrinh" className="tour-section" data-aos="fade-up">
      <div className="container-inner">
        <h2 className="section-title">LỊCH TRÌNH 5 NGÀY 4 ĐÊM</h2>
        <div className="accordion" id="itinAccordion">
          {itineraryDays.map((day, index) => (
            <AccordionItem
              key={index}
              id={day.id}
              title={day.title}
              content={day.content}
              parentId="#itinAccordion"
              show={day.show || false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ItinerarySection;