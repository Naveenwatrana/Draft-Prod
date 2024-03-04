import { ImageTitleWrapper } from 'components/ImageUpload/styles';
import ImageTitle from 'pages/pro/onboarding/common/imageTitle';
import lang from 'common/lang';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { useAppDispatch } from 'common/hooks/state';
import { initiateRemoveCard, updateCardFields } from 'components/CardCreationWizard/slice';
import { useState } from 'react';
import SpecificationsModal from 'components/SpecificationModal';
import { InputType } from 'components/inputComp/types';
import { Divider } from 'components/DiscardModal/styles';
import { getFileName } from 'common/utils/image';
import { FieldGroup } from '../styles';
import DeleteButtonElement from '../DeleteButton';
import AddLinkButton from '../AddLinkButton';
import { FormProps } from './types';
import { DeleteButtonElementWrapper, FieldGroupWrapper, InputWrapper } from './styles';
import MediaLabel from '../MediaLabel';

const { onBoarding: { image } } = lang;
const { image: imageText, linkCard } = lang.cardCreationWizard;
const { deleteLink, deleteCards } = lang.cards;
const {
  linkFieldTitleLabel, linkText, linkFieldTitlePlaceholder, linkFieldUrlPlaceholder, linkFieldUrlLabel,
} = linkCard;

const Form = ({
  fields,
  removeMedia,
  onUploadMedia,
  errors,
  withMedia,
  updateValue,
  selectedCard,
}: FormProps) => {
  const dispatch = useAppDispatch();
  const append = () => {
    const newLinks = [...fields.links, { name: '', url: '' }];
    updateValue('links', newLinks);
    dispatch(updateCardFields({ id: selectedCard.id, field: 'links', value: [...fields.links, { name: '', url: '' }] }));
  };
  const remove = (id: number) => {
    const newLinks = fields.links.filter((k, index) => index !== id);
    updateValue('links', [...newLinks]);
    dispatch(updateCardFields({ id: selectedCard.id, field: 'links', value: [...newLinks] }));
  };
  const deleteCard = () => {
    dispatch(initiateRemoveCard(selectedCard.id));
  };
  const updateField = (val: string, allItems: any[], id: number, fld: string) => {
    const newLinks = allItems.map((k) => ({ ...k }));
    newLinks[id][fld] = val;
    dispatch(updateCardFields({ id: selectedCard.id, field: 'links', value: [...newLinks] }));
    updateValue('links', [...newLinks]);
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  return (
    <div>
      <SpecificationsModal
        isOpen={modalIsOpen}
        closeModal={() => setIsOpen(false)}
        cancel={() => setIsOpen(false)}
      />
      {fields?.links?.map((field: any, index: number) => {
        return (
          <FieldGroupWrapper key={field.id}>
            <InputWrapper
              labelText={`${linkText} ${index + 1} ${linkFieldTitleLabel}`}
              id="name"
              type={InputType.TEXT}
              placeholder={linkFieldTitlePlaceholder}
              value={field.name}
              onChange={(e) => updateField(e.target.value, fields?.links, index, 'name')}
            />
            <InputWrapper
              labelText={`${linkText} ${index + 1} ${linkFieldUrlLabel}`}
              id="url"
              type={InputType.TEXT}
              placeholder={linkFieldUrlPlaceholder}
              value={field.url}
              onChange={(e) => updateField(e.target.value, fields?.links, index, 'url')}
            />

            {/* {errors[`hobbies[${index}].name`] && <span>This field is required</span>} */}
            {index > 0 && <DeleteButtonElementWrapper deleteCard={() => remove(index)} text={deleteLink} />}

          </FieldGroupWrapper>
        );
      })}
      {fields?.links?.length < 6 && <AddLinkButton addLink={append} />}
      <Divider />
      <FieldGroup>
        {withMedia && fields.media && (
          <>
            <MediaLabel onClick={() => setIsOpen(true)} />
            <ImageTitleWrapper height="50px">
              <ImageTitle fileName={getFileName(fields.media)} removeImage={removeMedia} />
            </ImageTitleWrapper>
          </>
        )}
        {withMedia && !fields.media && (
          <>
            <MediaLabel onClick={() => setIsOpen(true)} />
            <ImageUpload
              labelText={image.imageInputLabel}
              info={imageText.imageInputInfo}
              onDrop={onUploadMedia}
              height="195px"
              error={!!errors.media?.message}
              errorMessage={errors.media?.message}
              data-cy="imageUpload"
            />
          </>
        )}
        <DeleteButtonElement deleteCard={deleteCard} text={deleteCards} />
      </FieldGroup>
    </div>
  );
};

export default Form;
