import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import Switch from 'react-switch';
import { capitalize } from '../../../utils/helper-functions';
import {
  CUSTOM_REACT_SELECT_STYLES,
  MAX_MOBILE_WIDTH,
  MIN_IMAGE_WIDTH
} from '../../../utils';
import Input from '../../app/Input';
import verticalAlignments from './options/vertical-alignments.json';
import styles from './styles';

export default function ImageDesignFields({ activeDevice, adData, setAdData }) {
  const [showSection] = useState(false);
  const { image } = adData;

  useEffect(() => {
    const btnsContainer = document.getElementById('button-group');

    if (btnsContainer) {
      const btns = btnsContainer.children;

      for (let i = 0; i < 3; i++) {
        btns[i].addEventListener('click', function () {
          let current = btnsContainer.getElementsByClassName('active');
          current[0].className = current[0].className.replace(' active', '');
          this.className += ' active';
        });
      }
    }
  }, [showSection]);

  const handleAdDData = (data) => {
    const {
      base: { height, width }
    } = adData;

    // New Image Height
    let unitHeight = height;
    let unitWidth = width;

    // Increase Ad Unit Container size based on the changed image sizes
    if (data.height >= height) {
      unitHeight = data.height;
    }

    if (data.width >= width) {
      unitWidth = data.width;
    }

    // Increase Ad Unit Height if image alignment is Top
    if (data.alignment === 'grid') {
      if (unitHeight < data.height + 120) {
        unitHeight = data.height + 160;
      }
    }

    // Increase the unit's width if there is no place on the left/right of the image and the text supposed to be there.
    if (data.alignment !== 'grid' && data.width + 150 > unitWidth) {
      unitWidth = unitWidth + 150;

      if (activeDevice === 'Mobile' && unitWidth > MAX_MOBILE_WIDTH) {
        unitWidth = MAX_MOBILE_WIDTH;
        data.width = unitWidth - 150;
        data.height = Math.round((data.width / 4) * 3);
      }
    }

    setAdData({
      ...adData,
      image: data,
      base: {
        ...adData.base,
        height: unitHeight,
        width: unitWidth
      }
    });
  };

  const handleHeightChange = (event) => {
    let height = parseInt(event.target.value);
    let width = Math.round((height / 3) * 4);

    if (height < 0) {
      return;
    }

    if (activeDevice === 'Mobile' && width > MAX_MOBILE_WIDTH) {
      width = MAX_MOBILE_WIDTH;
      height = Math.round((width / 4) * 3);
    }

    handleAdDData({
      ...image,
      height,
      width: width
    });
  };

  const handleWidthChange = (event) => {
    let width = parseInt(event.target.value);
    let height = Math.round((width / 4) * 3);

    if (width < 0) {
      return;
    }

    if (activeDevice === 'Mobile' && width > MAX_MOBILE_WIDTH) {
      width = MAX_MOBILE_WIDTH;
      height = Math.round((width / 4) * 3);
    }

    handleAdDData({
      ...image,
      width,
      height: height
    });
  };

  const handleImagePosition = (value) => {
    handleAdDData({
      ...image,
      alignment: value
    });
  };

  const handleShowHideSection = () => {
    handleAdDData({
      ...image,
      show: !image?.show
    });
  };

  const handleImageVerticalAlignment = (event) => {
    handleAdDData({
      ...image,
      vertical_alignment: event.value
    });
  };

  const isLocked = adData?.locked;

  return (
    <>
      <div className="property-container">
        <div className={'my-row'}>
          <label>Image {adData.image?.show ? 'enabled' : 'disabled'}</label>
        </div>
        <div className={'my-row'}>
          <Switch
            disabled={isLocked}
            height={20}
            width={48}
            onColor={'#206BC4'}
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={handleShowHideSection}
            checked={image?.show}
          />
        </div>
      </div>

      <div className="property-container">
        <label> Image Position </label>
        <div className="btn-group" style={{ width: '100%' }}>
          <button
            className={image?.alignment === 'flex' ? 'active' : ''}
            disabled={!image?.show || isLocked}
            style={{ width: '33.3%' }}
            onClick={() => handleImagePosition('flex')}
          >
            Left
          </button>
          <button
            className={image?.alignment === 'grid' ? 'active' : ''}
            disabled={!image?.show || isLocked}
            style={{ width: '33.3%' }}
            onClick={() => handleImagePosition('grid')}
          >
            Top
          </button>
          <button
            className={image?.alignment === 'right' ? 'active' : ''}
            disabled={!image?.show || isLocked}
            style={{ width: '33.3%' }}
            onClick={() => handleImagePosition('right')}
          >
            Right
          </button>
        </div>
      </div>
      <div className="property-container">
        <div className={'my-row'}>
          <label>Content Alignment</label>
        </div>
        <ReactSelect
          isDisabled={image?.alignment === 'grid' || isLocked}
          value={{
            value: image?.vertical_alignment,
            label: capitalize(image?.vertical_alignment)
          }}
          onChange={handleImageVerticalAlignment}
          options={verticalAlignments}
          styles={CUSTOM_REACT_SELECT_STYLES}
        />
      </div>
      <div className="property-container">
        <div className={'my-row'}>
          <label>Height</label>
        </div>
        <div className={'my-row'}>
          <Input
            disabled={!image?.show || isLocked}
            onChangeHandler={handleHeightChange}
            type={'number'}
            value={image?.height}
          />
        </div>
      </div>
      <div className="property-container">
        <div className={'my-row'}>
          <label>Width</label>
        </div>
        <div className={'my-row'}>
          <Input
            disabled={!image?.show || isLocked}
            isInvalid={
              (activeDevice === 'Mobile' && image?.width >= MAX_MOBILE_WIDTH) ||
              image?.width < MIN_IMAGE_WIDTH ||
              isNaN(image?.width)
            }
            min={MIN_IMAGE_WIDTH}
            onChangeHandler={handleWidthChange}
            type={'number'}
            value={image?.width}
          />
        </div>
      </div>
      {activeDevice === 'Mobile' && adData.image?.width > MAX_MOBILE_WIDTH && (
        <div className="warning-container">
          <p className="warning">
            {' '}
            Mobile Image Width should be at most {MAX_MOBILE_WIDTH}px
          </p>
        </div>
      )}
      {adData.image?.width < MIN_IMAGE_WIDTH && (
        <div className="warning-container">
          <p className="warning">
            Image Width should be at least {MIN_IMAGE_WIDTH}px
          </p>
        </div>
      )}
      {isNaN(adData.image?.width) && (
        <div className="warning-container">
          <p className="warning">Image Width should be a number</p>
        </div>
      )}
      <style jsx>{styles}</style>
    </>
  );
}
