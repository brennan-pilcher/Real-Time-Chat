import React from 'react';
import './SignIn.css';


import firebase from 'firebase/app';

interface SignInProps {
    readonly auth: firebase.auth.Auth;
}

const SignIn = (props: SignInProps) => {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        props.auth.signInWithPopup(provider)
    }

    return <button className="signInButton" onClick={signInWithGoogle}>Sign in with Google</button>;

}

export default SignIn;