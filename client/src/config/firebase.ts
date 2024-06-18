import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBqwOxuHb9N2Dz0kkTcfuBMiARI_m2jAH0',
  authDomain: 'watch-it-76629.firebaseapp.com',
  projectId: 'watch-it-76629',
  storageBucket: 'watch-it-76629.appspot.com',
  messagingSenderId: '286939353768',
  appId: '1:286939353768:web:5213a812d9ed257579e89d',
  measurementId: 'G-YGC6VEMJJR',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dataBase = getFirestore();
