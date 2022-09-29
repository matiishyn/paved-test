import React from 'react';

const Accordion = ({ children, ...otherProps }) => {
  return (
    <div className="accordion hide-scrollbar overflow-y" {...otherProps}>
      {children}
    </div>
  );
};

export default Accordion;
