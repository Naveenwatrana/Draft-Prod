/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import lang from 'common/lang';
import { ToastContainer } from 'react-toastify';
import Loader from 'components/Loader/Loader';
import Filters from 'components/Atoms/Filters';
import TextComp from 'components/textComp';
import Divider from 'components/Divider/Divider';
import useResume from 'common/hooks/useResume';
import { useIsMobile } from 'common/hooks/useIsMobile';
import { Container } from '../styles';
import { ResumeFiltersContainer } from './style';
import { ResumeTabProps } from './types';
import FilterPopUp from '../components/ActionSection/FilterPopUp';
import ResumeContent from '../resume/ResumeContent';

const {
  profile: {
    filterSkills,
  },
} = lang;

const ResumeTab = ({
  closeFilterPopup, openFilter, data: initialData, ownProfile,
}: ResumeTabProps) => {
  const isMobile = useIsMobile();
  const [skip] = useState(true);
  const {
    educationData,
    projectsData,
    workExperienceData,
    isFetching,
    isLoading,
    filters,
    resumeData,
    handleActive,
    clearFilters,
  } = useResume(initialData, skip);
  useEffect(() => {
    return () => {
      clearFilters();
    };
  }, [clearFilters]);
  const filtersToRender = useMemo(() => {
    return Object?.keys(resumeData?.skills || {}).filter((key) => resumeData?.skills[key]?.[0])?.map((key) => {
      const filtersToShow = resumeData?.skills[key];
      return (
        <div key={key}>
          <TextComp component="h6">{key}</TextComp>
          <Filters
            onActive={handleActive}
            activeColor="#54ABAC" // TODO: Add Color
            key={filtersToShow?.[0]}
            filters={filtersToShow?.map((filterToShow: string) => {
              return {
                label: filterToShow,
                filter: filterToShow,
                active: filters?.indexOf(filterToShow) > -1,
              };
            })}
          />
          <Divider />
        </div>
      );
    });
  }, [filters, handleActive, resumeData?.skills]);
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {(isLoading || isFetching) && <Loader />}
      <Container>
        {!isMobile
          ? (
            <ResumeFiltersContainer>
              <TextComp component="h3">{filterSkills}</TextComp>
              {filtersToRender}
            </ResumeFiltersContainer>
          ) : <FilterPopUp onClose={closeFilterPopup} open={openFilter} filtersToRender={filtersToRender} />}
        <ResumeContent
          resumeData={resumeData}
          ownProfile={ownProfile}
          workExperienceData={workExperienceData}
          projectsData={projectsData}
          educationData={educationData}
          isLoading={isLoading}
          setSkip={() => undefined}
        />
      </Container>
    </>
  );
};

export default ResumeTab;
