import { IAddJobApiCall, IEditJobPayload } from './review/types';

export const formatPayload: IEditJobPayload = (values, jobsImagesPath, companyId) => {
  const payload = {
    ...Object.assign({}, ...jobsImagesPath),
    ...(values.description ? { description: values.description } : {}),
    ...(values.snapshotDescription
      ? { snapshot: values.snapshotDescription }
      : {}),
    role: values.role,
    location: values.location.label,
    location_type: values.locationType,
    job_type: values.jobType,
    salary_from: values.salaryFrom,
    salary_to: values.salaryTo,
    company_id: companyId,
  };
  if (values.deleteJobPicture && !values.jobPicture) {
    payload.background = null;
  }
  if (values.deleteSnapShotPicture && !values.snapShotPicture) {
    payload.snapshot_background = null;
  }
  return payload;
};

export const addJobAPICall: IAddJobApiCall = async (
  values,
  addJobAPI,
  jobsImagesPath,
  companyId,
) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = addJobAPI({
          ...Object.assign({}, ...jobsImagesPath),
          ...(values.description ? { description: values.description } : {}),
          ...(values.snapshotDescription
            ? { snapshot: values.snapshotDescription }
            : {}),
          role: values.role,
          location: values.location.label,
          location_type: values.locationType,
          job_type: values.jobType,
          salary_from: values.salaryFrom,
          salary_to: values.salaryTo,
          company_id: companyId,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    })();
  });
};
