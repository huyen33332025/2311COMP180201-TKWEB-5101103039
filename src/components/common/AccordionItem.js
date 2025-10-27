import React from 'react';

function AccordionItem({ id, title, content, parentId, show = false }) {
  const collapseClass = show ? 'accordion-collapse collapse show' : 'accordion-collapse collapse';
  const buttonClass = show ? 'accordion-button' : 'accordion-button collapsed';

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className={buttonClass}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${id}`}
          aria-expanded={show}
          aria-controls={id}
        >
          {title}
        </button>
      </h2>
      <div
        id={id}
        className={collapseClass}
        data-bs-parent={parentId}
      >
        <div className="accordion-body">
          {content}
        </div>
      </div>
    </div>
  );
}

export default AccordionItem;