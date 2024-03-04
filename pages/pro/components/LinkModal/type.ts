import { IImage } from 'components/ImageUpload/types';
import { LinkBlockData } from '../LinkBlock/type';

export type LinkModalProps = {
  closeModal: () => void;
  onSubmit: (data: LinkBlockData) => void;
};

export type EditLinkModalProps = {
  closeModal: () => void;
  setSkip: () => void;
  editBlockValue?: LinkBlockData
}

export type AddLinkValues = {
  title: string;
  url: string;
  image: string;
  linkTitle: string;
};

export type EditLinkValues = {
  media: IImage | null | string | undefined;
  editDescription: string ;
  editLinkTitle1: string;
  editUrl: string;
  domain?: string;
  editBtnText: string;
}
