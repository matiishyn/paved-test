import css from 'styled-jsx/css';

export default css`
  .btn-group button {
    background-color: #ffffff;
    border: 1px solid #cfdce6;
    color: #000000;
    padding: 8px 16px;
    cursor: pointer;
    float: left;
  }

  .btn-group:after {
    content: '';
    clear: both;
    display: table;
  }

  .btn-group button:not(:last-child) {
    border-right: none;
  }

  .btn-group button:hover {
    background-color: #207fc4;
    color: #ffffff;
  }

  .btn-group button.active {
    background-color: #207fc4 !important;
    color: #ffffff !important;
  }
`;
