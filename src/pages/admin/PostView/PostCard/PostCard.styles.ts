import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  height: 100%;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  background-color:#f2f2f2;
`;

export const Category = styled.h2<{ category: string }>`
  font-size: 14px;
  font-weight: normal;
  margin: 10px 0;
  width: fit-content;
  padding: 7px;
  border-radius: 5px;
  background-color: ${(props) => {
    switch (props.category) {
      case '스터디':
        return '#B7A8F0'; 
      case '취업정보':
        return '#4CAF50';
      case '등업':
        return '#FFC107'; 
      default:
        return '#BDBDBD'; 
    }
  }};
  color: white;
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
  height: 600px;
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