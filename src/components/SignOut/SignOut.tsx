import React from 'react';


import firebase from 'firebase/app';

interface SignOutProps {
    readonly auth: firebase.auth.Auth;
}

const SignOut = (props: SignOutProps) => props.auth.currentUser && <button onClick={() => props.auth.signOut}>Sign out</button>;

export default SignOut;