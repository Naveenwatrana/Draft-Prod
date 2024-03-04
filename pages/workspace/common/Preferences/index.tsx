import React, { useState } from 'react';
import { useGetJobPreferencesQuery } from 'pages/jobs/jobsService';
import Loader from 'components/Loader/Loader';
import SubSidebar from '../SubSidebar';
import { Content } from './style';
import { preferencesOptions } from './const';
import { PREFERENCES_TAB, PreferencesProps } from './types';
import JobPreferences from './Job';
const Preferences = ({ jobJoiningPreferenceOptions, industryOptions }: PreferencesProps) => {
  const [selected, setSelected] = useState(PREFERENCES_TAB.JOB);
  const {
    data, isLoading,
  } = useGetJobPreferencesQuery('', {
    skip: selected !== PREFERENCES_TAB.JOB,
  });
  return (
    <Content>
      {isLoading && <Loader />}
      <SubSidebar
        items={preferencesOptions}
        selected={selected}
        onSelect={(step) => setSelected(step as PREFERENCES_TAB)}
      />
      {selected === PREFERENCES_TAB.JOB && (
        <JobPreferences
          industryOptions={industryOptions}
          jobJoiningPreferenceOptions={jobJoiningPreferenceOptions}
          jobPreferenceData={data?.data}
        />
      )}
    </Content>
  );
};

export default Preferences;
