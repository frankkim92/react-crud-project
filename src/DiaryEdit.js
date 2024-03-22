import React, { useRef, useState } from 'react';
import axios from 'axios';
const DiaryEdit = ({ getData, myId }) => {
  const authorInput = useRef();
  const contentInput = useRef();
  const emotionInput = useRef();
  const [state, setState] = useState({
    author: '',
    content: '',
    emotion: '1',
  });

  const handleChangeState = (e) => {
    if (e.emotion === '선택') {
      alert('emotion을 선택해주세요.');
      return;
    }
    setState({ ...state, [e.target.name]: e.target.value }); // 이거 중요하다.
  };

  const validateData = () => {
    if (state.author.length < 1) {
      alert('1글자 이상 작성!');
      authorInput.current.focus();
      console.log('1글자에서 걸림');
      return false;
    }
    if (state.content.length < 2) {
      alert('2글자 이상 작성!');
      contentInput.current.focus();
      console.log('2글자에서 걸림');
      return false;
    }
    if (state.emotion === '') {
      alert('나의 감정상태를 선택해주세요.');
      emotionInput.current.focus();
      console.log('emotion 에서 걸림');
      return false;
    }
    return true;
  };

  // 등록 로직
  async function submitData() {
    if (!validateData()) {
      return;
    }
    try {
      const postData = { ...state, myId: myId };
      const response = await axios.post('/movies/', postData);
      console.log(response);
      alert('저장 성공');
      setState({
        author: '',
        content: '',
        emotion: '',
      });
      getData();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='DiaryEdit'>
      <h2>Movies</h2>

      <div>
        <input
          placeholder='제목을 적어주세요.'
          ref={authorInput}
          name='author'
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <textarea
        placeholder='내용을 적어주세요.'
        ref={contentInput}
        name='content'
        value={state.content}
        onChange={handleChangeState}
      />
      <div>
        <select
          name='emotion'
          ref={emotionInput}
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value='0'>감정상태 선택</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
      </div>
      <div>
        <button onClick={submitData}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEdit;
