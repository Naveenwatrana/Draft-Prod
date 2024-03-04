import { theme as themed } from 'common/theme';
import styled from 'styled-components';
import { IconProps } from './types';

const ClickableSvg = styled.svg`
  padding: 0 5px;
`;

const SaveIcon = ({
  color = '#f7f7f7', size = 20, active,
}: IconProps) => {
  const whiteColor = themed.palette.white['100'].value;
  const iconColor = active ? whiteColor : color;
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={active ? whiteColor : 'none'} d="M12.916 15.1791C12.916 15.5211 12.6959 15.6025 12.4266 15.3613L8.41605 11.7593L4.40551 15.3613C4.1362 15.6025 3.91605 15.5211 3.91605 15.1791V4.84272C3.91605 4.67781 3.91621 4.54572 3.91605 4.302V4.302C3.91505 2.75445 5.17064 1.5 6.71819 1.5H9.83392C11.5361 1.5 12.916 2.87992 12.916 4.58213V4.58213C12.916 4.74377 12.916 5.0296 12.916 5.19451V15.1791Z" stroke="#F7F7F7" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};

export default SaveIcon;
