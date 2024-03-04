import { IList } from 'components/Atoms/ListItemWithLink/types';

export type IData = { type: string, value?: string, list?: IList, href?: { url: string, label: string }, value2?: string, button?: { label: string, onClick: () => void } };
