import React from 'react';
import {Feed, Icon} from 'semantic-ui-react'
const EventFeed = ({events}) => {
    return (
        <div>

        
        <Feed >
            {
                events.map((event,i)=>
                    <Feed.Event key={i}  >
                    <Feed.Label>
                        <Icon name="user circle"/>
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary>
                            <Feed.User>{event.user}
                            </Feed.User>
                           
                        </Feed.Summary>
                        <Feed.Extra text content={event.message}/>
                    </Feed.Content>
                    </Feed.Event>

                )
            }
        </Feed>
        </div>
    );
}

export default EventFeed;