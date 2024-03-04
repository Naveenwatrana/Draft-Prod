import { render, screen } from '@testing-library/react';
import { withStore } from 'common/utils/testHelpers';
import { useSelector } from 'react-redux';
import VerifyEmail from 'pages/web/verify-email/[token]';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Verify Email', () => {
  it('should show error message', () => {
    const stateMocked = {
      auth: {
        user: {
          id: 218,
          first_name: 'QQQ',
          email: 'jay@founderandlightning.com',
          email_verified_at: '2022-12-07T06:45:43.000000Z',
          created_at: '2022-12-07T06:44:55.000000Z',
          updated_at: '2022-12-29T10:30:51.000000Z',
          failed_login_attempt: 0,
          last_failed_login_date: null,
          deleted_at: null,
          last_name: 'scsdc',
          profile_cover: 'project-image/undefined',
          onboarding_status: true,
          bio: 'csvsdvsdvdsv',
          mantra: 'vsdds  fd fdfd fd',
          onboarding_step: null,
          presigned_profile_cover:
            'https://draft-api-staging.s3.eu-west-2.amazonaws.com/project-image/undefined?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ5H7KMXNC7RKBSUK%2F20221229%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T114115Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1200&X-Amz-Signature=054ea3ee61b32c167c58126b33ab524897a17b3e0f8918516f6ded3e6b78616d',
        },
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback(stateMocked);
    });
    render(withStore(<VerifyEmail />));
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
