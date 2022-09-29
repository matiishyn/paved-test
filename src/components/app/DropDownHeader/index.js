import React from 'react';
import styles from './styles';

// TODO Check where and if this should be used
export default function DropDownHeader({
  heading,
  showSections,
  showSectionIndex,
  changeVisibleSection
}) {
  const toggleSection = () => {
    const growDiv = document.getElementById(
      `grow-${heading.replaceAll(' ', '')}`
    );
    if (growDiv.clientHeight) {
      growDiv.style.height = 0;
    } else {
      const wrapper = document.querySelector(
        `.${heading.replaceAll(' ', '')}-wrapper`
      );
      growDiv.style.height = wrapper.clientHeight + 'px';
    }

    changeVisibleSection(showSectionIndex);
  };

  return (
    <>
      <div
        className="theme-show-accordion-group-header"
        onClick={toggleSection}
      >
        <div
          className="theme-show-accordion-group-header-title"
          style={{
            fontWeight: showSections[showSectionIndex] ? 600 : 400
          }}
        >
          {heading}
        </div>
        <div className="flex-1"></div>
        <div className="theme-show-accordion-group-header-chevron">
          {showSections[showSectionIndex] ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-up"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          )}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
}
