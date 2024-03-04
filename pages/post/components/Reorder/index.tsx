import ModalElement from 'components/Modal/Modal';
import React, { useState } from 'react';
import { FixButton, MobileFixButtons } from 'components/buttonComp/style';
import lang from 'common/lang';
import { StyledCard } from 'components/cards/PreviewCard/styles';
import Video from 'components/VideoPlayer';
import {
  DragDropContext, Draggable, DropResult, Droppable,
} from 'react-beautiful-dnd';
import { deepCopyArray } from 'pages/feed/util';
import { ReorderModalProps } from '../uploadMedia/type';
import { Container, MediaContainer } from './style';
const {
  buttonText: { cancel, done },
} = lang;
const ReorderModal = ({
  closeModal,
  onReorder,
  isOpen,
  media,
}: ReorderModalProps) => {
  const [orderedList, setOrderedList] = useState(media);
  const onDragComplete = (result: DropResult) => {
    if (!result.destination) return;
    const arr = deepCopyArray(orderedList);

    const removedItem = arr.splice(result.source.index, 1)[0];
    arr.splice(result.destination.index, 0, removedItem);

    setOrderedList(arr);
  };

  const handleSave = () => {
    onReorder(media.map((mediaToSet) => orderedList.findIndex((listItem) => listItem.id === mediaToSet.id)));
    closeModal();
  };

  return (
    <ModalElement isOpen={isOpen} closeModal={closeModal}>
      <MediaContainer>
        <DragDropContext onDragEnd={onDragComplete}>
          <Droppable droppableId="drag-drop-list" direction="horizontal">
            {(provided) => {
              return (
                <Container
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {orderedList.map(({ url, id, isVideo }, index) => (
                    <Draggable key={id} draggableId={url} index={index}>
                      {(providedDraggable) => (
                        <div
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                        >
                          <StyledCard
                            image={url}
                            key={id}
                            data-tooltip-id={id}
                            width={121}
                            height={195}
                            borderRadius={12}
                          >
                            {isVideo && url && (
                              <Video
                                media={url}
                                mute={true}
                                isStopped={false}
                              />
                            )}
                          </StyledCard>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Container>
              );
            }}
          </Droppable>
        </DragDropContext>
      </MediaContainer>
      <MobileFixButtons>
        <FixButton onClick={closeModal}>{cancel}</FixButton>
        <FixButton onClick={handleSave}>{done}</FixButton>
      </MobileFixButtons>
    </ModalElement>
  );
};

export default ReorderModal;
