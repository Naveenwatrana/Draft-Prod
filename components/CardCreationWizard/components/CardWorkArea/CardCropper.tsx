import React, {
  useState, useCallback, useRef, useMemo,
} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import { theme } from 'common/theme';
import { useAppSelector } from 'common/hooks/state';
import { Card } from 'components/CardCreationWizard/types';
import { getCard, updateCardFields } from 'components/CardCreationWizard/slice';
import Loader from 'components/Loader/Loader';
import { useDispatch } from 'react-redux';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import {
  CropContainer, CropControls, CropperContainer, LoadingContainer, MainContainer, SliderContainer,
} from './styles';
import getCroppedImg from './cropImage';
import { isAkamaiImage } from './utils';

export type CardCropperProps = {
  selectedCard: Card;
  handleEditImage: (value: boolean) => void;
};

const CardCropper = ({ selectedCard, handleEditImage }: CardCropperProps) => {
  const card = useAppSelector<Card>(getCard(selectedCard.id));
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const dispatch = useDispatch();
  const isEdit = useMemo(() => isAkamaiImage(card.fieldValues?.media as string), [card.fieldValues?.media]);
  const [loadingImage] = useState(false);
  const [akamaiImage] = useState('');

  const setCroppedImage = useCallback((croppedImage: string) => {
    const filePayload = {
      id: selectedCard.id, field: 'croppedImage', value: croppedImage,
    };
    dispatch(updateCardFields(filePayload));
    handleEditImage(false);
  }, [
    dispatch,
    selectedCard.id,
    handleEditImage,
  ]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const showCroppedImage = useCallback(async () => {
    const rotation = 0;
    const image = isEdit ? `/images/${akamaiImage}` : card?.fieldValues?.media as string;
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
  }, [akamaiImage, card?.fieldValues?.media, croppedAreaPixels, isEdit, setCroppedImage]);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixel: Area) => {
      setCroppedAreaPixels(croppedAreaPixel);
    },
    [],
  );
  const cropStyles = useMemo(() => ({
    containerStyle: {
      background: theme.palette.gray[50].value,
    },
    cropAreaStyle: {
      borderRadius: '8px',
      border: '1px solid rgba(56,57,58,1)',
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(18, 18, 20, 0.51) 60%, #000000 91.15%)',

    },
  }), []);
  const cropHandleStyles = useMemo(() => ({
    height: 22,
    width: 22,
    marginTop: -7,
    borderColor: theme.palette.green[100].value,
    backgroundColor: theme.palette.green[100].value,
    opacity: 1,
  }), []);

  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: showCroppedImage,
  });
  const image = akamaiImage ? `/images/${akamaiImage}` : card?.fieldValues?.media as string || '';
  return (
    <MainContainer data-cy="cardCropper" ref={wrapperRef}>
      <CropperContainer>
        <CropContainer>
          {loadingImage && (
            <LoadingContainer>
              <Loader fullScreen={false} />
            </LoadingContainer>
          )}
          <Cropper
            image={image}
            crop={crop}
            cropSize={{
              width: 288,
              height: 483,
            }}
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
                backgroundColor: theme.palette.green[100].value,
                height: 8,
              }}
              style={{
                marginTop: '20px',
              }}
              railStyle={{
                height: 8,
              }}
              handleStyle={cropHandleStyles}
            />
          </SliderContainer>
        </CropControls>
      </CropperContainer>
    </MainContainer>
  );
};

export default CardCropper;
