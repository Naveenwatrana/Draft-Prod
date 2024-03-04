import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer } from 'react-toastify';
import Divider from 'components/Divider/Divider';
import InputComp from 'components/inputComp';
import { InputType } from 'components/input/types';
import lang from 'common/lang';
import Loader from 'components/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { setCredentials } from 'pages/account/authSlice';
import { showNotification } from 'pages/pro/components/Projects/util';
import { IAddNameFormValues } from 'pages/pro/onboarding/desktop/addName/types';
import { useUpdateUserMutation } from 'pages/pro/profileService';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalElement from 'components/Modal/Modal';
import { EditFullNameProps } from 'pages/pro/basicDetails/type';
import { schemaFullName } from 'pages/pro/basicDetails/schema';
import { MyOptionType } from 'components/Select/types';
import { LocationAutoComplete } from 'components/Atoms/LocationAutocomplete';
import {
  ButtonGroup, EditTitle, SkipButton, SubmitButton,
} from './style';
import { Container, Form } from '../../styles';
import { EditNameDescription } from '../../desktop/EditBasicDetail/styles';

const {
  buttonText, onBoarding: { name: { genericErrorSaveName } }, profile,
} = lang;

const EditFullName = ({
  firstName,
  lastName,
  location,
  setEditFullNameDetail,
  editFullNameDetail,
}: EditFullNameProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<IAddNameFormValues>({
    resolver: yupResolver(schemaFullName),
    defaultValues: {
      firstName,
      lastName,
      location,
    },
  });

  const [updateUser, results] = useUpdateUserMutation();

  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IAddNameFormValues> = async (data) => {
    try {
      const response = await updateUser({
        first_name: data.firstName,
        last_name: data.lastName,
        location: data.location.value,
      }).unwrap();

      const payload = {
        user: response.data,
        token,
      };
      dispatch(setCredentials(payload));
    } catch (e: any) {
      showNotification(e.data.message || genericErrorSaveName, 'error');
    }

    setEditFullNameDetail(false);
  };

  const disabledButton = !isDirty;

  return results.isLoading ? (
    <Loader />
  ) : (
    <ModalElement
      isOpen={editFullNameDetail}
      closeModal={() => setEditFullNameDetail(false)}
    >
      <Container>
        <ToastContainer
          position="top-center"
          hideProgressBar
          style={{
            width: '100%',
            maxWidth: '906px',
          }}
        />
        <EditTitle component="h2">
          {profile.title}
        </EditTitle>
        <EditNameDescription>
          {profile.editName.description}
        </EditNameDescription>
        <Divider />
        <Form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <InputComp
            type={InputType.TEXT}
            labelText={profile.editName.firstNameLabel}
            id="firstName"
            placeholder={profile.editName.firstNamePlaceholder}
            register={register}
            error={errors?.firstName}
            data-cy="basicDetailFirstNameInput"
            onChange={(e) => setValue('firstName', e.target.value, { shouldValidate: true, shouldDirty: true })}
          />
          <InputComp
            type={InputType.TEXT}
            labelText={profile.editName.lastNameLabel}
            id="lastName"
            placeholder={profile.editName.lastNamePlaceholder}
            register={register}
            error={errors?.lastName}
            data-cy="basicDetailFirstLastInput"
            onChange={(e) => setValue('lastName', e.target.value, { shouldValidate: true, shouldDirty: true })}
          />
          <LocationAutoComplete
            onChange={(selected: MyOptionType | null) => selected && setValue('location', { value: selected.value, label: selected.label }, { shouldValidate: true, shouldDirty: true })}
            label={profile.editName.locationLabel}
            placeholder={profile.editName.locationPlaceholder}
            value={watch('location')}
          />
          <Divider />
          <ButtonGroup>
            <SubmitButton
              primary
              label={buttonText.save}
              type="submit"
              disabled={disabledButton}
              data-cy="basicDetailCancel"
            />
            <SkipButton
              primary
              variant="link"
              label={buttonText.cancel}
              onClick={() => setEditFullNameDetail(false)}
              data-cy="basicDetailSave"
            />
          </ButtonGroup>
        </Form>
      </Container>
    </ModalElement>
  );
};
export default EditFullName;
