import React, { useState } from 'react';
import axios from 'axios';

const DiaryItem = ({ author, content, emotion, id, getData, diaryList }) => {
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const [localContent, setLocalContent] = useState('');

  // 수정 로직
  async function editData(id) {
    const editId = diaryList.filter((item) => item.id === id);

    try {
      const response = await axios.patch(`/movies/${id}`, {
        ...editId[0],
        content: localContent,
      });
      console.log(response);
      alert('수정 성공');
      setIsEdit(!isEdit);
      getData();
    } catch (error) {
      console.error(error);
    }
  }

  // 삭제 로직
  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제합니까?')) {
      alert('삭제되었습니다.');
      try {
        const response = await axios.delete(`/movies/${id}`);
        console.log(response);
        getData();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  return (
    <div className='DiaryItem'>
      <div className='info'>
        <span>
          {' '}
          작성자 : {author} | 감정점수 : {emotion}
        </span>{' '}
        <br />
      </div>
      <div className='content'>
        {isEdit ? (
          <textarea
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
            placeholder={content}
          />
        ) : (
          content
        )}{' '}
      </div>
      {isEdit ? (
        <>
          {' '}
          <button onClick={toggleIsEdit}>수정취소</button>
          <button onClick={() => editData(id)}>수정완료</button>{' '}
        </>
      ) : (
        <>
          <button onClick={() => handleDelete(id)}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
