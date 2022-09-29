import React from 'react';
import classNames from 'classnames';
import DarkIcon from '../../../icons/DarkIcon';
import LightIcon from '../../../icons/LightIcon';
import styles from './styles';

export function LightDarkMode({ isDark, onToggle }) {
  return (
    <>
      <div className="sw-container">
        <button
          className={classNames('sw-button', { active: !isDark })}
          onClick={onToggle}
        >
          <span className="icon light">
            <LightIcon />
          </span>
          Light mode
        </button>
        <button
          className={classNames('sw-button', { active: isDark })}
          onClick={onToggle}
        >
          <span className="icon dark">
            <DarkIcon />
          </span>
          Dark mode
        </button>
      </div>
      <style jsx>{styles}</style>
    </>
  );
}
