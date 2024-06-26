import toast from 'react-hot-toast';

export const toastError = (message: string) =>
  toast.error(message, {
    duration: 3500,
    style: {
      border: '1px solid #ED2B2A',
      padding: '16px',
      color: '#ED2B2A',
      background: '#fff',
    },
    iconTheme: {
      primary: '#ED2B2A',
      secondary: '#fff',
    },
  });
