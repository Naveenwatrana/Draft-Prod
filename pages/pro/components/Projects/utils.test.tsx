import { IProjectsPayload, IProjectValues } from 'pages/pro/components/Projects/types';
import { formatProjectData, formatProjectPayload } from 'pages/pro/components/Projects/util';

describe('Projects utility', () => {
  it('should format data to project payload', () => {
    const payload: IProjectValues = {
      title: 'My first project assignment',
      description: 'project description',
      startDate: '2022-11-12',
      endDate: '2022-12-04',
      ongoing: false,
      id: 2,
      skills: [],
    };
    const output = {
      project_or_company: 'My first project assignment',
      description: 'project description',
      start_date: '11-12-2022',
      end_date: '12-04-2022',
      ongoing: 0,
      tag_ids: [],
    };
    const formatted = formatProjectPayload(payload);
    expect(formatted).toStrictEqual(output);
  });
  it('should format data to project payload with ongoing project', () => {
    const payload: IProjectValues = {
      title: 'My first project assignment',
      description: 'project description',
      startDate: '2022-11-12',
      endDate: '2022-12-04',
      ongoing: true,
      skills: [],
    };
    const output = {
      project_or_company: 'My first project assignment',
      description: 'project description',
      start_date: '11-12-2022',
      ongoing: 1,
      tag_ids: [],
    };
    const formatted = formatProjectPayload(payload);
    expect(formatted).toStrictEqual(output);
  });
});
describe('Format Project Data', () => {
  it('should format the data from the API', () => {
    const payload: IProjectsPayload = {
      id: 10,
      show_on_timeline: false,
      created_at: '11-12-2022',
      updated_at: '11-12-2022',
      project_or_company: 'My first project assignment',
      description: 'project description',
      start_date: '11-12-2022',
      ongoing: true,
      user_id: 10,
      tags: [],
    };
    const output = {
      title: 'My first project assignment',
      description: 'project description',
      startDate: '11-12-2022',
      ongoing: true,
      id: 10,
      endDate: '',
      savedImages: undefined,
      skills: [],
    };
    const formatted = formatProjectData(payload);
    expect(formatted).toStrictEqual(output);
  });
});
