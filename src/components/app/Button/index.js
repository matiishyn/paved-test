import React from 'react';
import styles from './styles';

export default function Button({
  disabled,
  isActive,
  onClickHandler,
  type,
  text
}) {
  return (
    <>
      <button
        style={{ opacity: disabled ? '0.5' : '1' }}
        className={'button' + (isActive ? ' active' : '')}
        disabled={disabled}
        type={type ? type : 'button'}
        onClick={onClickHandler}
      >
        {text}
      </button>

      <style jsx>{styles}</style>
    </>
  );
}
