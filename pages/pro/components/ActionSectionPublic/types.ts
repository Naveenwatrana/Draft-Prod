import { IInteractionItemTypes } from 'common/services/Aladdin/types';

export type ActionSectionPublicProps = {
    user: any;
    setSkip: () => void;
    profileType: IInteractionItemTypes;
};

export type FilterPopupProps = {
  onClose: () => void;
  open: boolean;
  filtersToRender : JSX.Element[];
};
