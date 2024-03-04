import React from 'react';
import { IconProps } from './types';

export const TrashIcon = ({
  color = '#7E8D9A', size = 16, variant, ...rest
}: IconProps) => {
  if (variant === 'rounded') {
    return (
      <svg width="45" height="40" viewBox="0 0 45 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
        <g filter="url(#filter0_b_18253_2040)">
          <rect x="0.226562" width="44" height="40" rx="20" fill="#E92026" fillOpacity="0.35" />
          <g clipPath="url(#clip0_18253_2040)">
            <path d="M25.4766 16.5L24.7395 15.0259C24.3741 14.2951 23.6271 13.8334 22.8099 13.8334C21.9927 13.8334 21.2457 14.2951 20.8803 15.0259L20.1432 16.5M17.4766 16.5H28.1432M21.4766 19.8334V23.1667M24.1432 19.8334V23.1667M18.8099 16.5H26.8099V22.5C26.8099 23.7426 26.8099 24.3638 26.6069 24.8539C26.3363 25.5073 25.8171 26.0264 25.1637 26.2971C24.6737 26.5 24.0524 26.5 22.8099 26.5C21.5674 26.5 20.9461 26.5 20.4561 26.2971C19.8027 26.0264 19.2835 25.5073 19.0129 24.8539C18.8099 24.3638 18.8099 23.7426 18.8099 22.5V16.5Z" stroke="#F7F7F7" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <defs>
          <filter id="filter0_b_18253_2040" x="-29.7734" y="-30" width="104" height="100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="15" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_18253_2040" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_18253_2040" result="shape" />
          </filter>
          <clipPath id="clip0_18253_2040">
            <rect width="16" height="16" fill="white" transform="translate(14.2266 12)" />
          </clipPath>
        </defs>
      </svg>
    );
  }
  if (variant === 'small') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
        <path d="M10.666 4.49998L9.92897 3.02588C9.56352 2.295 8.8165 1.83331 7.99935 1.83331C7.18219 1.83331 6.43517 2.295 6.06973 3.02588L5.33268 4.49998M2.66602 4.49998L13.3327 4.49998M6.66601 7.83331L6.66601 11.1666M9.33268 7.83331L9.33268 11.1666M3.99935 4.49998L11.9993 4.49998L11.9993 10.5C11.9993 11.7425 11.9993 12.3637 11.7964 12.8538C11.5257 13.5072 11.0066 14.0263 10.3532 14.297C9.86311 14.5 9.24186 14.5 7.99935 14.5C6.75684 14.5 6.13558 14.5 5.64552 14.297C4.99212 14.0263 4.47299 13.5072 4.20234 12.8538C3.99935 12.3637 3.99935 11.7425 3.99935 10.5L3.99935 4.49998Z" stroke="#E92026" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width={size + 1} height={size} viewBox="0 0 16 16" fill="none" {...rest}>
      <g clipPath="url(#clip0_7953_7583)">
        <path d="M12.5394 14.9232H4.46243C4.15642 14.9232 3.86293 14.8017 3.64655 14.5853C3.43015 14.3689 3.30859 14.0754 3.30859 13.7694V3.38477H13.6932V13.7694C13.6932 14.0754 13.5716 14.3689 13.3552 14.5853C13.1388 14.8017 12.8454 14.9232 12.5394 14.9232Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.76953 11.4611V6.8457" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.2305 11.4611V6.8457" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1 3.38477H16" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.2306 1.07715H6.76907C6.46306 1.07715 6.16957 1.19872 5.95319 1.4151C5.73679 1.63149 5.61523 1.92498 5.61523 2.231V3.38484H11.3844V2.231C11.3844 1.92498 11.2629 1.63149 11.0465 1.4151C10.8301 1.19872 10.5366 1.07715 10.2306 1.07715Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_7953_7583">
          <rect width="16" height="16" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>

    </svg>
  );
};

export default TrashIcon;
