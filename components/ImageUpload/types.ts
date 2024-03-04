import { Accept } from 'react-dropzone';
import { IDeletedImages, IProjectImage } from '../../pages/pro/components/Projects/types';
import { IProjectPicture } from '../../pages/pro/types';

export type ImageUploadProps = {
    labelText: string,
    info: string,
    onDrop: (e: File[]) => void,
    onChange?: () => void,
    error?: boolean;
    height?: string;
    labelBrowse?: string;
    withHeader?: boolean;
    errorMessage?: string;
    accept?: any;
    fileSize?: React.ReactNode;
    imageOnly?: boolean;
    info1?: string;
    info2?: string;
    styles?: {
        container: {
            [key: string]: string;
        };
    };
};

export type MediaUploadProps = {
    onDrop: (e: File[]) => void,
    onChange?: () => void,
    error?: boolean;
    errorMessage?: string;
    accept?: Accept;
    showFileSpecification?: boolean;
    showAspectRatioInfo?: boolean;
}

export type ImageUploadProjectsProps = {
    labelText: string;
    info: string;
    persistedImages?: IImage[];
    updateValue: (e: IProjectPicture[], fieldName: string) => void;
    savedImages?: IProjectImage[];
    setDeletedImages: (e: IDeletedImages[]) => void;
};
export type ImageUploadInputProps = {
    error?: boolean;
    height?: string;
    withHeader?: boolean;
}
export type IImage = {
    file: File;
    id: string;
    featured?: boolean;
};
