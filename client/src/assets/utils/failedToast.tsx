import { FirebaseError } from 'firebase/app';
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

export const generateFirebaseErrorInstance = (error: FirebaseError) => {
  switch (error?.code) {
    case 'auth/invalid-credential':
      toastError('Either email or password is incorrect. Try again, please.');
      break;
    case 'auth/email-already-in-use':
      toastError('The chosen email is already in use. Pick another email.');
      break;
    case 'auth/network-request-failed':
      toastError('Network request failure. Try again, please.');
      break;
    default:
      toastError('Some error occurred. Try again, please.');
      break;
  }
};
