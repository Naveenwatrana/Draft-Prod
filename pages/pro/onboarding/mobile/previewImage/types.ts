export type PreviewImageProps = {
    image?: string;
    mantra?: string;
    fullName: string;
    bio?: string;
}

export type ImagePreviewProps = {
    image?: string;
    mantra?: string;
    fullName: string;
}

export type BioPreviewProps = {
    fullName: string;
    bio: string;
    setTitle : (title: string) => void;
    setSubtitle : (subtitle: string) => void;
    handleBack : (bio: string) => void;
    handleSubmit : () => void;
}

export type IProject = {
    title?: string;
    role?: string;
    startDate?: string;
    endDate?: string;
    ongoing?: boolean;
  }

export type projectPreviewProps = {
    fullName: string;
    project: IProject;
    setTitle : (title: string) => void;
    setSubtitle : (subtitle: string) => void;
    handleBack : () => void;
    handleSubmit : () => void;
}
