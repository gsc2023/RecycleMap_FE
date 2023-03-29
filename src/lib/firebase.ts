import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDQDvn9hxPmB17tgPoZ-BhoO_idLIEwtwc',
  authDomain: 'solutionchallenge2023.firebaseapp.com',
  projectId: 'solutionchallenge2023',
  storageBucket: 'solutionchallenge2023.appspot.com',
  messagingSenderId: '318250809363',
  appId: '1:318250809363:web:2d9e5a4a74903e7b68e7e6',
  measurementId: 'G-330SKS36KY',
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const loginFirebase = async (email: string, passwd: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, passwd).catch(() => null);
  return userCredential?.user;
};

export const logoutFirebase = () => {
  return signOut(auth);
};
