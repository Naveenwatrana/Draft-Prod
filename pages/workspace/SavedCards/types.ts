import { PINS_TYPES } from 'common/types';
import { ApiCard } from 'pages/article/create/types';

export type IPinnedItem = {
    id: number;
    saver_type: PINS_TYPES;
    savable_id: number;
    author: string;
    created_at: string;
    cards: ApiCard[];
    savable: any;
    savable_type: string;
    saver_id: number;
    updated_at: string;
};

export type SavedCardProps = {
    data: IPinnedItem;
};

export enum SAVABLE_TYPE {
    USER = 'App\\Models\\User',
    ARTICLE = 'App\\Models\\Article',
    JOB = 'App\\Models\\Job',
    COMPANY = 'App\\Models\\Company',
    POSTS = 'App\\Models\\Post',
    LINKS = 'App\\Models\\SharedLink',
}
