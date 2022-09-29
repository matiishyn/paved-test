import React from 'react';

const AccordionItem = ({ header, children, isOpen, onClick }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className={isOpen ? 'accordion-button' : 'accordion-button collapsed'}
          type="button"
          onClick={onClick}
        >
          {header}
        </button>
      </h2>
      <div
        className={
          isOpen
            ? 'accordion-collapse collapse show'
            : 'accordion-collapse collapse'
        }
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
