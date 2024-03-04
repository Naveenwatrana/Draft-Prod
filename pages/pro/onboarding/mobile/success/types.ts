export type SuccessProps = {
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  onBoardingData: {
    fullName?: string;
    mantra?: string;
    image?: string;
    bio?: string;
    project?: any;
  };
};
