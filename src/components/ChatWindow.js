import React from 'react';
import { Input,Header} from 'semantic-ui-react'
import MessageFeed from './MessageFeed';


const ChatWindow = ({sendMessage,messages}) => {

    return ( 
        <div className="chat">
            <Header color="blue" inverted >Conversation</Header>
             <MessageFeed  messages={messages}/> 
            <Input fluid placeholder="message" onKeyPress={sendMessage}/>
        </div>
    );
}

export default ChatWindow;