import styled from "styled-components";

export const LogInForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  .typeInfo {
    width: 30%;
    min-width: 200px;
    margin-bottom: 20px;
  }

  .signup {
    width: 20%;
    min-width: 60px;
    margin-top: 5px;
    font-size: 11px;
    color: #aeaeae;
    cursor: pointer;
  }

  input {
    width: 15vw;
  }

  button {
    width: 30%;
    min-width: 100px;
    margin-top: 10px;
  }
`;
