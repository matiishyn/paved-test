import css from 'styled-jsx/css';

export default css`
  .button {
    background-color: transparent;
    border-radius: 4px;
    border: none;
    color: #232e3c;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    outline: none;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    transition-duration: 0.4s;
    -webkit-transition-duration: 0.4s;
  }
  .button:hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
  .button.active {
    color: #206bc4;
    background-color: rgba(32, 107, 196, 0.06);
  }
`;
