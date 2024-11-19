import * as Styled from './Input.styled';
import { InputProps } from '@/type/input';

const Input = ({
  children,
  onChange,
  placeholder,
  placeholderColor = 'black',
  type = 'text',
  value,
  width = 'auto',
  height = 'auto',
  border = '1px solid black',
  borderRadius = '9px',
  outline = 'none',
  backgroundColor = 'white',
  caretColor = 'black',
  padding = '0',
  margin = '0',
  position = 'static',
  top,
  bottom,
  left,
  right,
  fontSize,
  textColor = 'black',
  focusBorderColor = 'none',
}: InputProps) => {
  return (
    <Styled.DefaultInput
      onChange={onChange}
      placeholder={placeholder}
      placeholderColor={placeholderColor}
      type={type}
      value={value}
      width={width}
      height={height}
      border={border}
      borderRadius={borderRadius}
      outline={outline}
      backgroundColor={backgroundColor}
      caretColor={caretColor}
      padding={padding}
      margin={margin}
      position={position}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      fontSize={fontSize}
      textColor={textColor}
      focusBorderColor={focusBorderColor}>
      {children}
    </Styled.DefaultInput>
  );
};

export default Input;
