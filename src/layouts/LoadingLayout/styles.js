import css from 'styled-jsx/css';

export default css`
  .loading::after {
    animation: dotty steps(2, end) 2s infinite;
    content: '';
    display: inline-block;
    position: fixed;
  }

  @keyframes dotty {
    0% {
      content: '';
    }
    25% {
      content: '.';
    }
    50% {
      content: '..';
    }
    75% {
      content: '...';
    }
    100% {
      content: '';
    }
  }
`;
