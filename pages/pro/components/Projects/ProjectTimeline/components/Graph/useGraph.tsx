import { dateFormatYMD } from 'common/constants';
import { formatDate } from 'common/utils/date/dateFormat';
import { IProjectsPayload } from 'pages/pro/components/Projects/types';
import { formatProjectData } from 'pages/pro/components/Projects/util';
import { useMemo } from 'react';
import { calculateYears } from 'pages/pro/components/Projects/ProjectTimeline/components/Graph/util';

const miniTimelineProjectsLength = 3;
const monthsInYear = 12;

const useGraph = (projects: IProjectsPayload[], miniTimeline: boolean) => {
  const allProjects = useMemo(() => projects?.map((project) => formatProjectData(project)) || [], [projects]);

  const timelineProjects = miniTimeline ? allProjects.filter((project, index) => index < miniTimelineProjectsLength) : allProjects;

  const totalYears = calculateYears(
    timelineProjects.map(({ ongoing, startDate }) => !ongoing ? startDate : formatDate(`${new Date()}`, dateFormatYMD)),
  );

  const timelineStartDates = timelineProjects.map(({ startDate }) => startDate).sort();

  const numberOfLines = useMemo(() => Math.round(totalYears / monthsInYear), [totalYears]);

  const isMoreButtonVisible = useMemo(
    () => allProjects.length > miniTimelineProjectsLength ? allProjects.length - miniTimelineProjectsLength : 0,
    [projects],
  );

  return {
    timelineStartDate: timelineStartDates[0],
    numberOfLines,
    isMoreButtonVisible,
    totalYears,
    timelineProjects,
  };
};

export default useGraph;
