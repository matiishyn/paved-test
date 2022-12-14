import css from 'styled-jsx/css';

export default css`
  .color {
    width: 36px;
    height: 14px;
    border-radius: 2px;
  }
  .swatch {
    padding: 5px;
    background: #ffffff;
    border-radius: 1px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    display: inline-block;
    cursor: pointer;
    margin-top: 4px;
  }
  .cover {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;
