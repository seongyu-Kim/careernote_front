import styled from 'styled-components';

export const CommentContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const EditTextArea = styled.textarea`
  border: 1px solid #79b0c8;
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
  overflow: hidden;
  word-wrap: break-word;
`;

export const NickName = styled.span`
  font-weight: bold;
  color: #333;
`;

export const Date = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

export const Content = styled.p`
  font-size: 1rem;
  color: #444;
  margin-bottom: 10px;
  white-space: pre-wrap;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;

`;