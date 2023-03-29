import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDQDvn9hxPmB17tgPoZ-BhoO_idLIEwtwc',
//   authDomain: 'solutionchallenge2023.firebaseapp.com',
//   projectId: 'solutionchallenge2023',
//   storageBucket: 'solutionchallenge2023.appspot.com',
//   messagingSenderId: '318250809363',
//   appId: '1:318250809363:web:2d9e5a4a74903e7b68e7e6',
//   measurementId: 'G-330SKS36KY',
// };

// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// const auth = getAuth(app);
// signInWithEmailAndPassword(auth, 'won0114@ajou.ac.kr', 'qwer1234')
//   .then((userCredential) => {
//     const user = userCredential.user;
//     console.log(user);
//   })


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#13BD7E',
      dark: '#333a44',
    },
    secondary: {
      main: '#dbf5ec',
      dark: '#939495',
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
