import Navbar from '@components/Navbar/Navbar';
import PostCard from '@components/PostCard/PostCard';
import React from 'react';
import styled from 'styled-components';

const PostView: React.FC = () => {
  // api 호출해서 PostCard 컴포넌트에 넘기는 부분 추가
  const user = '리오니'; // 유저 상태관리에서 가져오기?
  return (
    <>
      <Navbar />
      <PostCard
        category="취업"
        title="제목입니다~"
        writer="리오니"
        date="2024.11.03"
        content="content 입니다. content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다 content 입니다"
        user={user} //user가 writer랑 일치해야만 수정, 삭제 버튼 떠야함
      />
    </>
  );
};

export default PostView;
