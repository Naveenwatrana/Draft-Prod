import { ColorRing } from 'react-loader-spinner';
import { LoaderWrapper } from './styles';

type LoaderProps = {
  fullScreen?: boolean;
  size?: number;
};

export const Loader = ({ fullScreen = true, size = 80 }: LoaderProps) => {
  return (
    <LoaderWrapper fullScreen={fullScreen} data-testid="loader">
      <ColorRing
        visible={true}
        height={size}
        width={size}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        colors={['#43C167', '#43C167', '#43C167', '#43C167', '#43C167']}
      />
    </LoaderWrapper>
  );
};
export default Loader;
