import React from 'react';
import FontDesignFields from './designFields';
import styles from './styles';
import AccordionItem from '../../shared/Accordion/AccordionItem';
import { MOBILE } from '../../../utils';

export default function FontDesign({
  isOpen,
  onToggle,
  heading,
  presetColors,
  validateFunc,
  adData,
  hideSwitch,
  hideLineHeight,
  setAdData,
  activeDevice,
  onTakeDesktopData,
  isDeviceFontDifferential,
  children
}) {
  return (
    <AccordionItem header={heading} isOpen={isOpen} onClick={onToggle}>
      {activeDevice === MOBILE && !isDeviceFontDifferential && (
        <div className="d-flex pb-2 justify-content-center">
          <button
            className="btn btn-primary btn-sm"
            onClick={onTakeDesktopData}
          >
            Use desktop font settings
          </button>
        </div>
      )}
      {children}
      <FontDesignFields
        heading={heading}
        hideSwitch={hideSwitch}
        presetColors={presetColors}
        validateFunc={validateFunc}
        adData={adData}
        setAdData={setAdData}
        hideLineHeight={hideLineHeight}
      />
      <style jsx>{styles}</style>
    </AccordionItem>
  );
}

FontDesign.defaultProps = {
  hideSwitch: false
};
