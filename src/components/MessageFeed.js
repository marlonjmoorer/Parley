import React from 'react';
import {Item, Icon,Comment,Message} from 'semantic-ui-react'
const MessageFeed = ({messages}) => {

   
    return (
        <div id="feed" className="messages">
        <Comment.Group >
       {messages.map((event,i)=>
        <Comment key={i}>
        <Comment.Avatar src="https://openclipart.org/image/2400px/svg_to_png/277084/Male-Avatar-3.png"/>
          <Comment.Content>
            <Comment.Author as='a'>{event.username}</Comment.Author>
            <Comment.Metadata>
                  <div> {event.date}</div>
            </Comment.Metadata>
            <Comment.Text >
            <Message color='blue'>{event.text}</Message>
              
              </Comment.Text>
          </Comment.Content>
        </Comment>
       )}
      </Comment.Group>  
      {/* {messages.map(event=><div>event</div>)} */}
       </div>
    );
}

export default MessageFeed;