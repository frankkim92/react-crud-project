import { useState, useEffect, useCallback } from 'react';
import DiaryEdit from './DiaryEdit';
import DiaryList from './DiaryList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import './App.css';

const DiaryMain = () => {
  const [data, setData] = useState([]);
  const [myUserName, setMyUserName] = useState('');
  const [myId, setMyId] = useState('');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    alert('로그아웃이 완료되었습니다.');
    navigate('/');
  };

  // 조회 로직
  const getData = useCallback(async () => {
    try {
      const response = await axios.get(`/movies?myId=${myId}`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [myId]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setMyUserName(jwtDecode(accessToken).username);
      setMyId(jwtDecode(accessToken).id);
    }

    if (!accessToken) {
      navigate('/');
      alert('로그인 해주세요');
    }

    getData();
  }, [navigate, getData]);

  return (
    <div>
      <button className='LogoutButton' onClick={logout}>
        로그아웃
      </button>
      <p className='MyUserName'>
        어서오세요 {myUserName ? myUserName : '방문자'} 님 어서오세요
        <br />
        나의 Id : {myId}
      </p>
      <div className='App'>
        <DiaryEdit getData={getData} myId={myId} />
        <DiaryList diaryList={data} getData={getData} />
      </div>
    </div>
  );
};

export default DiaryMain;
