import React from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';

interface ChatRoomProps {
    readonly auth: firebase.auth.Auth;
    readonly firestore: firebase.firestore.Firestore;
}

interface Chat {
    readonly createdAt: string;
    readonly photoUrl: string;
    readonly text: string;
    readonly id: string;
    readonly uid: string;
}

const ChatRoom = (props: ChatRoomProps) => {

    const messagesRef = props.firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages]: [Chat[] | undefined, boolean, Error | undefined] = useCollectionData(query, {idField: 'id'});

    return <>
        <div>
            {messages && messages.map(message => <ChatMessage key={message.uid} message={message.text} sent={message.uid === props.auth.currentUser?.uid}/>)}
        </div>
    </>;

}

export default ChatRoom;