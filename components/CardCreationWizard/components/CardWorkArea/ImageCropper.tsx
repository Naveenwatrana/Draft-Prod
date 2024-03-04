import React, {
  useState, useCallback, useRef, useMemo,
} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import { theme } from 'common/theme';
import Loader from 'components/Loader/Loader';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import { useWindowDimensions } from 'common/hooks';
import {
  CropContainer, CropControls, ImageCropperContainer, LoadingContainer, ImageCropperMainContainer, SliderContainer,
} from './styles';
import getCroppedImg from './cropImage';
import { getImageCropSize, isAkamaiImage } from './utils';

const ImageCropper = ({
  handleEditImage,
  imageUrl,
  cropImgWidth,
  cropImageHeight,
}: {
  handleEditImage: (image: string) => void;
  imageUrl: string;
  cropImgWidth?: number | undefined;
  cropImageHeight?: number | undefined;
}) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const isEdit = useMemo(() => isAkamaiImage(imageUrl as string), [imageUrl]);
  const [loadingImage] = useState(false);
  const [akamaiImage] = useState('');
  const setCroppedImage = useCallback(
    (croppedImage: string) => {
      handleEditImage(croppedImage);
    },
    [handleEditImage],
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

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
  }, [akamaiImage, imageUrl, croppedAreaPixels, isEdit, setCroppedImage]);
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
      cropAreaStyle: {
        borderRadius: (cropImageHeight || cropImgWidth ? '16px' : '8px'),
        border: '1px solid rgba(56,57,58,1)',
        background: (cropImageHeight || cropImgWidth ? 'none' : 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(18, 18, 20, 0.51) 60%, #000000 91.15%)')
        ,
      },
    }),
    [],
  );
  const cropHandleStyles = useMemo(
    () => ({
      height: 12,
      width: 12,
      marginTop: -4,
      borderColor: '#99E662', // TODO: Add Color
      backgroundColor: '#99E662', // TODO: Add Color
      opacity: 1,
      transform: 'none',
    }),
    [],
  );
  const { windowDimensions: { width, height } } = useWindowDimensions();
  const cropSize = useMemo(() => {
    if (cropImageHeight || cropImgWidth) {
      return ({ width: 400, height: 400 });
    } else {
      return getImageCropSize(width, height);
    }
  }, [width, height, cropImageHeight, cropImgWidth]);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: showCroppedImage,
  });
  const image = akamaiImage
    ? `/images/${akamaiImage}`
    : (imageUrl as string) || '';
  return (
    <ImageCropperMainContainer data-cy="cardCropper">
      <ImageCropperContainer ref={wrapperRef}>
        <CropContainer>
          {loadingImage && (
            <LoadingContainer>
              <Loader fullScreen={false} />
            </LoadingContainer>
          )}
          <Cropper
            image={image}
            crop={crop}
            cropSize={cropSize}
            zoom={zoom}
            aspect={9 / 16}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit="vertical-cover"
            showGrid={false}
            style={cropStyles}
          />
        </CropContainer>
        <CropControls>
          <SliderContainer>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(val) => setZoom(Number(val))}
              trackStyle={{
                backgroundColor: '#99E662', // TODO: Add Color
                height: 4,
              }}
              style={{
                margin: '19px 0',
              }}
              railStyle={{
                height: 4,
                background: '#39363B', // TODO: Add Color
              }}
              handleStyle={cropHandleStyles}
            />
          </SliderContainer>
        </CropControls>
      </ImageCropperContainer>
    </ImageCropperMainContainer>
  );
};

export default ImageCropper;
