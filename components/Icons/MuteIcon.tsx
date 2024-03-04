import { theme } from 'common/theme';
import styled from 'styled-components';
import { IconProps } from './types';

const Wrapper = styled.button<{ active?: boolean }>`
    padding: 6px;
    border-radius: 8px;
    display: flex;
    border: 1px solid ${(props) => props.theme.palette.gray['40'].value};
    background-color: ${(props) => props.active ? props.theme.palette.gray['40'].value : 'transparent'};
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.palette.gray['40'].value};
    }
`;

const MuteIcon = ({
  color = 'white', size = 12, active, onClick,
}: IconProps) => {
  const iconColor = active ? theme.palette.green['100'].value : color;
  return (
    <Wrapper
      active={active}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick && onClick();
      }}
    >
      <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        {!active && (
          <>
            <g clipPath="url(#clip0_9265_63252)">
              <path d="M3.50562 4.49995H1.75562C1.5567 4.49995 1.36594 4.57897 1.22529 4.71962C1.08463 4.86027 1.00562 5.05104 1.00562 5.24995V6.74995C1.00562 6.94886 1.08463 7.13963 1.22529 7.28028C1.36594 7.42093 1.5567 7.49995 1.75562 7.49995H3.50562L6.57912 10.573C6.61408 10.6078 6.65857 10.6315 6.707 10.6411C6.75542 10.6507 6.8056 10.6458 6.85121 10.6269C6.89683 10.608 6.93583 10.5761 6.96331 10.5351C6.99079 10.494 7.00551 10.4458 7.00562 10.3965V1.60345C7.00551 1.55409 6.99079 1.50586 6.96331 1.46485C6.93583 1.42384 6.89683 1.39188 6.85121 1.373C6.8056 1.35413 6.75542 1.34918 6.707 1.35878C6.65857 1.36838 6.61408 1.3921 6.57912 1.42695L3.50562 4.49995Z" fill="#F7F7F7" stroke="#F7F7F7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.50562 3C9.96823 3.35144 10.3433 3.8051 10.6015 4.32552C10.8597 4.84595 10.9941 5.41904 10.9941 6C10.9941 6.58096 10.8597 7.15405 10.6015 7.67448C10.3433 8.1949 9.96823 8.64856 9.50562 9" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.50562 4.25C9.84462 5.2235 9.84012 6.78 8.50562 7.75" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_9265_63252">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </>
        )}
        {active && (
          <>
            <g clipPath="url(#clip0_9265_63286)">
              <path fill={theme.palette.gray['40'].value} d="M3.50562 4.49995H1.75562C1.5567 4.49995 1.36594 4.57897 1.22529 4.71962C1.08463 4.86027 1.00562 5.05104 1.00562 5.24995V6.74995C1.00562 6.94886 1.08463 7.13963 1.22529 7.28028C1.36594 7.42093 1.5567 7.49995 1.75562 7.49995H3.50562L6.57912 10.573C6.61408 10.6078 6.65857 10.6315 6.707 10.6411C6.75542 10.6507 6.8056 10.6458 6.85121 10.6269C6.89683 10.608 6.93583 10.5761 6.96331 10.5351C6.99079 10.494 7.00551 10.4458 7.00562 10.3965V1.60345C7.00551 1.55409 6.99079 1.50586 6.96331 1.46485C6.93583 1.42384 6.89683 1.39188 6.85121 1.373C6.8056 1.35413 6.75542 1.34918 6.707 1.35878C6.65857 1.36838 6.61408 1.3921 6.57912 1.42695L3.50562 4.49995Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="11.389" y1="4.91422" x2="8.91408" y2="7.3891" stroke="white" />
              <line x1="8.9141" y1="4.56063" x2="11.389" y2="7.0355" stroke="white" />
            </g>
            <defs>
              <clipPath id="clip0_9265_63286">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </>
        )}
      </svg>
    </Wrapper>

  );
};

export default MuteIcon;
