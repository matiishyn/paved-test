import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { MAX_MOBILE_WIDTH, MIN_BASE_WIDTH, MOBILE } from '../../../utils';
import ColorPicker from '../../app/ColorPicker';
import Input from '../../app/Input';

import styles from './styles';
import AccordionItem from '../../shared/Accordion/AccordionItem';
import { useComponentResize } from '../../../hooks/useComponentResize';

export default function AdUnitDesign({
  activeDevice,
  heading,
  presetColors,
  isOpen,
  onToggle,
  adData,
  setAdData
}) {
  const propAdUnitWidth = adData?.base?.width || 0;
  const propAdUnitHeight = adData?.base?.height || 0;
  const [inputAdUnitWidth, setInputAdUnitWidth] = useState(propAdUnitWidth);
  const [inputAdUnitHeight, setInputAdUnitHeight] = useState(propAdUnitHeight);

  useEffect(() => {
    setInputAdUnitWidth(propAdUnitWidth);
  }, [propAdUnitWidth]);

  const handleBackgroundColor = (color) => {
    setAdData({
      ...adData,
      base: {
        ...adData.base,
        background_color: color
      }
    });
  };

  const handleAdUnitChange = useCallback(
    debounce((adUnitWidth) => {
      if (adUnitWidth < 0) {
        return;
      }

      if (activeDevice === MOBILE && adUnitWidth > MAX_MOBILE_WIDTH) {
        adUnitWidth = MAX_MOBILE_WIDTH;
      }

      const imageWidth =
        adUnitWidth < adData.image.width ? adUnitWidth : adData.image.width;
      const imageHeight = Math.round((imageWidth / 4) * 3);

      setAdData({
        ...adData,
        base: {
          ...adData.base,
          width: adUnitWidth
        },
        image: {
          ...adData.image,
          height: imageHeight,
          width: imageWidth
        }
      });
    }, 1000),
    [adData]
  );

  // change base height
  const adUnitHeightChange = useCallback(
    (adUnitHeight) => {
      if (adData.base.height !== adUnitHeight) {
        setAdData({
          ...adData,
          base: {
            ...adData.base,
            height: adUnitHeight
          }
        });
      }
    },
    [adData]
  );

  useComponentResize('base', ([element]) => {
    const { target } = element;
    const height = target?.offsetHeight;
    setInputAdUnitHeight(height);
  });

  useEffect(() => {
    adUnitHeightChange(inputAdUnitHeight);
  }, [inputAdUnitHeight]);

  const handleWidth = (event) => {
    const adUnitWidth = parseInt(event.target.value);
    setInputAdUnitWidth(adUnitWidth);

    handleAdUnitChange(adUnitWidth);
  };

  return (
    <AccordionItem header={heading} isOpen={isOpen} onClick={onToggle}>
      <div className="card-body">
        <div className="property-container">
          <div className={'my-row'}>
            <label>Height</label>
          </div>
          <div className={'my-row'}>
            <Input
              disabled={true}
              type={'number'}
              value={adData.base?.height || 0}
            />
          </div>
        </div>
        <div className="property-container">
          <div className={'my-row'}>
            <label>Width</label>
          </div>
          <div className={'my-row'}>
            <Input
              onChangeHandler={handleWidth}
              type={'number'}
              value={inputAdUnitWidth}
              disabled={adData?.locked}
              min={MIN_BASE_WIDTH}
              isInvalid={
                (activeDevice === 'Mobile' &&
                  adData.base?.width > MAX_MOBILE_WIDTH) ||
                adData.base?.width < MIN_BASE_WIDTH ||
                isNaN(adData.base?.width)
              }
            />
          </div>
        </div>

        {activeDevice === 'Mobile' && adData.base?.width > MAX_MOBILE_WIDTH && (
          <div className="warning-container">
            <p style={{ top: '-8px' }} className="warning">
              {' '}
              Mobile ad unit width should be less than 450px
            </p>
          </div>
        )}

        {adData.base?.width < MIN_BASE_WIDTH && (
          <div className="warning-container">
            <p style={{ top: '-8px' }} className="warning">
              Ad unit width should be at least {MIN_BASE_WIDTH}px
            </p>
          </div>
        )}

        {isNaN(adData.base?.width) && (
          <div className="warning-container">
            <p className="warning">Ad unit width should be a number</p>
          </div>
        )}

        <div className="property-container">
          <div className={'my-row'}>
            <label>Background Color</label>
          </div>
          <div className={'my-row'}>
            <ColorPicker
              color={adData.base?.background_color}
              handleColor={handleBackgroundColor}
              presetColors={presetColors?.map((color) => {
                return {
                  color: color,
                  title: ''
                };
              })}
            />
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </AccordionItem>
  );
}
