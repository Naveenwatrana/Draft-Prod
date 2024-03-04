import { BlocksEntity } from 'pages/pro/types';

export type ICompanyProfile = {
        purpose?: string;
        id: string;
        blocks?: BlocksEntity[];
        name: string;
        bio: string;
        logo: string;
        cover: string;
        cards?: any[];
    };
export type CompanyProfileDeckProps = {
    data: ICompanyProfile,
    onCardClick?: any;
    setEditImageDetail: (value: boolean) => void;
    isOwnProfile?: boolean;
};
