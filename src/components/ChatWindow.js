import React from 'react';
import { Input,Header,Segment} from 'semantic-ui-react'
import MessageFeed from './MessageFeed';


const ChatWindow = ({sendMessage,messages}) => {

    return ( 
        <div className="chat">
            <Header color="blue" inverted >Conversation</Header>
             <MessageFeed  messages={messages}/> 
            <Input id="message-input" fluid placeholder="message" onKeyPress={sendMessage}/>
        </div>
    );
}

export default ChatWindow;