import { IImage } from 'components/ImageUpload/types';
import { IContent } from 'pages/post/create/Steps/type';

export type UploadMediaContentProps = {
  onAdd: (image: IImage) => void;
  showFileSpecification?: boolean;
  showAspectRatioInfo?: boolean;
};

export type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export interface UploadMediaProps extends ModalProps {
  onSubmit: (file: IImage) => void;
}

export interface DiscardModalProps extends ModalProps {
  onDiscard: () => void;
  title?: string;
  subtitle?: string;
  cancel?: string;
  discard?: string;
}

export interface EditModalProps extends ModalProps {
  onCrop: () => void;
  onReorder: () => void;
  onDelete: () => void;
}

export interface ReorderModalProps extends ModalProps {
  onReorder: (order: number[]) => void;
  media: IContent[];
}
