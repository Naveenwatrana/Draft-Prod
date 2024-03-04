import styled from 'styled-components';

export const HashInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const InputOuter = styled.div`
    box-sizing: border-box;
    border: 1px solid #39363B;
    cursor: text;
    padding: 16px;
    border-radius: 8px;
    background: #282629;
    font-size: 16px;
    min-height: 140px;
    background: #282629; // TODO: Add Color
    max-height: 140px;
    overflow-y: auto;
    &:hover{
        border: 1px solid #fff;
    }
    &:focus{
        border: 2px solid #fff;
    }
    &:focus-visible{
        border: 2px solid #fff;
    }
`;

export const PlaceHolderText = styled.div`
  font-weight:100;
  color: #757575;
  position: absolute;
  padding: 16px;
`;

export const LimitCounter = styled.div`
    display: flex;
    justify-content: end;
    margin-top: 4px;
    font-size: 14px;
`;
