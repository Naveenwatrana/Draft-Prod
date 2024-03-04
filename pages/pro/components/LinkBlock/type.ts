export type LinkBlockProps = {
  data: LinkBlockData;
  setEditBlock: (e: boolean) => void;
  editOnClick?: boolean
  width: number | undefined;
  height: number | undefined;
};

export type LinkBlockData = {
  media?: string;
  linkTitle?: string;
  description?: string;
  title?: string;
  url?: string;
  domain?: string;
  id?: number;
  sort?: number;
  moreText?: string;
  button?: string;
};
