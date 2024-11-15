import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
`;

export const AdminNotice = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const FormFieldGroup = styled.div`
  display: flex;
  margin-bottom: 40px;
  gap: 10px;
`;

export const Label = styled.label`
  width: 120px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: rgba(179, 213, 235, 0.2);
`;

export const SelectCategory = styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: rgba(179, 213, 235, 0.2);
`;

export const TextareaField = styled.textarea`
  width: 100%;
  height: 500px;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: rgba(179, 213, 235, 0.2);
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
