export type ApplicationCardType = {
    companyName?: string;
    role?: string;
    location?: string;
    jobType?: string;
    locationType?: string;
    salaryFrom?: number | null;
    salaryTo?: number | null;
    onViewJobDetails?: () => void;
};

export type ApplicationDetailsCardType = {
    companyName?: string;
    onViewJobDetails?: () => void;
    text?: string;
};
