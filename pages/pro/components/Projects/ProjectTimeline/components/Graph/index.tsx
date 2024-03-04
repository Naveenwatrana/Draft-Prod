import {
  useCallback,
  useEffect, useRef, useState, useMemo,
} from 'react';
import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import ProjectBar from 'pages/pro/components/Projects/ProjectTimeline/components/ProjectBar';
import { calculateGridSize, getGridSizeGap, generateGraph } from 'pages/pro/components/Projects/ProjectTimeline/components/Graph/util';
import {
  Content, MoreButton, Row, TimelineView, TimeSpan,
} from 'pages/pro/components/Projects/ProjectTimeline/components/Graph/styles';
import { GraphProps } from 'pages/pro/components/Projects/ProjectTimeline/components/Graph/types';
import useGraph from 'pages/pro/components/Projects/ProjectTimeline/components/Graph/useGraph';
import GraphGrid from 'pages/pro/components/Projects/ProjectTimeline/components/GraphGrid';

const projectColumnWidth = 240;
const { projects: projectsLang } = lang;

const Graph = ({ projects }: GraphProps) => {
  const [lineGap, setLineGap] = useState<number>(0);
  const graph = useRef<HTMLDivElement>(null);
  const [miniTimeline, setMiniTimeline] = useState<boolean>(true);

  const {
    timelineStartDate,
    totalYears,
    timelineProjects,
    numberOfLines,
    isMoreButtonVisible,
  } = useGraph(projects, miniTimeline);

  useEffect(() => {
    if (graph.current) {
      setLineGap(graph.current.clientWidth - projectColumnWidth);
    }
  }, [graph.current?.clientWidth]);

  const gridGap = useMemo(() => getGridSizeGap(totalYears), [totalYears]);
  const gridSize = useMemo(() => Math.trunc(totalYears / gridGap), [totalYears]);
  const gridLines = useMemo(() => Math.trunc(calculateGridSize(numberOfLines)), [numberOfLines]);

  const getProjectTitle = useCallback((title: string) => title.length > 14 ? `${title.substring(0, 15)}...` : title, []);

  const lineWidth = useMemo(() => Math.round(lineGap / gridSize), [lineGap, gridSize]);

  const graphGrid = useMemo(() => generateGraph(gridLines, graph.current?.clientWidth), [gridLines, graph.current?.clientWidth]);

  const moreButtonText = miniTimeline ? `${projectsLang.more}(${isMoreButtonVisible})` : projectsLang.less;
  return (
    <TimelineView ref={graph} miniTimeline={miniTimeline}>
      <GraphGrid items={graphGrid.items} lines={graphGrid.lines} miniTimeline={miniTimeline} />
      <Content>
        {timelineProjects?.map((userProject) => (
          <Row key={userProject.id}>
            <TimeSpan data-cy="project-timeline-title">
              {getProjectTitle(userProject.title)}
            </TimeSpan>
            <ProjectBar project={userProject} lineWidth={lineWidth} timeLine={timelineStartDate} gridGap={gridGap} />
          </Row>
        ))}
        {!!isMoreButtonVisible && (
          <ButtonComp
            variant="link"
            data-cy="moreOrLessGraph"
            onClick={() => setMiniTimeline(!miniTimeline)}
            label={(
              <MoreButton>
                {moreButtonText}
              </MoreButton>
            )}
          />
        )}
      </Content>
    </TimelineView>
  );
};

export default Graph;
