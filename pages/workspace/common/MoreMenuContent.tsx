import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import lang from 'common/lang';
import { useRef } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import { useEditJobMutation } from 'pages/jobs/jobsService';
import { JobStatus, MoreMenuContentProps } from '../type';
import { MenuItem, MoreMenuContentWrapper } from './styles';

const {
  jobs: {
    moreMenu: { edit, viewJobDetails },
  },
} = lang;

const MoreMenuContent = ({ closeMenu, selectedJob, updateRow }: MoreMenuContentProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [editJob] = useEditJobMutation();
  useOutsideAlerter({ ref: wrapperRef, outSideClick: closeMenu });
  const currentUser = useSelector(selectCurrentUser);
  const currentCompany = useSelector(selectCurrentCompany);
  const isUserB2B = currentCompany !== null;
  const publishUnpublishedLabel = selectedJob?.status === lang.jobs.moreMenu.status.published ? lang.jobs.moreMenu.unpublish : lang.jobs.publish;
  const handlePublish = () => {
    if (isUserB2B) {
      const payload = {
        formData: {
          status: selectedJob?.status === JobStatus.PUBLISHED ? 'close' : 'open',
        },
        uuid: selectedJob.id,
      };
      editJob(payload).unwrap().then((res) => {
        if (res?.data) {
          updateRow({ ...selectedJob, ...res.data });
          closeMenu();
        }
      });
    }
  };

  return (
    <MoreMenuContentWrapper ref={wrapperRef} data-cy={`moreMenuBox${selectedJob.uuid}`}>
      <MenuItem data-cy="viewJobDetails"><Link href={`/${selectedJob.slug}`}>{viewJobDetails}</Link></MenuItem>
      {selectedJob?.status !== 'open' && <MenuItem onClick={handlePublish}>{publishUnpublishedLabel}</MenuItem>}
    </MoreMenuContentWrapper>
  );
};

export default MoreMenuContent;
