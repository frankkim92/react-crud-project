import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { AiOutlineLogin } from 'react-icons/ai';
import { RiKakaoTalkFill } from 'react-icons/ri';

import axios from 'axios';

const DiarySignIn = () => {
  const navigate = useNavigate();
  const idRef = useRef(null);
  const pwRef = useRef(null);

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleId = (e) => {
    setId(e.target.value);
  };
  const handlePw = (e) => {
    setPw(e.target.value);
  };

  const formData = {
    nickname: id,
    password: pw,
  };

  const login = async (e) => {
    if (id === '') {
      alert('아이디를 입력해주세요.');
      idRef.current.focus();
      return;
    }

    if (pw === '') {
      alert('패스워드를 입력해주세요.');
      pwRef.current.focus();
      return;
    }

    try {
      e.preventDefault(); // 폼 제출 방지

      const response = await axios.post('/auth/signin', formData);

      console.log(response, 'response');
      if (response.data.message === '401') {
        throw new Error('401');
      }
      if (response.data.message === '402') {
        throw new Error('402');
      } else {
        const accessToken = response.data.token;
        localStorage.setItem('accessToken', accessToken);

        alert('로그인이 완료되었습니다.');
        navigate('/main');
      }
    } catch (error) {
      console.error(error);
      if (error.message === '401') alert('존재하지 않는 아이디 입니다.');
      if (error.message === '402') alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const signUp = () => {
    navigate('/signup');
  };

  return (
    <div className='DiarySignUp'>
      <h1>로그인</h1>
      <div className='DiarySignUpContent'>
        <form onSubmit={login}>
          <input
            placeholder='아이디를 입력해주세요.'
            value={id}
            onChange={handleId}
            ref={idRef}
            name='id'
          />

          <input
            placeholder='비밀번호를 입력해주세요.'
            ref={pwRef}
            name='password'
            value={pw}
            onChange={handlePw}
          />
          <button
            className='DiarySignInButton
'
          >
            로그인
            <i>
              {' '}
              <AiOutlineLogin />
            </i>
          </button>
        </form>
        <div />

        <div className='SignUpThreeButton'>
          <button className='DiarySignUpButton' onClick={signUp}>
            아이디 찾기
          </button>
          <button className='DiarySignUpButton' onClick={signUp}>
            비밀번호 찾기
          </button>
          <button className='DiarySignUpButton' onClick={signUp}>
            회원가입
          </button>
          <hr />
          <button className='DiarySignInButtonForFacebook'>
            Login with Facebook
            <i>
              <FaFacebook />
            </i>
          </button>

          <button className='DiarySignInButtonForGoogle'>
            Login with Google
            <i>
              <FaGoogle />
            </i>
          </button>
          <button className='DiarySignInButtonForNaver'>
            Login with Naver
            <i>
              <SiNaver />
            </i>
          </button>
          <button className='DiarySignInButtonForKakao'>
            Login with Kakao
            <i>
              <RiKakaoTalkFill />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiarySignIn;
