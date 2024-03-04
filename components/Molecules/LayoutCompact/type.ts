export type LayoutCompactProps = {
  children: React.ReactNode;
  loading?: boolean;
  currentStep: number;
  steps: string[];
  title: string;
  onBack: () => void;
};
