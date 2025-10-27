import React from 'react';
import { notesData } from '../../data/tourData';
import AccordionItem from '../common/AccordionItem';

function NotesSection() {
  return (
    <section id="luuy" className="tour-section" data-aos="fade-up">
      <div className="container-inner">
        <h2 className="section-title">NHỮNG THÔNG TIN CẦN LƯU Ý</h2>
        <div className="accordion" id="notesAccordion">
          {notesData.map((note, index) => (
             <AccordionItem
              key={index}
              id={note.id}
              title={note.title}
              content={note.content}
              parentId="#notesAccordion"
              show={note.show || false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NotesSection;