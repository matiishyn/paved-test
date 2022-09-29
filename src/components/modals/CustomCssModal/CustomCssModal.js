import React from 'react';
import Modal from 'react-modal';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/css/css.js';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '60%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0.8rem',
    borderRadius: '0.5rem',
    background: 'rgba(255, 255, 255, 0.3)'
  },
  overlay: {
    zIndex: 4
  }
};

const CustomCssModal = ({
  adData,
  onCustomCssChange,
  onClose,
  onCancel,
  isOpen
}) => {
  return (
    <Modal isOpen={isOpen} onAfterClose={onCancel} style={customStyles}>
      <CodeMirror
        value={adData?.custom_css}
        autoCursor={false}
        autoScroll={false}
        onChange={(_editor, _data, value) => onCustomCssChange(value)}
        options={{
          mode: 'css',
          lineNumbers: true,
          indentUnit: 2,
          smartIndent: true,
          lineWrapping: true,
          theme: 'material'
        }}
      />
      <button
        type="button"
        className="btn-close btn-close-white"
        aria-label="Close"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '25px',
          right: '25px',
          zIndex: '5'
        }}
      ></button>
    </Modal>
  );
};

export default CustomCssModal;
