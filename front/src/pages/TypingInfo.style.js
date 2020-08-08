import styled from "styled-components";

export const TypingInfo = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  input {
    width: ${props => props.length || "10vw"};
  }
`;
