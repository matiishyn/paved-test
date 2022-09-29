import css from 'styled-jsx/css';

export default css`
  .footer-container {
    border-top: 1px solid #ededed;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 22px;
    padding: 8px 12px;
    width: 100%;
  }

  .footer-btn {
    background: rgb(32, 107, 196);
    border: none;
    border-radius: 4px;
    color: #fff !important;
    margin-left: 8px;
    padding: 8px 18px;
    transition: all 0.4s ease 0s;
  }

  .footer-btn:disabled {
    background: lightgrey;
  }

  .footer-btn:hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`;
