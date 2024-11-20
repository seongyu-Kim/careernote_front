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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 메뉴 상태
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEdit = () => {
    // 수정할 글의 데이터를 state로 전달하여 /write 페이지로 이동
    navigate('/write', {
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
      visible: post.writer === user, // 작성자 본인만 수정 가능
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
      <Styled.Title>{post.title}</Styled.Title>
      <Styled.Writer>{post.writer}</Styled.Writer>
      <Styled.Date>{post.date}</Styled.Date>
      <Styled.Content>{post.content}</Styled.Content>
    </Styled.Container>
  );
};

export default PostCard;
