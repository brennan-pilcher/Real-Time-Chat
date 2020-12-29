import React from 'react';
import './ChatMessage.css';

interface ChatMessageProps {
    readonly sent: boolean;
    readonly message: string;
}

const ChatMessage = (props: ChatMessageProps) => <div className={props.sent ? 'sent' : 'received'}> <p>{props.message}</p> </div>;

export default ChatMessage;