import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
`;

export const Category = styled.h2`
  font-size: 14px;
  font-weight: normal;
  color: #333;
  margin: 10px 0;
`;

export const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
`;

export const Writer = styled.h2`
  font-size: 14px;
  font-weight: normal;
  color: #666;
  margin: 5px 0;
  text-align: right;
`;

export const Date = styled.span`
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
  display: block;
  text-align: right;
  padding-bottom: 10px;
  border-bottom: 1px solid #bcbbcc;
`;

export const Content = styled.p`
  font-size: 16px;
  height: 400px;
  color: #333;
  line-height: 1.6;
  word-break: break-word;
  white-space: pre-wrap; /* 줄 바꿈 유지 */
  margin-bottom: 20px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;