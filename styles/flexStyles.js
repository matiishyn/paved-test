import css from 'styled-jsx/css';

export default css.global`
  .row {
    display: flex;
    flex-direction: row;
  }
  .my-row {
    display: flex;
  }
  .col {
    display: flex;
    flex-direction: column;
  }
  .my-col {
    flex: 50%;
  }
  .flex-1 {
    min-width: 0;
    flex: 1 1 0%;
  }
  .d-flex {
    display: flex;
  }
`;
