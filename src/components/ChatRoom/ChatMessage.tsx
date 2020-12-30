import React from 'react';
import './ChatMessage.css';

interface ChatMessageProps {
    readonly sent: boolean;
    readonly message: string;
    readonly photoURL: string;
}

const ChatMessage = (props: ChatMessageProps) => <div className={props.sent ? 'sent' : 'received'}>
    <img className={props.sent ? 'sent-image' : 'received-image'} src={props.photoURL} />
    <div className={props.sent ? 'sent-message' : 'received-message'}>{props.message}</div>
</div>;

export default ChatMessage;