import React, { useEffect } from 'react';
import styles from './styles';

// TODO Check where and if this should be used
export default function DropDownContainer({ children, heading, showSection }) {
  useEffect(() => {
    const growDiv = document.getElementById(
      `grow-${heading.replace(/ /gi, '')}`
    );
    const wrapper = document.querySelector(
      `.${heading.replace(/ /gi, '')}-wrapper`
    );
    growDiv.style.height = (showSection ? wrapper.clientHeight : 0) + 'px';
  }, [showSection]);

  return (
    <>
      <div className="grow" id={`grow-${heading.replace(/ /gi, '')}`}>
        <div className={`${heading.replace(/ /gi, '')}-wrapper`}>
          {children}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
}
