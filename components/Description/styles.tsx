import styled from 'styled-components';
import { TEXTAREA_PADDING } from './constants';
import { TextAareaProps } from './types';

export const ProjectHeading = styled.div`
  margin-bottom: 24px;
`;

export const WordCounterWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 8px;
`;

export const Textarea = styled.textarea<TextAareaProps>`
  font-weight: ${(props) => props.theme.typography['16 regular'].fontWeight};
  font-size: ${(props) => props.theme.typography['16 regular'].fontSize.value}px;
  background: ${({ theme }) => theme.palette.gray[50].value};
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-family: ${({ theme }) => theme.defaultFont};
  padding: ${TEXTAREA_PADDING}px;
  resize: none;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  min-height: ${(props) => props.height ? '0px' : '263px'};
  border-radius: 8px;
  height: ${(props) => props.height && props.height - TEXTAREA_PADDING - TEXTAREA_PADDING}px;
  &:focus {
    border: none;
    text-decoration: none;
    outline-color: ${({ theme }) => theme.palette.gray['30'].value};
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

export const FieldLabel = styled.div`
  margin-bottom: 5px;
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-size: ${(props) => props.theme.typography['12 semibold'].fontSize.value}px;
`;
