import styled from 'styled-components';

type ProjectTimelineBarProps = {
    position: number | string;
    width: number;
};
type TimeSpanProps = {
    ongoing: boolean;
};
export const ProjectTimelineBar = styled.div<ProjectTimelineBarProps>`
    margin-left: ${(props) => typeof props.position === 'string' ? props.position : `${props.position}px`};
    width: ${(props) => props.width}px;
`;

export const TimeSpan = styled.div<TimeSpanProps>`
    background-color: ${(props) => props.ongoing ? props.theme.palette.white['100'].value : props.theme.palette.gray['30'].value};
    height: 11px;
    border-radius: 2px;
`;
export const ProjectRole = styled.p`
    font-weight: ${(props) => props.theme.typography['10 semi'].fontWeight};
    font-size: ${(props) => props.theme.typography['10 semi'].fontSize.value}px;
    margin: 7px 0 0;
    color: ${(props) => props.theme.palette.white['100'].value};
    height: 11.5px;
    overflow: hidden;
`;
