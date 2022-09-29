import React from 'react';
import styles from './styles';

export default function ErrorLayout({ missingQueryParams }) {
  const missingQueryParamsAsString = missingQueryParams.join(', ');
  const errorMessage =
    missingQueryParams && missingQueryParams.length === 1
      ? 'Error: the following query parameter is missing: ' +
        missingQueryParamsAsString
      : 'Error: the following query parameters are missing: ' +
        missingQueryParamsAsString;

  return (
    <div className="center-container">
      <p> {errorMessage} </p>
      <style jsx>{styles}</style>
    </div>
  );
}
