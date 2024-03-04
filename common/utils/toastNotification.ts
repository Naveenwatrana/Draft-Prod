import { ToastOptions } from 'react-toastify';
import { theme } from 'common/theme';
const { palette } = theme;

export const toastNotificationStyles = (isErrorNotification: boolean): ToastOptions => ({
  style: {
    height: '18px',
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '0.75rem',
    background: isErrorNotification ? palette.red[100].value : palette.green[80].value,
    color: isErrorNotification ? palette.white[100].value : palette.gray[60].value,
  },
});
