import React from 'react';
import {Item, Icon,Comment} from 'semantic-ui-react'
const EventFeed = ({events}) => {

   
    return (
        <div id="feed" style={{overflowY:"scroll", height:"93%"}}>

       
        <Comment.Group >
       {events.map(event=>
        <Comment>
          
          <Comment.Content>
            <Comment.Author as='a'>{event.user}</Comment.Author>
           
            <Comment.Text>{event.message}</Comment.Text>
          </Comment.Content>
        </Comment>
       )}
      </Comment.Group>
       </div>
    );
}

export default EventFeed;