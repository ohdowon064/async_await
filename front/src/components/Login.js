import React, { useState, useCallback } from "react";
import useInputs from "../Hooks/onInputChange";
import { Input, Button } from "antd";
import { LogInForm } from "./style/Login.style";
import { TypingInfo } from "./style/TypingInfo.style";
import Signup from "./Signup";
import { callApi } from "../apis";

const Login = () => {
  const [id, setId] = useInputs("");
  const [password, setPassword] = useInputs("");
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const clickSignup = useCallback(() => {
    setIsVisibleModal(prev => !prev);
  }, []);

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      const response = await callApi({
        method: "POST",
        url: "/user/login",
        body: {
          id,
          password
        }
      });
      console.log(response);
    },
    [id, password]
  );

  return (
    <LogInForm onSubmit={onSubmit}>
      <TypingInfo>
        <div>아이디</div>
        <Input type="text" value={id} onChange={setId} />
      </TypingInfo>
      <TypingInfo>
        <div>비밀번호</div>
        <Input type="password" value={password} onChange={setPassword} />
      </TypingInfo>
      <div className="signup" onClick={clickSignup}>
        회원가입
      </div>
      {isVisibleModal && (
        <Signup clickSignup={clickSignup} isVisible={isVisibleModal} />
      )}
      <Button type="primary">로그인</Button>
    </LogInForm>
  );
};

export default Login;
