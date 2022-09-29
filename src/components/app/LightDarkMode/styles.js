import css from 'styled-jsx/css';

export default css`
  .sw-container {
    display: flex;
    align-items: stretch;
  }

  .icon {
    margin-top: -4px;
    margin-right: 4px;
  }

  .light {
    color: #3e1df5;
  }

  .dark {
    color: #901df5;
  }

  .sw-button {
    border: none;
    display: flex;
    align-items: center;
    padding: 6px 14px 6px 14px;
    border-radius: 6px;
    background: none;
  }

  .active {
    background-color: #ededf0;
  }

  .inactive {
    opacity: 0.8;
  }
`;
