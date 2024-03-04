import React, { ChangeEvent, useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import ModalElement from 'components/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHandleMissingSession } from 'common/hooks/useHandleMissingSession';
import lang from 'common/lang';
import { useNavigate, useParams } from 'common/utils/router-fill';
import { useProfileQuery, useUpdateUserMutation } from 'pages/pro/profileService';
import { useAppSelector } from 'common/hooks/state';
import { getIsCurrentUser } from 'pages/pro/profileSlice';
import ViewBio from './ViewBio';
import EditBio from './EditBio';

const characterLength = 2600;
const { bio: bioLang } = lang;
const Bio = () => {
  useHandleMissingSession();
  const [editBio, setEditBio] = useState<boolean>(false);
  const [bio, setBio] = useState('');
  const [error, setError] = useState<boolean>(false);
  const [updateUser, results] = useUpdateUserMutation();
  const navigate = useNavigate();
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const params = useParams();
  const { isError, isLoading, data } = useProfileQuery(params.username);
  const isCurrentUser = useAppSelector(getIsCurrentUser);
  const showNotification = (msg: string, type: string) => {
    const isErrorNotification = type === 'error';
    toast(
      msg,
      {
        style: {
          height: '18px',
          textAlign: 'center',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          fontSize: '0.75rem',
          background: isErrorNotification ? '#DE4040' : '#5FF088',
          color: isErrorNotification ? '#F7F7F7' : '#373742',
        },
      },
    );
  };
  const saveBio = () => {
    updateUser({ bio }).unwrap()
      .then(() => {
        showNotification('Bio saved successfully', 'success');
        setDisabledButton(true);
        setError(false);
      })
      .catch(() => {
        showNotification('Error in saving Bio', 'error');
        setBio(data?.data?.bio);
      });
    setEditBio(false);
  };
  useEffect(() => {
    if (isError) {
      navigate('/404');
    }
  }, [isError]);
  const updateText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === data?.data?.bio) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
    if (e.target.value.length > characterLength) {
      setError(true);
    } else {
      setError(false);
      setBio(e.target.value);
    }
  };
  const cancelUpdateBio = () => {
    setEditBio(false);
    setBio(data?.data?.bio || '');
  };
  useEffect(() => {
    if (data?.data?.bio) {
      setBio(data.data.bio);
    }
  }, [data?.data]);
  const userBio = data?.data?.bio;
  const blocks = data?.data?.blocks;

  const editBlock = () => {
    // TODO: API Integration
  };

  return (
    <>
      {(isLoading || results.isLoading) && <Loader />}
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {userBio && <ViewBio data={userBio} setEditBio={setEditBio} title={bioLang.title} />}
      {!!blocks?.length
        && blocks.map((block: any) => <ViewBio key={block?.blockable_id} data={block?.fields?.description} setEditBio={editBlock} title={block?.fields?.title} />) }
      {editBio && isCurrentUser && (
        <ModalElement isOpen={editBio} closeModal={() => setEditBio(false)}>
          <EditBio
            cancel={cancelUpdateBio}
            bio={bio}
            updateText={updateText}
            characterLength={characterLength}
            saveBio={saveBio}
            disabledButton={disabledButton}
            error={error}
          />
        </ModalElement>
      )}
    </>
  );
};

export default Bio;
