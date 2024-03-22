import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DiarySignUp = () => {
  const navigate = useNavigate();
  const nicknameRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const [formData, setFormData] = useState({
    nickname: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUp = async () => {
    if (formData.nickname === '') {
      alert('아이디를 입력해주세요.');
      nicknameRef.current.focus();
      return;
    }

    if (formData.password === '') {
      alert('패스워드를 입력해주세요.');
      passwordRef.current.focus();
      return;
    }

    try {
      const response = await axios.post('/auth/signup/', formData);
      console.log(response.data);
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.response.status === 404) {
        alert('이미 사용중인 아이디 입니다.');
        nicknameRef.current.focus();
      } else {
        console.error('서버 오류:', error.response.data);
      }
    }
  };

  const login = () => {
    navigate('/');
  };

  return (
    <div className='DiarySignUp'>
      <h1>회원가입</h1>
      <div className='DiarySignUpContent'>
        <input
          placeholder='아이디를 입력해주세요.'
          value={formData.nickname}
          onChange={handleChange}
          ref={nicknameRef}
          name='nickname'
        />

        <input
          placeholder='이름을 입력해주세요.'
          value={formData.username}
          onChange={handleChange}
          ref={nameRef}
          name='username'
        />

        <input
          placeholder='비밀번호를 입력해주세요.'
          ref={passwordRef}
          name='password'
          value={formData.password}
          onChange={handleChange}
          type='password'
        />
      </div>
      <button className='DiarySignInButton' onClick={signUp}>
        회원가입
      </button>

      <button className='DiaryToSignInButton' onClick={login}>
        Alreay have an account? Login
      </button>
    </div>
  );
};

export default DiarySignUp;
