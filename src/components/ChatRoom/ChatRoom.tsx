import React, { FormEvent, useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import './ChatRoom.css';

interface ChatRoomProps {
    readonly auth: firebase.auth.Auth;
    readonly firestore: firebase.firestore.Firestore;
}

interface Chat {
    readonly createdAt: string;
    readonly photoURL: string;
    readonly text: string;
    readonly id: string;
    readonly uid: string;
}

const ChatRoom = (props: ChatRoomProps) => {

    const messagesRef = props.firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');
    const [inputText, setInputText] = useState('');

    const [messages]: [Chat[] | undefined, boolean, Error | undefined] = useCollectionData(query, {idField: 'id'});

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        const messagesDiv = document.getElementById("messages");
        if (messagesDiv) messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    const sendMessage = async (e: FormEvent) => {
        e.preventDefault();

        if (inputText !== '') {
            await messagesRef.add({
                text: inputText,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid: props.auth.currentUser?.uid,
                photoURL: props.auth.currentUser?.photoURL
            })
            .then(() => scrollToBottom())
            .catch(reason => alert(reason));
        }

        setInputText('');
    }

    return <>
        <div id="messages" className="messages">
            {messages && messages.map(message => <ChatMessage key={message.id} message={message.text} sent={message.uid === props.auth.currentUser?.uid} photoURL={message.photoURL}/>)}
        </div>

        <form className="chatBox" onSubmit={sendMessage}>
            <input placeholder="Enter your message..." value={inputText} onChange={e => setInputText(e.target.value)} />
            <button className="sendButton" type="submit">Send</button>
        </form>
    </>;

}

export default ChatRoom;