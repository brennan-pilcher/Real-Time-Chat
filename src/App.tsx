import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './components/SignIn/SignIn';
import ChatRoom from './components/ChatRoom/ChatRoom';
import SignOut from './components/SignOut/SignOut';

firebase.initializeApp({
  apiKey: "AIzaSyDi_lxSLjiaMSY5_-otw2Lx4urkn_kbhTk",
  authDomain: "real-time-chat-75142.firebaseapp.com",
  projectId: "real-time-chat-75142",
  storageBucket: "real-time-chat-75142.appspot.com",
  messagingSenderId: "967555832373",
  appId: "1:967555832373:web:c170b32e8a4717d5376f7c",
  measurementId: "G-M7G77BR3V9"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="header">
        <div className="title">Real-time Chatroom</div>
        <SignOut auth={auth} />
      </header>

      {user ? <ChatRoom auth={auth} firestore={firestore} /> : <SignIn auth={auth} />}
    </div>
  );
}


export default App;
