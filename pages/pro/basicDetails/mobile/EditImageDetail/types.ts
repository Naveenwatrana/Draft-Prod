export type ImageStepProps = {
  fullName: string;
};

export type IAddImageFormValues = {
  image: File | string;
  mantra: string;
};

export type IStepConfig = {
  content: JSX.Element;
  primaryButton: JSX.Element;
  secondaryButton: JSX.Element;
  headerText: JSX.Element;
}
