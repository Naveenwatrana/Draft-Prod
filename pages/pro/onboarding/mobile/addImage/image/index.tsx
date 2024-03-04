import { InputType } from 'components/input/types';
import lang from 'common/lang';
import { useState } from 'react';
import ImageTitle from 'pages/pro/onboarding/common/imageTitle';
import ImageInput from 'pages/pro/onboarding/mobile/addImage/image/imageInput';
import { AddImageProps } from 'pages/pro/onboarding/mobile/addImage/image/types';
import ImagePreview from 'pages/pro/onboarding/mobile/previewImage/imagePreview';
import { NameWrapper } from '../../styles';

const {
  onBoarding: { image },
} = lang;

const AddImage = ({
  fullName,
  control,
  error,
  setValue,
  trigger,
}: AddImageProps) => {
  const [picture, setPicture] = useState('');
  const [fileName, setFileName] = useState('');

  const removePicture = () => {
    setPicture('');
    setFileName('');
  };

  return (
    <>
      {picture && (
        <>
          <ImagePreview image={picture} fullName={fullName} mantra="" />
          <ImageTitle fileName={fileName} removeImage={removePicture} />
        </>
      )}
      {!picture && (
        <div>
          <NameWrapper component="p">
            {fullName}
          </NameWrapper>
          <ImageInput
            labelText={image.imageInputLabel}
            labelBrowse={image.imageInputBrowse}
            info={image.imageInputInfo}
            error={error}
            id="image"
            type={InputType.FILE}
            control={control}
            setValue={setValue}
            trigger={trigger}
            setPicture={setPicture}
            setFileName={setFileName}
          />
        </div>
      )}
    </>
  );
};

export default AddImage;
