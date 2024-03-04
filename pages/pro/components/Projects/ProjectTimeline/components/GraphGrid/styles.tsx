import styled from 'styled-components';
import { TimelineViewProps } from 'pages/pro/components/Projects/ProjectTimeline/types';

export const Legends = styled.div<TimelineViewProps>`
    width: 200px;
    height: ${(props) => props.miniTimeline ? '235px' : '100%'};
`;
export const Graph = styled.div<TimelineViewProps>`
    display: flex;
    position: absolute;
    height: ${(props) => props.miniTimeline ? '235px' : '100%'};
`;
export const Line = styled.div`
  background: ${(props) => props.theme.palette.gray['30'].value};
  width: 1px;
  height: 100%;
  margin-right: 100px;
`;
