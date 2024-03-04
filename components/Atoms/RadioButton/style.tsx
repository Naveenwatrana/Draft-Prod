import styled from 'styled-components';

export const RadioButtonContainer = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: max-content;
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    font-weight: 300;
  }
  input {
    display: none;
  }
`;
