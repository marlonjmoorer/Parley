import React from 'react';
import { Input} from 'semantic-ui-react'
import EventFeed from './EventFeed';

const ChatWindow = ({sendMessage,events}) => {

    return ( 
        <div style={{ height: "70%",margin:"10px",backgroundColor:"white",padding:"5px"}}>
            <EventFeed events={events}/>
            <Input fluid placeholder="message" onKeyPress={sendMessage}/>
        </div>
    );
}

export default ChatWindow;