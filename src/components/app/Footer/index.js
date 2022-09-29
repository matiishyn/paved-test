import React from 'react';
import styles from './styles';

export default function Footer({ onSave, errors }) {
  return (
    <>
      <div className="footer-container">
        <div>
          {errors.map((error) => (
            <p className="warning-container warning" key={error}>
              {error}
            </p>
          ))}
        </div>
        <button
          className="footer-btn"
          onClick={onSave}
          disabled={errors.length > 0}
        >
          Save Changes
        </button>
      </div>
      <style jsx>{styles}</style>
    </>
  );
}
