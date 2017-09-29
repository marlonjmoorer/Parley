import React from 'react';
import {Button,Segment} from 'semantic-ui-react'
const MediaControls = () => {
    return (
       
             <Segment textAlign='center' vertical inverted color="violet" >
             <Button size="huge" circular icon='microphone' />
             <Button size="huge" circular icon='video camera' />
             <Button size="huge" circular icon='settings' />
             </Segment >
        
    );
}

export default MediaControls;