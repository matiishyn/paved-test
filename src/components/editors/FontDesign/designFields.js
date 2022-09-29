import React, { useContext } from 'react';
import ReactSelect from 'react-select';
import Switch from 'react-switch';
import {
  MIN_HEADLINE_FONT_SIZE,
  MIN_BODY_FONT_SIZE,
  MIN_CTA_FONT_SIZE
} from '../../../utils/constants';
import { FontDataContext } from '../../../hooks/fontDataContext';
import { CUSTOM_REACT_SELECT_STYLES } from '../../../utils';
import ColorPicker from '../../app/ColorPicker';
import Input from '../../app/Input';
import fontOptions from './options/fonts.json';
import fontWeightOptions from './options/weights.json';
import lineHeightOptions from './options/lineHeights.json';
import styles from './styles';

const groupFontOptions = (gFonts) => {
  return [
    {
      label: 'System fonts',
      options: fontOptions
    },
    {
      label: 'Google fonts',
      options: gFonts.map((font) => ({
        label: font.family,
        value: font.family
      }))
    }
  ];
};

export default function FontDesignFields({
  heading,
  hideSwitch,
  presetColors,
  validateFunc,
  adData,
  setAdData,
  hideLineHeight
}) {
  const [googleFonts] = useContext(FontDataContext);

  const groupedFontOptions = groupFontOptions(googleFonts);

  const section = React.useMemo(() => {
    switch (heading) {
      case 'Headline':
        return 'headline';
      case 'Body Text':
        return 'body';
      case 'CTA Text':
        return 'cta';
      case 'Sponsorship Label':
        return 'sponsorship_label';
      default:
        return '';
    }
  }, [heading]);

  const handleAdDData = (data) => {
    switch (heading) {
      case 'Headline':
        setAdData({
          ...adData,
          headline: data
        });
        break;
      case 'Body Text':
        setAdData({
          ...adData,
          body: data
        });
        break;
      case 'CTA Text':
        setAdData({
          ...adData,
          cta: data
        });
        break;
      case 'Sponsorship Label':
        setAdData({
          ...adData,
          sponsorship_label: data
        });
        break;
      default:
        break;
    }
  };

  const minFontSize = React.useMemo(() => {
    switch (heading) {
      case 'Headline':
        return MIN_HEADLINE_FONT_SIZE;

      case 'Body Text':
        return MIN_BODY_FONT_SIZE;

      case 'CTA Text':
        return MIN_CTA_FONT_SIZE;

      default:
        break;
    }
  }, [heading]);

  const handleChangeComplete = (color) => {
    handleAdDData({
      ...adData[section],
      color: color
    });
  };

  const handleFontChange = (event) => {
    const fontSize = parseInt(event.target.value);

    if (fontSize < 0) {
      return;
    }

    handleAdDData({
      ...adData[section],
      font_size: fontSize
    });
  };

  const handleFontWeight = (event) => {
    handleAdDData({
      ...adData[section],
      weight: parseInt(event.value)
    });
  };

  const handleFontFamily = (event) => {
    handleAdDData({
      ...adData[section],
      font: event.value
    });
  };

  const isLocked = adData?.locked;
  const disabledInput = isLocked || adData[section]?.show === false;

  const handleFontStyle = (target) => {
    if (!disabledInput) {
      switch (target) {
        case 'italic':
          handleAdDData({
            ...adData[section],
            italic: !adData[section]?.italic
          });
          break;
        case 'underline':
          handleAdDData({
            ...adData[section],
            underline: !adData[section]?.underline
          });
          break;
        case 'uppercase':
          handleAdDData({
            ...adData[section],
            uppercase: !adData[section]?.uppercase
          });
          break;
        default:
          break;
      }
    }
  };

  const handlePaddings = (direction, event) => {
    switch (direction) {
      case 'top':
        handleAdDData({
          ...adData[section],
          padding_top: event.target.value
        });
        break;
      case 'right':
        handleAdDData({
          ...adData[section],
          padding_right: event.target.value
        });
        break;
      case 'bottom':
        handleAdDData({
          ...adData[section],
          padding_bottom: event.target.value
        });
        break;
      case 'left':
        handleAdDData({
          ...adData[section],
          padding_left: event.target.value
        });
        break;
      default:
        break;
    }
  };

  const handleLineHeight = (event) => {
    if (isLocked) {
      return;
    }
    handleAdDData({
      ...adData[section],
      line_height: event.value
    });
  };

  const handleTextAlignment = (textAlignment) => {
    if (!disabledInput) {
      handleAdDData({
        ...adData[section],
        alignment: textAlignment
      });
    }
  };

  const handleShowHideSection = () => {
    handleAdDData({
      ...adData[section],
      show: !adData[section]?.show
    });
  };

  const styleHandler = (modifier, type) => {
    const leftItalicBorderRadius = '4px 0 0 4px';
    const rightUnderlineBorderRadius = '0 4px 4px 0';
    const borderRadiusMapping = {
      left: leftItalicBorderRadius,
      italic: leftItalicBorderRadius,
      center: '0',
      uppercase: '0',
      right: rightUnderlineBorderRadius,
      underline: rightUnderlineBorderRadius
    };
    const leftItalicBorder = {
      border: '1px solid  #cccccc',
      borderRight: 'none'
    };
    const centerUpperCaseBorder = { border: '1px solid  #cccccc' };
    const rightUnderlineBorder = {
      border: '1px solid  #cccccc',
      borderLeft: 'none'
    };
    const borderMapping = {
      left: leftItalicBorder,
      italic: leftItalicBorder,
      center: centerUpperCaseBorder,
      uppercase: centerUpperCaseBorder,
      right: rightUnderlineBorder,
      underline: rightUnderlineBorder
    };

    if (type === 'text-align') {
      const alignmentBackgroundColor =
        adData[section]?.alignment === modifier || !adData[section]?.alignment
          ? '#206BC4'
          : '#fff';

      const color =
        adData[section]?.alignment === modifier || !adData[section]?.alignment
          ? '#ffffff'
          : 'currentColor';
      return {
        background: alignmentBackgroundColor,
        ...borderMapping[modifier],
        borderRadius: borderRadiusMapping[modifier],
        color: color,
        width: '40px'
      };
    }

    if (type === 'font-style') {
      const fontStyleBackgroundColor = adData[section]?.[modifier]
        ? '#206BC4'
        : '#fff';
      const fontStyleColor = adData[section]?.[modifier]
        ? '#ffffff'
        : 'currentColor';
      return {
        background: fontStyleBackgroundColor,
        ...borderMapping[modifier],
        borderRadius: borderRadiusMapping[modifier],
        color: fontStyleColor,
        width: '40px'
      };
    }
  };

  return (
    <>
      {!hideSwitch && (
        <div className={'property-container'}>
          <div className={'my-row'}>
            <label>
              {heading} {adData[section]?.show ? 'enabled' : 'disabled'}
            </label>
          </div>
          <div className={'my-row'}>
            <Switch
              onColor={'#206BC4'}
              height={20}
              width={48}
              checkedIcon={false}
              uncheckedIcon={false}
              onChange={handleShowHideSection}
              checked={adData[section]?.show}
            />
          </div>
        </div>
      )}

      <div className={'property-container'}>
        <div className={'my-row'}>
          <label>Font Size</label>
        </div>
        <div className={'my-row'}>
          <Input
            disabled={disabledInput}
            onChangeHandler={handleFontChange}
            suffix={'px'}
            type={'number'}
            value={adData[section]?.font_size}
            isInvalid={
              (validateFunc && validateFunc(adData).length > 0) ||
              isNaN(adData[section]?.font_size)
            }
            min={minFontSize}
          />
        </div>
        {validateFunc && validateFunc(adData).length > 0 && (
          <div className="warning-container">
            <p style={{ top: '8px' }} className="warning">
              {validateFunc(adData)}
            </p>
          </div>
        )}
        {isNaN(adData[section]?.font_size) && (
          <div className="warning-container">
            <p className="warning">Font size should be a number</p>
          </div>
        )}
      </div>

      <div className={'property-container'}>
        <div className={'my-row'}>
          <label>Font Weight</label>
        </div>
        <ReactSelect
          value={{
            value: adData[section]?.weight,
            label: adData[section]?.weight
          }}
          isDisabled={disabledInput}
          onChange={handleFontWeight}
          options={fontWeightOptions}
          styles={CUSTOM_REACT_SELECT_STYLES}
        />
      </div>

      <div className={'property-container'}>
        <div className={'my-row'}>
          <label>Font</label>
        </div>
        <ReactSelect
          value={{
            value: adData[section]?.font,
            label: adData[section]?.font
          }}
          isDisabled={disabledInput}
          onChange={handleFontFamily}
          options={groupedFontOptions}
          styles={CUSTOM_REACT_SELECT_STYLES}
        />
      </div>
      {!hideLineHeight && (
        <div className={'property-container'}>
          <div className={'my-row'}>
            <label>Line Height</label>
          </div>
          <ReactSelect
            value={{
              value: adData[section]?.line_height,
              label: adData[section]?.line_height
            }}
            isDisabled={disabledInput}
            onChange={handleLineHeight}
            options={lineHeightOptions}
            styles={CUSTOM_REACT_SELECT_STYLES}
          />
        </div>
      )}

      <div className={'property-container'}>
        <div className={'my-row'}>
          <label> Color </label>
        </div>
        <div className={'my-row'}>
          <ColorPicker
            color={adData[section]?.color}
            disabled={disabledInput}
            handleColor={handleChangeComplete}
            presetColors={presetColors?.map((color) => {
              return {
                color: color,
                title: ''
              };
            })}
          />
        </div>
      </div>

      <div className={'property-container'}>
        <div className={'my-row'}>
          <label>Padding </label>
        </div>
      </div>

      <div className={'my-row'}>
        <div className={'my-col input-container'}>
          <Input
            disabled={disabledInput}
            type={'number'}
            value={adData[section]?.padding_top}
            onChangeHandler={(e) => handlePaddings('top', e)}
          />
        </div>
        <div className={'my-col input-container'}>
          <Input
            disabled={disabledInput}
            type={'number'}
            value={adData[section]?.padding_right}
            onChangeHandler={(e) => handlePaddings('right', e)}
          />
        </div>
        <div className={'my-col input-container'}>
          <Input
            disabled={disabledInput}
            type={'number'}
            value={adData[section]?.padding_bottom}
            onChangeHandler={(e) => handlePaddings('bottom', e)}
          />
        </div>
        <div className={'my-col input-container'} style={{ marginRight: '0' }}>
          <Input
            disabled={disabledInput}
            type={'number'}
            value={adData[section]?.padding_left}
            onChangeHandler={(e) => handlePaddings('left', e)}
          />
        </div>
      </div>

      <div style={{ marginBottom: '12px' }} className={'my-row'}>
        <div className={'my-col input-container'}>
          <label className="foot-note">TOP</label>
        </div>
        <div className={'my-col input-container'}>
          <label className="foot-note">RIGHT</label>
        </div>
        <div className={'my-col input-container'}>
          <label className="foot-note">BOTTOM</label>
        </div>
        <div className={'my-col input-container'}>
          <label className="foot-note">LEFT</label>
        </div>
      </div>

      <div className={'property-container'}>
        <div className={'my-row'}>
          <label>Alignment</label>
        </div>
        <div className="my-row icon-container">
          <div className="my-col">
            <button
              disabled={Boolean(disabledInput)}
              onClick={() => handleTextAlignment('left')}
              className="btn btn-white btn-icon"
              aria-label="Button"
              style={styleHandler('left', 'text-align')}
            >
              <i className="far fa-align-left"></i>
            </button>
            <button
              disabled={Boolean(disabledInput)}
              onClick={() => handleTextAlignment('center')}
              className="btn btn-white btn-icon"
              aria-label="Button"
              style={styleHandler('center', 'text-align')}
            >
              <i className="far fa-align-center"></i>
            </button>
            <button
              disabled={Boolean(disabledInput)}
              onClick={() => handleTextAlignment('right')}
              className="btn btn-white btn-icon"
              aria-label="Button"
              style={styleHandler('right', 'text-align')}
            >
              <i className="far fa-align-right"></i>
            </button>
          </div>
        </div>
      </div>

      <div className={'property-container'} style={{ marginBottom: '0px' }}>
        <div className={'my-row'}>
          <label>Styling</label>
        </div>
        <div className="my-row icon-container">
          <div className="my-col">
            <button
              disabled={Boolean(disabledInput)}
              onClick={() => handleFontStyle('italic')}
              className="btn btn-white btn-icon"
              aria-label="Button"
              style={styleHandler('italic', 'font-style')}
            >
              <i className="far fa-italic"></i>
            </button>
            <button
              disabled={Boolean(disabledInput)}
              onClick={() => handleFontStyle('uppercase')}
              className="btn btn-white btn-icon"
              aria-label="Button"
              style={styleHandler('uppercase', 'font-style')}
            >
              <i className="fad fa-font-case"></i>
            </button>
            <button
              disabled={Boolean(disabledInput)}
              onClick={() => handleFontStyle('underline')}
              className="btn btn-white btn-icon"
              aria-label="Button"
              style={styleHandler('underline', 'font-style')}
            >
              <i className="far fa-underline"></i>
            </button>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
}
