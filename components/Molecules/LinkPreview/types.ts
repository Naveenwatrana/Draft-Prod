export type LinkPreviewProps = {
  title: string;
  image: string;
  websiteLink?: string;
  onUploadLogo: (files: File[] | null) => void;
  error?: boolean;
  file?: string;
  removeImage: () => void;
  setTitle: (title: string) => void;
};
