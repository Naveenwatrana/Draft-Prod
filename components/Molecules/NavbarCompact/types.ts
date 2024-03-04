export type NavbarCompactProps = {
  step: number;
  onBack: () => void;
  title: string;
  stepsToRender: string[];
  isAuthor?: boolean;
  updateView?: (values: string) => void;
  view?: string;
  slug?: string;
};
