import React from 'react';
import './SignOut.css';

import firebase from 'firebase/app';

interface SignOutProps {
    readonly auth: firebase.auth.Auth;
}

const SignOut = (props: SignOutProps) => props.auth.currentUser && <button className="signOutButton" onClick={() => props.auth.signOut()}>Sign out</button>;

export default SignOut;