import React from 'react';
import {Button, Segment, Grid} from 'semantic-ui-react'
const MediaControls = ({toggleChat, video,audio,toggleCam,toggleMic}) => {
    
    return (

     <Segment vertical="middle" textAlign='center' inverted color="blue" >
        <Button size="huge" circular icon={audio.enabled?'unmute':"mute"} onClick={toggleMic} />
        <Button size="huge" circular icon='video camera' onClick={toggleCam} />
        <Button size="huge" circular icon='settings'/>
        <Button size="huge" circular icon='talk' onClick={toggleChat}/>
     </Segment>

          /*   <Grid >
                <Grid.Row color="violet">
                     <Grid.Column  width={5}></Grid.Column>
                <Grid.Column textAlign="center" verticalAlign="middle" width={6}>
                    <Button size="huge" circular icon='microphone'/>
                    <Button size="huge" circular icon='video camera'/>
                    <Button size="huge" circular icon='settings'/>
                    
                </Grid.Column>
                <Grid.Column textAlign="right" verticalAlign="middle" width={5}>
                     <Button size="huge" circular icon='talk' onClick={toggleChat}/>
                </Grid.Column>
                </Grid.Row>
              
            </Grid> */

       
    );
}

export default MediaControls;