import React from 'react';
import BaseLayout from '../BaseLayout';
import { FONTS } from '../../utils';
import styles from './styles';

export default function LayoutWithNav({ children }) {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
      {FONTS.map((font, id) => (
        <link
          key={`${font.split('.')[0]}-${id}`}
          rel="preload"
          href={`/fonts/${font}`}
          as="font"
          crossOrigin=""
        />
      ))}

      <BaseLayout>
        <div className="main">
          <div className="container-xl">{children}</div>
        </div>
      </BaseLayout>
      <style jsx>{styles}</style>
    </div>
  );
}
