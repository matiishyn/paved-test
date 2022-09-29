import React from 'react';
import ImageDesignFields from './imageFields';
import styles from './styles';
import AccordionItem from '../../shared/Accordion/AccordionItem';

export default function ImageDesign({
  activeDevice,
  heading,
  isOpen,
  onToggle,
  adData,
  setAdData
}) {
  return (
    <AccordionItem header={heading} isOpen={isOpen} onClick={onToggle}>
      <ImageDesignFields
        activeDevice={activeDevice}
        adData={adData}
        setAdData={setAdData}
      />
      <style jsx>{styles}</style>
    </AccordionItem>
  );
}
