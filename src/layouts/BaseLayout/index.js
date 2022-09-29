import React from 'react';
import fontStyles from '../../../styles/fontStyles';
import flexStyles from '../../../styles/flexStyles';

export default function BaseLayout({ children }) {
  return (
    <div>
      {children}
      <style jsx global>
        {fontStyles}
      </style>
      <style jsx global>
        {flexStyles}
      </style>
    </div>
  );
}
