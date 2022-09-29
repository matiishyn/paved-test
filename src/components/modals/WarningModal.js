import React from 'react';
import Modal from 'react-modal';
import Warning from '../../icons/Warning';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '50%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    minWidth: 400,
    maxWidth: 600
  },
  overlay: {
    zIndex: 4
  }
};

const warningIconWrapperStyle = {
  width: 40,
  height: 40,
  backgroundColor: 'rgb(254, 226, 226)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%'
};

const WarningModal = ({ title, body, onCancel, onOK, isOpen }) => {
  return (
    <Modal isOpen={isOpen} onAfterClose={onCancel} style={customStyles}>
      <div className="d-flex">
        <div>
          <div style={warningIconWrapperStyle}>
            <Warning />
          </div>
        </div>
        <div className="ms-3">
          <h2 className="fs-5">{title}</h2>
          <p className="text-secondary">{body}</p>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-outline-dark" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger ms-2" onClick={onOK}>
          Save
        </button>
      </div>
    </Modal>
  );
};

export default WarningModal;
