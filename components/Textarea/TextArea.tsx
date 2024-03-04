import styled from 'styled-components';

const TextArea = styled.textarea`
    background: ${(props) => props.theme.palette.gray['60'].value};
    border: none;
    min-height: 263px;
    color: ${(props) => props.theme.palette.white['100'].value};
    resize: none;
    border-radius: 8px;
    font-size: 1rem;
    width: calc(100% - 24px);
    padding: 12px;
    font-family: ${(props) => props.theme.fontFamilies.default.value};
`;

export default TextArea;
