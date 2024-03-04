import { useAppSelector } from 'common/hooks/state';
import { useRouter } from 'next/router';
import { selectCurrentUser } from 'pages/account/authSlice';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { showNotification } from 'pages/pro/components/Projects/util';
import { useState } from 'react';
import lang from 'common/lang';
import { viewLinkPostUrl } from 'common/utils/network/appRouts';
import { uploadMediaFile } from 'utils/uploadMediaFile';
import { useCreateLinkMutation } from './LinkService';
import { ApiPayloadHook } from './types';

const { linkCreatedSuccess } = lang.linkPosts;
const useShareLink = () => {
  const [updateLinkAPI] = useCreateLinkMutation();
  const router = useRouter();
  const isCurrentUser = useAppSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);

  const createShareLinkApi = async (body: ApiPayloadHook, imageUpload: boolean) => {
    setLoading(true);
    let media = imageUpload ? '' : body.og_image as string;
    if (imageUpload) {
      media = await uploadMediaFile(
        body.og_image as File,
        isCurrentUser.username,
      );
    }
    await updateLinkAPI({ ...body, og_image: media }).unwrap() // companyUsername: publishForCompany

      .then((data) => {
        router.replace({ pathname: viewLinkPostUrl(data.data.id) });
        showNotification(linkCreatedSuccess, NotificationType.SUCCESS);
      })
      .catch((error) => showNotification(error?.data?.message, NotificationType.ERROR))
      .finally(() => setLoading(false));
    setLoading(false);
  };
  return {
    createShareLinkApi, isLoading: loading,
  };
};

export default useShareLink;
