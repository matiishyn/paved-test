import React from 'react';
import styles from './styles';

export default function LoadingLayout({ loadingMessage }) {
  return (
    <div className="center-container">
      <h1 className="loading"> {loadingMessage} </h1>
      <style jsx>{styles}</style>
    </div>
  );
}
