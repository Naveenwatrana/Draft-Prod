export const formatJobPayload = (values: any) => {
  const payload = {
    role: values.role?.name || '',
    location: { value: values.location || '', label: values.location || '' },
    locationType: values.location_type,
    jobType: values.job_type,
    salaryFrom: values.salary_from,
    salaryTo: values.salary_to,
    description: values.description || '',
    jobPicture: null,
    snapShotPicture: null,
    snapShotBackground: values.snapshot_background,
    snapshotDescription: values.snapshot || '',
    backgroundImage: values.background,
  };

  return payload;
};
