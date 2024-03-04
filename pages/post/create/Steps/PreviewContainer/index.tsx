import React, { useEffect, useRef, useState } from 'react';
import PlusIcon from 'components/Icons/PlusIcon';
import { POSTS_MEDIA_MAX_LENGTH } from 'common/constants';
import DraggableList from 'react-draggable-list';
import { AddCardContainer, PreviewCardsContainer } from '../style';
import { PreviewContainerProps } from '../type';
import { Item } from './Item';
import { ItemProps, PreviewContainerItem } from './type';

const PreviewContainer = ({
  files,
  changeSelectedFile,
  openModal,
  reOrderFiles,
}: PreviewContainerProps) => {
  const containerRef = useRef<HTMLFormElement>(null);

  const [items, setItems] = useState<PreviewContainerItem[]>([]);
  useEffect(() => {
    setItems(
      files.map((file, index) => ({
        ...file,
        changeSelectedFile,
        index,
        showTooltip: files.length > 1,
      })),
    );
  }, [changeSelectedFile, files]);
  return (
    <PreviewCardsContainer>
      {!!files?.length && (
        <DraggableList
          itemKey="id"
          template={Item as (props: ItemProps) => JSX.Element as any /** TODO: add type */}
          list={items}
          onMoveEnd={(newList: PreviewContainerItem[] | any /** TODO: add type */) => {
            reOrderFiles(newList.map((item: { index: number; }) => item.index));
          }}
          container={() => containerRef.current}
          padding={48}
        />
      )}
      {files.length < POSTS_MEDIA_MAX_LENGTH && (
        <AddCardContainer onClick={openModal}>
          {/** TODO: Add Color */}
          <PlusIcon color="#99e662" />
        </AddCardContainer>
      )}
    </PreviewCardsContainer>
  );
};

export default PreviewContainer;
