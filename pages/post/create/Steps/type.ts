import { UseFormRegister } from 'react-hook-form';
import { ICreateArticle } from 'pages/article/components/NewArticleFlow/types';
import { IImage } from 'components/ImageUpload/types';
import { ICreatePost } from '../type';

export type CaptionAndTagsProps = {
  values: ICreatePost | ICreateArticle;
  onInputChange: (
    key: keyof ICreatePost,
    value: ICreatePost[keyof ICreatePost],
  ) => void;
  register: UseFormRegister<ICreatePost | ICreateArticle>;
};

export type IContent = {
  id: string;
  url: string;
  sourceUrl?: string;
  isVideo?: boolean;
};

export type PreviewContainerProps = {
  files: IContent[];
  changeSelectedFile: (file: IContent) => void;
  openModal: () => void;
  reOrderFiles: (order: number[]) => void;
}

export type PreviewCardProps = {
  fileEditing: boolean;
  file: IContent;
  onFileEditing: () => void;
  onFileCropping: () => void;
  closeModal?: () => void;
  onEditFile: (filepath: string) => void;
  modalOpen?: boolean;
  onImageDelete: (id: string) => void;
  onInputChange?: (
    key: keyof ICreatePost,
    value: ICreatePost[keyof ICreatePost],
  ) => void;
  onFileUpload?: (file: IImage) => void;
};
