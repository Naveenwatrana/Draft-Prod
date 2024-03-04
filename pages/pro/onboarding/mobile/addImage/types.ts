export type ImageStepProps = {
  fullName: string;
  nextStep : () => void;
  setTitle : (title: string) => void;
  setSubtitle : (subtitle: string) => void;
};

export type IAddImageFormValues = {
  image: File;
  mantra: string;
};

export type IStepConfig = {
  content: JSX.Element;
  primaryButton: JSX.Element;
  secondaryButton: JSX.Element;
}
