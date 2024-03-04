import { reorderArrayByIndex } from 'common/utils/helpers';
import { getFileFromUrl } from 'components/CardCreationWizard/components/CardFields/CoverCardFields/util';
import { IImage } from 'components/ImageUpload/types';
import { IContent } from 'pages/post/create/Steps/type';
import { ICreatePost } from 'pages/post/create/type';
import { useEffect, useState } from 'react';

const useAddPost = (values: ICreatePost, onInputChange: (key: keyof ICreatePost, value: ICreatePost[keyof ICreatePost]) => void) => {
  const [editImage, setEditImage] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState<IContent[]>([]);
  const [currentImage, setCurrentImage] = useState<IContent>({
    id: '',
    url: '',
  });
  useEffect(() => {
    if (values?.media?.[0]?.file) {
      const url = URL.createObjectURL(values?.media?.[0]?.file);
      const image = {
        url,
        id: values?.media?.[0]?.id,
        sourceUrl: url,
        isVideo: values?.media?.[0]?.file.type.includes('video'),
      };
      setFiles([image]);
      setCurrentImage(image);
    }
  }, []);
  const handleEditImage = async (img: string) => {
    const file = await getFileFromUrl(img);
    setFiles((imageToEdit) => imageToEdit.map((image) => image.id === currentImage.id ? { ...image, url: img } : image));
    onInputChange('media', values?.media.map((media) => media?.id === currentImage.id ? { ...media, file } : media));
    setCurrentImage((previous) => ({ ...previous, url: img }));
    setEditImage(false);
  };
  const handleImageDelete = (id: string) => {
    setFiles((file) => {
      const filesToUpdate = file.filter((i) => i.id !== id);
      const lastFile = filesToUpdate?.[filesToUpdate.length - 1];
      setCurrentImage(lastFile || { id: '', url: '' });
      if (!lastFile) setModalOpen(true);
      return filesToUpdate;
    });
    onInputChange('media', values?.media.filter((media) => media.id !== id));
  };
  const [editing, setIsEditing] = useState<boolean>(false);
  const closeModal = () => {
    setModalOpen(false);
    setIsEditing(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const handleFileUpload = (file: IImage) => {
    const url = URL.createObjectURL(file.file);
    const isVideo = file.file.type.includes('video');
    const fileToUpdate = {
      url,
      id: file.id,
      sourceUrl: url,
      isVideo,
    };
    setFiles((imageFiles) => editing
      ? imageFiles.map((imageFile) => imageFile.id === currentImage.id ? fileToUpdate : imageFile)
      : [...imageFiles, fileToUpdate]);
    onInputChange('media', editing
      ? values?.media.map((media) => media.id === currentImage.id ? { ...media, file: file.file } : media)
      : [...(values?.media || []), { id: fileToUpdate.id, file: file.file }]);
    setCurrentImage(fileToUpdate);
    closeModal();
  };
  const handleFileEditing = () => setIsEditing(true);
  const handleImageCropping = () => setEditImage(true);
  const reOrderFiles = (order: number[]) => {
    setFiles(reorderArrayByIndex(files, order));
    onInputChange('media', reorderArrayByIndex(values.media, order));
  };

  return {
    modalOpen: editing || modalOpen,
    currentImage,
    handleEditImage,
    files,
    setCurrentImage,
    openModal,
    closeModal,
    editImage,
    handleFileUpload,
    handleFileEditing,
    handleImageCropping,
    handleImageDelete,
    reOrderFiles,
    setEditImage,
  };
};

export default useAddPost;
