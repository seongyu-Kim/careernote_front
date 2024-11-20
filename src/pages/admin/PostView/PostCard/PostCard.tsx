import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './PostCard.styled';
import Button from '@components/Button/Button';
import { useAlertStore } from '@stores/store';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import DropDown from '@components/DropDown/DropDown';
interface PostCardProps {
  // post 관련
  post: {
    id: string;
    category: string;
    title: string;
    writer: string;
    date: string;
    content: string;
  };
  user?: string; // writer랑 일치하면 수정,삭제 가능
  level?: string; // 관리자이면 모든 글 수정, 삭제 가능
  onDelete: (postId: string) => void;
}

const PostCard = ({ post, user, level, onDelete }: PostCardProps) => {
  const { openAlert } = useAlertStore();
  const navigate = useNavigate();
  const handleEdit = () => {
    // 수정할 글의 데이터를 state로 전달하여 /write 페이지로 이동
    const targetPath = post.category === '공지' ? '/admin-write' : '/write';
    navigate(targetPath, {
      state: {
        category: post.category,
        title: post.title,
        writer: post.writer,
        date: post.date,
        content: post.content,
        postId: post.id
      },
    });
  };
  const options = [
    {
      label: '수정',
      action: handleEdit,
      visible: post.writer === user || (level === '관리자' && post.category === '공지'),
    },
    {
      label: '삭제',
      action: () =>
        openAlert('삭제하시겠습니까?', () => onDelete(post.id)),
      visible: post.writer === user || level === '관리자', // 관리자 또는 작성자 모두 삭제 가능
    },
  ].filter((option) => option.visible);
  return (
    <Styled.Container>
      <Styled.ContainerHeader >
        <Styled.Category category={post.category ?? '공지'}>
          {post.category ?? '공지'}
        </Styled.Category>
        <DropDown
          options={options}
          icon={<BiDotsVerticalRounded size={24} />}
          noOptionsMessage="권한 없음"
        />
      </Styled.ContainerHeader>
      <Styled.Title>{post.title || '탈퇴한 사용자의 글 입니다.'}</Styled.Title>
      <Styled.Writer>{post.writer || '알 수 없는 사용자'}</Styled.Writer>
      <Styled.Date>{post.date}</Styled.Date>
      <Styled.Content>{post.content}</Styled.Content>
    </Styled.Container>
  );
};

export default PostCard;
