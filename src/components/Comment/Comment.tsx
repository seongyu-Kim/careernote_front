import React, { useState } from 'react';
import * as Styled from './Comment.styled';

interface CommentProps {
  nickName: string;
  content: string;
  date: string;
  isOwnComment: boolean;
  onEdit: (content: string) => void;
  onDelete: () => void;
}

const Comment = ({ nickName, content, date, isOwnComment, onEdit, onDelete }: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditConfirm = () => {
    onEdit(editedContent);
    setIsEditing(false);
    setEditedContent('');
  };

  const handleCancelEdit = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  return (
    <Styled.CommentContainer>
      <Styled.CommentHeader>
        <Styled.NickName>{nickName}</Styled.NickName>
        <Styled.Date>{date}</Styled.Date>
      </Styled.CommentHeader>

      {isEditing ? (
        <>
          <Styled.EditInput
            type="text"
            value={editedContent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedContent(e.target.value)}
          />
          <Styled.Actions>
            <Styled.ActionButton onClick={handleEditConfirm}>수정 완료</Styled.ActionButton>
            <Styled.ActionButton onClick={handleCancelEdit}>취소</Styled.ActionButton>
          </Styled.Actions>
        </>
      ) : (
        <>
          <Styled.Content>{content}</Styled.Content>
          {isOwnComment && (
            <Styled.Actions>
              <Styled.ActionButton onClick={handleEditClick}>수정</Styled.ActionButton>
              <Styled.ActionButton onClick={onDelete}>삭제</Styled.ActionButton>
            </Styled.Actions>
          )}
        </>
      )}
    </Styled.CommentContainer>
  );
};

export default Comment;