import React from 'react';
import DiaryItem from './DiaryItem';
import axios from 'axios';

const DiaryList = ({ diaryList, onRemove, getData, editData }) => {
  // 전체삭제
  const deleteAll = async () => {
    if (window.confirm('전체 삭제 하시겠습니까?')) {
      try {
        const response = await axios.delete(`/movies`);
        console.log(response);
        getData();
        alert('삭제되었습니다.');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='DiaryList'>
      <h2>영화 리스트</h2>
      <h4>{diaryList.length}개의 영화가 있습니다.</h4>
      <button onClick={deleteAll}>전체삭제</button>
      <div>
        {diaryList.map((it) => (
          <DiaryItem
            key={it.id}
            {...it}
            onRemove={onRemove}
            getData={getData}
            editData={editData}
            diaryList={diaryList}
          />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
