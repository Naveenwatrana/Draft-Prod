import { IconProps } from './types';

const FollowUserIcon = ({ active, ...rest }: IconProps) => {
  return active ? (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...rest}>
      <path
        d="M11.1883 13.2038C14.5182 13.2038 17.2175 10.5045 17.2175 7.17467C17.2175 3.84486 14.5182 1.14551 11.1883 1.14551C7.85853 1.14551 5.15918 3.84486 5.15918 7.17467C5.15918 10.5045 7.85853 13.2038 11.1883 13.2038Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1588 15.6487C11.8072 15.6128 11.4532 15.5947 11.0981 15.5947C9.35602 15.5947 7.64158 16.03 6.11047 16.8609C4.57937 17.6918 3.28013 18.8921 2.33077 20.3528C2.23085 20.5065 2.22309 20.7026 2.31055 20.8637C2.398 21.0249 2.56665 21.1252 2.75 21.1252H13.605C13.3219 20.8196 13.0701 20.4846 12.8546 20.1252H3.72868C4.51213 19.151 5.4831 18.3391 6.58746 17.7398C7.97214 16.9883 9.52262 16.5947 11.0981 16.5947C11.4041 16.5947 11.7093 16.6096 12.0124 16.639C12.034 16.3006 12.0836 15.9697 12.1588 15.6487Z"
        fill="white"
      />
      <path d="M18 19.4111L20.3709 17.1369L18.2334 15.0002" stroke="white" />
      <path d="M17.3711 17L15.0002 19.2743L17.1377 21.411" stroke="white" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...rest}>
      <path
        d="M11.1883 13.2038C14.5182 13.2038 17.2175 10.5045 17.2175 7.17467C17.2175 3.84486 14.5182 1.14551 11.1883 1.14551C7.85853 1.14551 5.15918 3.84486 5.15918 7.17467C5.15918 10.5045 7.85853 13.2038 11.1883 13.2038Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1588 15.6487C11.8072 15.6128 11.4532 15.5947 11.0981 15.5947C9.35602 15.5947 7.64158 16.03 6.11047 16.8609C4.57937 17.6918 3.28013 18.8921 2.33077 20.3528C2.23085 20.5065 2.22309 20.7026 2.31055 20.8637C2.398 21.0249 2.56665 21.1252 2.75 21.1252H13.605C13.3219 20.8196 13.0701 20.4846 12.8546 20.1252H3.72868C4.51213 19.151 5.4831 18.3391 6.58746 17.7398C7.97214 16.9883 9.52262 16.5947 11.0981 16.5947C11.4041 16.5947 11.7093 16.6096 12.0124 16.639C12.034 16.3006 12.0836 15.9697 12.1588 15.6487Z"
        fill="white"
      />
      <path d="M14 17.1291L16.2743 19.5L20.7743 15" stroke="white" />
    </svg>
  );
};

export default FollowUserIcon;