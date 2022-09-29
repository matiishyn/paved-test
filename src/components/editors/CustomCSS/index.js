import React, { useState } from 'react';
import styles from './styles';
import AccordionItem from '../../shared/Accordion/AccordionItem';
import CustomCssModalDynamic from '../../modals/CustomCssModal/CustomCssModalDynamic';

export default function CustomCSS({
  heading,
  isOpen,
  onToggle,
  adData,
  setAdData
}) {
  const handleCustomCss = (css) => {
    setAdData({
      ...adData,
      custom_css: css
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AccordionItem header={heading} isOpen={isOpen} onClick={onToggle}>
      <button
        type="button"
        className="btn btn-outline-primary w-100"
        onClick={openModal}
      >
        Edit CSS
      </button>
      <CustomCssModalDynamic
        isOpen={isModalOpen}
        adData={adData}
        onCustomCssChange={handleCustomCss}
        onClose={closeModal}
      />
      <div className="support-doc">
        <a href="https://devdocs.io/css/" className="support-link">
          Custom CSS Support Docs
        </a>
      </div>
      <style jsx>{styles}</style>
    </AccordionItem>
  );
}
