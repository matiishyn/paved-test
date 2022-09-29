import css from 'styled-jsx/css';

export default css`
  .grow {
    -moz-transition: height 0.5s;
    -ms-transition: height 0.5s;
    -o-transition: height 0.5s;
    -webkit-transition: height 0.5s;
    border-left: 1px solid #ededed;
    border-right: 1px solid #ededed;
    transition: height 0.5s;
    height: 0;
    overflow: hidden;
  }
`;
