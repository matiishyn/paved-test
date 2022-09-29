import React from 'react';
import styles from './styles';

export default function Input({
  disabled,
  onChangeHandler,
  isInvalid,
  prefix,
  suffix,
  type,
  value,
  ...remain
}) {
  let inputStyle = {
    borderColor: isInvalid ? '#FF0000' : '#D9D9D9'
  };

  if (prefix && suffix) {
    inputStyle = {
      ...inputStyle,
      borderRadius: '0px'
    };
  } else if (prefix) {
    inputStyle = {
      ...inputStyle,
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: '0px'
    };
  } else if (suffix) {
    inputStyle = {
      ...inputStyle,
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px'
    };
  }
  if (isInvalid) {
    inputStyle = {
      ...inputStyle,
      borderRight: 'none'
    };
  }

  return (
    <>
      <div>
        <div className="input-group presuffix">
          {prefix && (
            <span className="input-group-addon prefix"> {prefix} </span>
          )}
          <input
            style={inputStyle}
            disabled={disabled}
            type={type}
            name="input"
            onChange={onChangeHandler}
            value={value}
            {...remain}
          />
          {suffix && (
            <span className="input-group-addon suffix"> {suffix} </span>
          )}
          {isInvalid && (
            <span
              className="input-group-addon suffix"
              style={{ backgroundColor: '#ffffff', borderColor: '#FF0000' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="red"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </span>
          )}
        </div>
      </div>

      <style jsx>{styles}</style>
    </>
  );
}
