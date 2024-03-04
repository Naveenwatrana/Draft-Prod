import { FILE_SIZE_ONE_MB, SUPPORTED_FORMATS } from 'common/constants';
import lang from 'common/lang';
import * as yup from 'yup';
import React from 'react';
import { ICreateJobValues } from '../../types';

const { onBoarding: { image } } = lang;

export type CreateJobSnapshotType = {
    totalSteps: number;
    currentStep: number;
    goBack: () => void;
    showStepper: boolean;
    submit: (e: ICreateJobValues) => void;
    cancel: () => void;
    setValues: React.Dispatch<React.SetStateAction<ICreateJobValues>>;
    values: ICreateJobValues;
    next: (e: number) => void;
    backToEdit: () => void;
    isMobileView?: boolean;
    isEdit?: boolean;
};

export type ICreateJobSpanshotValues = {
    role: string;
    location: string;
    locationType: string;
    jobType: string;
    salaryFrom: number | null;
    salaryTo: number | null;
    description: string;
};

export const createJobSpanshotSchema = yup.object().shape({
  description: yup.string(),
  snapShotPicture: yup
    .mixed()
    .test('fileSize', image.imageError, (file) => file ? file?.file?.size <= FILE_SIZE_ONE_MB : true)
    .test('fileType', image.imageError, (file) => file ? SUPPORTED_FORMATS.includes(file?.file?.type) : true),
});
