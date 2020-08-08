import React, { useState, useCallback } from 'react';
import useInputs from '../Hooks/onInputChange';
import { Input, Button } from 'antd';
import { LogInForm } from './style/Login.style';
import Signup from './Signup';

const Login = () => {
  const [id, setId] = useInputs('');
  const [password, setPassword] = useInputs('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const clickSignup = useCallback(() => {
    setIsVisibleModal((prev) => !prev);
  }, []);

  return (
    <LogInForm>
      <div className='typingInfo'>
        <div>아이디</div>
        <Input type='text' value={id} onChange={setId} />
      </div>
      <div className='typingInfo'>
        <div>비밀번호</div>
        <Input type='password' value={password} onChange={setPassword} />
      </div>
      <div className='signup' onClick={clickSignup}>
        회원가입
      </div>
      {isVisibleModal && (
        <Signup clickSignup={clickSignup} isVisible={isVisibleModal} />
      )}
      <Button type='primary'>로그인</Button>
    </LogInForm>
  );
};

export default Login;
