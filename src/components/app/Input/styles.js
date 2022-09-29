import css from 'styled-jsx/css';

export default css`
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .input-group-addon {
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #f5f8fa;
    border: 1px solid #eaeaea;
    white-space: nowrap;
    vertical-align: middle;
    display: table-cell;
  }

  input {
    border: 1px solid #ccc;
    border-radius: 4px;
    display: table-cell;
    float: left;
    position: relative;
    min-height: 38px;
    padding: 6px 12px;
    margin: 0;
    width: 100%;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  .suffix .input-group-addon {
    border-left: 0;
  }

  .prefix .input-group-addon {
    border-right: 0;
  }

  .input-group-addon.prefix {
    border-right: 0;
    min-width: 120px;
  }

  .input-group-addon.suffix {
    border-radius: 0 4px 4px 0;
    border-left: 0;
  }
  .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
  }
`;
