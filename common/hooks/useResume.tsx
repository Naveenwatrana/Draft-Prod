import { IEducation } from 'pages/pro/components/Education/types';
import { ISideProjectData } from 'pages/pro/components/Projects/SideProject/Edit/types';
import { CommonResumeDataType } from 'pages/pro/Tabs/types';
import { IExperienceData } from 'pages/pro/components/WorkExperience/type';
import { IProfileData } from 'pages/pro/types';
import { useResumeQuery } from 'pages/pro/profileService';
import { selectCurrentUser } from 'pages/account/authSlice';
import { useCallback, useMemo } from 'react';
import { getFilters, setFilters } from 'pages/pro/profileSlice';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import { useAppDispatch, useAppSelector } from './state';

export default function useResume(initialData: IProfileData, skippable = true) {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: APIData, isLoading, isFetching } = useResumeQuery(currentUser?.username, { skip: skippable });

  const resumeData = useMemo(() => APIData?.data || initialData, [APIData, initialData]);

  const filters: string[] = useAppSelector(getFilters);
  const { saveInteraction } = useAladdinInteraction();

  const dispatch = useAppDispatch();

  const filterByAnd = useCallback((data: CommonResumeDataType) => {
    return filters.every((filter) => data?.tags?.some((tag) => tag.tag === filter)) || filters?.length === 0;
  }, [filters]);

  const filterByOr = useCallback((data: CommonResumeDataType) => {
    return filters.some((filter) => data?.tags?.some((tag) => tag.tag === filter)) || filters?.length === 0;
  }, [filters]);

  const filterData = useCallback((data: CommonResumeDataType[]) => {
    return data
      ?.filter((entry) => filterByOr(entry))
      ?.map((entry) => {
        return {
          ...entry,
          tags: entry.tags?.map((tag) => {
            return {
              ...tag,
              selected: filters.includes(tag.tag),
            };
          }),
        };
      });
  }, [filters, filterByOr]);

  const projectsData: ISideProjectData[] = useMemo(
    () => resumeData?.side_projects
      ? filterData(Object.keys(resumeData.side_projects)
        .map((data) => resumeData.side_projects[data])) as ISideProjectData[]
      : [],
    [resumeData?.side_projects, filterData],
  );
  const workExperienceData: IExperienceData[] = useMemo(
    () => resumeData?.experience?.length
      ? filterData(resumeData?.experience?.map((experience: IExperienceData) => {
        return {
          ...experience,
          projects: filterData(experience.projects || []),
        };
      })) as IExperienceData[]
      : [],
    [resumeData?.experience, filterData],
  );
  const educationData: IEducation[] = useMemo(
    () => resumeData?.education?.length ? filterData(resumeData?.education) as IEducation[] : [],
    [filterData, resumeData?.education],
  );
  const handleActive = (newFilter: string) => {
    dispatch(
      setFilters(
        filters?.indexOf(newFilter) > -1
          ? filters?.filter((filter) => filter !== newFilter)
          : [...filters, newFilter],
      ),
    );

    // Aladdin interaction event
    saveInteraction({
      itemId: initialData?.id as string,
      itemType: IInteractionItemTypes.users,
      eventType: IInteractionTypes.ViewPage,
      eventValue: 3,
    });
  // Aladdin interaction event
  };
  const clearFilters = useCallback(() => dispatch(setFilters([])), [dispatch]);
  return {
    educationData,
    projectsData,
    workExperienceData,
    isFetching,
    isLoading,
    filters,
    resumeData,
    handleActive,
    clearFilters,
  };
}
