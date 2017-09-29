import React from 'react';
import {Item, Icon,Comment} from 'semantic-ui-react'
const MessageFeed = ({messages}) => {

   
    return (
        <div id="feed" className="messages">
       <Comment.Group >
       {messages.map(event=>
        <Comment>
          
          <Comment.Content>
            <Comment.Author as='a'>{event.id}</Comment.Author>
           
            <Comment.Text>{event.text}</Comment.Text>
          </Comment.Content>
        </Comment>
       )}
      </Comment.Group> 
       </div>
    );
}

export default MessageFeed;