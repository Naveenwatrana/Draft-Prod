import { generateGraph } from 'pages/pro/components/Projects/ProjectTimeline/components/Graph/util';

describe('generateGraph utility', () => {
  it('should return items and lines Widths', () => {
    const expectedOutput = {
      items: [0, 1, 2, 3],
      lines: 65,
    };
    const output = generateGraph(2, 500);
    expect(output).toStrictEqual(expectedOutput);
  });
});
