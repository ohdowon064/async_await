import React, { useState, useEffect } from 'react';
import { SignupForm } from './style/Signup.style';
import { TypingInfo } from './style/TypingInfo.style';
import { Input, Modal } from 'antd';
import useInputs from '../Hooks/onInputChange';

const Signup = ({ clickSignup, isVisible }) => {
  const [id, setId] = useInputs(''); //회원가입 아이디 입력
  const [password, setPassword] = useInputs(''); //회원가입 비밀번호 입력
  const [checkPassword, setCheckPassword] = useInputs(''); //회원가입 비밀번호 재입력
  const [email, setEmail] = useInputs(''); //회원가입 이메일 입력
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);

  useEffect(() => {
    password === checkPassword
      ? setIsCorrectPassword(true)
      : setIsCorrectPassword(false);
  }, [password, checkPassword]);

  return (
    <Modal
      title='회원가입'
      visible={isVisible}
      // onOk={this.handleOk}
      onCancel={clickSignup}
    >
      <SignupForm>
        <div>
          <TypingInfo length='250px'>
            <div>아이디</div>
            <Input type='text' value={id} onChange={setId} />
          </TypingInfo>
          <TypingInfo length='250px'>
            <div>비밀번호</div>
            <Input type='password' value={password} onChange={setPassword} />
          </TypingInfo>
          <TypingInfo length='250px'>
            <div>비밀번호 확인</div>
            <Input
              type='password'
              value={checkPassword}
              onChange={setCheckPassword}
            />
          </TypingInfo>
          {!isCorrectPassword && (
            <div className='check-password'>
              비밀번호와 확인이 일치하지 않습니다.
            </div>
          )}
          <TypingInfo length='250px'>
            <div>이메일</div>
            <Input type='email' value={email} onChange={setEmail} />
          </TypingInfo>
        </div>
      </SignupForm>
    </Modal>
  );
};

export default Signup;
