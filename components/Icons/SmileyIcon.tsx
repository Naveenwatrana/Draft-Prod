import React from 'react';
import { IconProps } from './types';

const SmileyIcon = (props: IconProps) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_13383_4621)">
        <path
          d="M5.5 14.2083C5.95243 15.2941 6.71615 16.2218 7.69491 16.8743C8.67367 17.5268 9.82364 17.875 11 17.875C12.1764 17.875 13.3263 17.5268 14.3051 16.8743C15.2839 16.2218 16.0475 15.2941 16.5 14.2083"
          stroke="white"
          strokeWidth="0.666667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 21.5416C16.8221 21.5416 21.5417 16.822 21.5417 11C21.5417 5.17798 16.8221 0.458313 11 0.458313C5.17804 0.458313 0.458374 5.17798 0.458374 11C0.458374 16.822 5.17804 21.5416 11 21.5416Z"
          stroke="white"
          strokeWidth="0.666667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.95829 9.39583C5.83173 9.39583 5.72913 9.29326 5.72913 9.16667C5.72913 9.0401 5.83173 8.9375 5.95829 8.9375"
          stroke="white"
          strokeWidth="0.666667"
        />
        <path
          d="M5.95837 9.39583C6.08494 9.39583 6.18754 9.29326 6.18754 9.16667C6.18754 9.0401 6.08494 8.9375 5.95837 8.9375"
          stroke="white"
          strokeWidth="0.666667"
        />
        <path
          d="M16.0417 9.39583C15.9151 9.39583 15.8125 9.29326 15.8125 9.16667C15.8125 9.0401 15.9151 8.9375 16.0417 8.9375"
          stroke="white"
          strokeWidth="0.666667"
        />
        <path
          d="M16.0416 9.39583C16.1682 9.39583 16.2708 9.29326 16.2708 9.16667C16.2708 9.0401 16.1682 8.9375 16.0416 8.9375"
          stroke="white"
          strokeWidth="0.666667"
        />
      </g>
      <defs>
        <clipPath id="clip0_13383_4621">
          <rect width="22" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SmileyIcon;
