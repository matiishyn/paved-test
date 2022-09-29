'use strict';

import React, { useEffect, useState } from 'react';
import styles from './styles';
import { BlockPicker } from 'react-color';
import { Popover } from 'react-tiny-popover';

export default function ColorPicker({
  color,
  disabled,
  handleColor,
  presetColors
}) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setDisplayColorPicker(!displayColorPicker);
    }
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (inputColor) => {
    handleColor(inputColor.hex);
  };

  useEffect(() => {
    if (disabled) {
      setDisplayColorPicker(false);
    }
  }, [disabled]);

  return (
    <>
      <Popover
        isOpen={displayColorPicker}
        position={['bottom', 'right']}
        padding={10}
        onClickOutside={handleClose}
        content={() => (
          <BlockPicker
            color={color}
            onChange={handleChange}
            presetColors={presetColors}
            disableAlpha
          />
        )}
      >
        <div className="swatch" onClick={handleClick}>
          <div className="color" style={{ background: color }} />
        </div>
      </Popover>
      <style jsx>{styles}</style>
    </>
  );
}
