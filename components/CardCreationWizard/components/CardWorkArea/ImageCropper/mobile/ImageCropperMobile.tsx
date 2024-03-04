import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import 'rc-slider/assets/index.css';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import { theme } from 'common/theme';
import { useWindowDimensions } from 'common/hooks';
import lang from 'common/lang';
import { FixButton, MobileFixButtons } from 'components/buttonComp/style';
import getCroppedImg from '../../cropImage';
import { getImageCropSize, isAkamaiImage } from '../../utils';
import { Wrapper } from './style';
import { ImageCropperMobileProps } from './type';
const {
  buttonText: { cancel, done },
} = lang;

const akamaiImage = '';

const ImageCropperMobile = ({
  handleEditImage,
  imageUrl,
  onCancel,
}: ImageCropperMobileProps) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const isEdit = useMemo(() => isAkamaiImage(imageUrl as string), [imageUrl]);
  const setCroppedImage = useCallback(
    (croppedImage: string) => {
      handleEditImage(croppedImage);
    },
    [handleEditImage],
  );
  const showCroppedImage = useCallback(async () => {
    const rotation = 0;
    const image = isEdit ? `/images/${akamaiImage}` : (imageUrl as string);
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation,
      );
      if (croppedImage) {
        setCroppedImage(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  }, [imageUrl, croppedAreaPixels, isEdit, setCroppedImage]);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixel: Area) => {
      setCroppedAreaPixels(croppedAreaPixel);
    },
    [],
  );
  const cropStyles = useMemo(
    () => ({
      containerStyle: {
        background: theme.palette.gray[50].value,
      },
    }),
    [],
  );
  const {
    windowDimensions: { width, height },
  } = useWindowDimensions();
  const cropSize = useMemo(
    () => getImageCropSize(width, height),
    [width, height],
  );

  const image = akamaiImage
    ? `/images/${akamaiImage}`
    : (imageUrl as string) || '';

  const [imageRef, setImageRef] = useState<React.RefObject<HTMLImageElement> | null>(null);
  useEffect(() => {
    if (imageRef?.current?.height) {
      setZoom(cropSize.height / imageRef.current.height);
    }
  }, [imageRef?.current?.height]);
  const cropperProps = useMemo(() => {
    return {
      aspect: 9 / 16,
      maxZoom: 10,
      showGrid: false,
      style: cropStyles,
    };
  }, [cropStyles]);
  return (
    <Wrapper data-cy="cardCropper">
      <Cropper
        setImageRef={setImageRef}
        image={image}
        crop={crop}
        cropSize={cropSize}
        zoom={zoom}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        objectFit="horizontal-cover"
        minZoom={
          imageRef?.current?.width
            ? cropSize.height / imageRef.current.height
            : undefined
        }
        {...cropperProps}
      />
      <MobileFixButtons>
        <FixButton data-testid="ImageCropperCancelButton" onClick={onCancel}>
          {cancel}
        </FixButton>
        <FixButton data-testid="ImageCropperSubmitButton" onClick={showCroppedImage}>{done}</FixButton>
      </MobileFixButtons>
    </Wrapper>
  );
};

export default ImageCropperMobile;
