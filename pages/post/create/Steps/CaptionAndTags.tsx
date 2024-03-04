import React from 'react';
import useAddPost from 'common/hooks/useAddPost';
import {
  Container,
} from './style';
import { CaptionAndTagsProps } from './type';
import PreviewCard from './PreviewCard';
import Inputs from './Inputs';
import PreviewContainer from './PreviewContainer';
import { ICreatePost } from '../type';

const CaptionAndTags = ({
  register, values, onInputChange,
}: CaptionAndTagsProps) => {
  const {
    currentImage,
    handleEditImage,
    files,
    setCurrentImage,
    openModal,
    modalOpen,
    editImage,
    handleFileUpload,
    handleFileEditing,
    handleImageCropping,
    handleImageDelete,
    reOrderFiles,
    closeModal,
  } = useAddPost(values as ICreatePost, onInputChange);
  return (
    <Container>
      <PreviewContainer
        files={files}
        changeSelectedFile={setCurrentImage}
        openModal={openModal}
        reOrderFiles={reOrderFiles}
      />
      <PreviewCard
        fileEditing={editImage}
        file={currentImage}
        onFileEditing={handleFileEditing}
        onFileCropping={handleImageCropping}
        onEditFile={handleEditImage}
        modalOpen={modalOpen}
        onInputChange={onInputChange}
        onImageDelete={handleImageDelete}
        onFileUpload={handleFileUpload}
        closeModal={closeModal}
      />
      <Inputs register={register} values={values} onInputChange={onInputChange} />
    </Container>
  );
};

export default CaptionAndTags;
