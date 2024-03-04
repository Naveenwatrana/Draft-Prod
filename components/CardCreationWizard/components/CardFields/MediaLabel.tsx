import lang from 'common/lang';
import { FileSpecificationsButton } from 'components/Atoms/FileSpecifications';
import FlexBox from 'components/Atoms/Flexbox';
import TextComp from 'components/textComp';
import styled from 'styled-components';

type MediaLabelProps = {
  onClick?: () => void;
  label?: string;
};

const Label = styled(TextComp)`
    margin-bottom: 4px;
    font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
`;
const { addMedia } = lang.cardCreationWizard;
const { fileSpecification } = lang.image;
const MediaLabel = ({ onClick, label }: MediaLabelProps) => (
  <FlexBox justify="space-between">
    <Label>{label || addMedia}</Label>
    <FileSpecificationsButton type="button" onClick={onClick}>{fileSpecification}</FileSpecificationsButton>
  </FlexBox>
);

export default MediaLabel;
