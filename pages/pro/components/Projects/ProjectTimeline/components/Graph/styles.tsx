import styled from 'styled-components';
import { TimelineViewProps } from 'pages/pro/components/Projects/ProjectTimeline/types';

export const TimeSpan = styled.div`
    min-width: 180px;
    font-weight: ${(props) => props.theme.typography['12 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['12 semibold'].fontSize.value}px;
    color: ${(props) => props.theme.palette.white['100'].value};
`;
export const MoreButton = styled.div`
    font-weight: ${(props) => props.theme.typography['12 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['12 semibold'].fontSize.value}px;
    margin-bottom: 15px;
`;
export const TimelineView = styled.div<TimelineViewProps>`
    width: 100%;
    height: ${(props) => props.miniTimeline ? '235px' : '100%'};
    background-color: ${(props) => props.theme.palette.gray['60'].value};
    border-radius: 12px;
    position: relative;
    margin-top: 32px;
`;
export const Content = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    position: relative;
    padding-top: 30px;
`;
export const Row = styled.div`
    display: flex;
    width: calc(100% - 40px);
    align-items: center;
    padding: 0 20px;
    margin-bottom: 30px;
`;
