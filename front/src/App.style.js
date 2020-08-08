import styled from "styled-components";

export const AppForm = styled.div`
  width: 100%;
  height: 100vh;

  .headerForm {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid lightgray;
    box-shadow: rgb(191, 199, 206) 0px 2px 5px 0.5px;
  }
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 30px;
  }

  .login {
    width: 25vw;
    height: 100%;
  }

  .mainContent {
    width: 75vw;
    height: 100%;
  }
`;
