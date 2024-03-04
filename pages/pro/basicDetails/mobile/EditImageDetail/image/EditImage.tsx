import { useState } from 'react';
import ImageTitle from 'pages/pro/basicDetails/common/imageTitle';
import { EditImageProps } from 'pages/pro/basicDetails/mobile/EditImageDetail/image/types';
import PreviewImage from 'pages/pro/basicDetails/mobile/EditImageDetail/previewImage';
import ImageInput from 'pages/pro/basicDetails/mobile/EditImageDetail/image/imageInput';
import { FormHeader } from '../styles';
import { UploadWrapper } from '../previewImage/styles';

const EditImage = ({
  mantra,
  fullName,
  labelText,
  labelBrowse,
  info,
  error,
  id,
  type,
  control,
  setValue,
  trigger,
  editPicture,
  editPictureImgUrl,
  setEditPictureImgUrl,
  editPictureName,
  setEditPictureName,
}: EditImageProps) => {
  const [picture, setPicture] = useState(editPictureImgUrl || editPicture);

  const removePicture = () => {
    setPicture('');
    setEditPictureName('');
    setValue('image', '');
    trigger('image');
    if (picture === editPictureImgUrl) {
      setEditPictureImgUrl('');
    }
  };
  return picture ? (
    <>
      <PreviewImage
        image={picture}
        mantra={mantra}
        fullName={fullName}
      />
      <ImageTitle fileName={editPictureName} removeImage={removePicture} />
    </>
  ) : (
    <UploadWrapper>
      <FormHeader component="p">
        {fullName}
      </FormHeader>
      <ImageInput
        picture={picture}
        removePicture={removePicture}
        setPicture={setPicture}
        labelText={labelText}
        labelBrowse={labelBrowse}
        info={info}
        error={error}
        id={id}
        type={type}
        control={control}
        setValue={setValue}
        trigger={trigger}
        editPictureName={editPictureName}
        setEditPictureName={setEditPictureName}
      />
    </UploadWrapper>
  );
};

export default EditImage;
