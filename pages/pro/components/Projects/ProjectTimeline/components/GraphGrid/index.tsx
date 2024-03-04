import { Graph, Legends, Line } from 'pages/pro/components/Projects/ProjectTimeline/components/GraphGrid/styles';
import { GraphGridProps } from 'pages/pro/components/Projects/ProjectTimeline/components/GraphGrid/types';

const GraphGrid = ({ items, lines, miniTimeline }: GraphGridProps) => {
  return (
    <Graph miniTimeline={miniTimeline}>
      <Legends miniTimeline={miniTimeline}>&nbsp;</Legends>
      {items.map((item) => <Line key={item} style={{ marginRight: lines }} className="line" />)}
    </Graph>
  );
};

export default GraphGrid;
