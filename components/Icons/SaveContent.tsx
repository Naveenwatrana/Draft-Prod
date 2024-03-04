import { theme as themed } from 'common/theme';
import styled from 'styled-components';
import { IconProps } from './types';

const ClickableSvg = styled.svg`
  padding: 0 5px;
`;

const SaveContent = ({
  color = '#f7f7f7', size = 20, active,
}: IconProps) => {
  const whiteColor = themed.palette.white['100'].value;
  const iconColor = active ? whiteColor : color;
  return (
    <ClickableSvg data-cy={active ? 'savedContent' : 'unSavedContent'} width={size} height={size} viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.4193 18.9505C11.4193 19.4089 11.1543 19.518 10.8301 19.1947L6.0026 14.3672L1.1751 19.1947C0.850937 19.518 0.585938 19.4089 0.585938 18.9505V1.45052C0.585938 1.22951 0.673735 1.01755 0.830015 0.861265C0.986296 0.704985 1.19826 0.617188 1.41927 0.617188H10.5859C10.807 0.617188 11.0189 0.704985 11.1752 0.861265C11.3315 1.01755 11.4193 1.22951 11.4193 1.45052V18.9505Z"
        stroke={iconColor}
        fill={active ? whiteColor : 'none'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ClickableSvg>
  );
};

export default SaveContent;
