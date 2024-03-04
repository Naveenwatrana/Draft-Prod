import { useProjectsQuery } from 'pages/pro/profileService';
import lang from 'common/lang';
import Graph from 'pages/pro/components/Projects/ProjectTimeline/components/Graph';

import { Title, Box } from 'pages/pro/styles';
import { Container } from 'pages/pro/components/Projects/ProjectTimeline/styles';
import TextComp from 'components/textComp';

const { projects } = lang;

const ProjectTimeline = () => {
  const { data, isLoading } = useProjectsQuery('');
  if (isLoading || data?.data?.length <= 0) {
    return null;
  }
  return (
    <Container>
      <Box>
        <TextComp component="h5">
          <Title>{projects.timeline}</Title>
        </TextComp>
        {/* EDIT FUNCTIONALITY NOT READY YET - WILL BE REQUIRED IN FUTURE
        <ButtonComp
          variant="link"
          label={(
            <Box>
              <PencilIcon width={12} />
              <EditIcon>{projects.editTimeline}</EditIcon>
            </Box>
          )}
        /> */}
      </Box>
      <Graph data-testid="projectTimelineGraph" projects={data?.data} />
    </Container>
  );
};

export default ProjectTimeline;
