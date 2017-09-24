import React from 'react';
import {Card, Icon, Image, Button} from 'semantic-ui-react'
const VideoItem = ({user}) => {
    
    var toggleCam = () => {
        console.log(user.stream.getTracks())
        user
            .stream
            .getVideoTracks()[0]
            .enabled = !(user.stream.getVideoTracks()[0].enabled);
    }

    var toggleMic = () => {
        console.log(user.stream.getTracks())
        user
            .stream
            .getAudioTracks()[0]
            .enabled = !(user.stream.getAudioTracks()[0].enabled);
    }
    if (user.stream) {
        console.log(user.stream.getVideoTracks())
        toggleMic()
    }

    return (
        <Card>
            <video
                src={user.stream
                ? URL.createObjectURL(user.stream)
                : ""}
                autoPlay></video>
            <Button.Group icon>
                <Button color="teal" onClick={toggleMic}>
                    <Icon name='microphone'/>
                </Button>
                <Button color="teal" onClick={toggleCam}>
                    <Icon name='video camera'/>
                </Button>
            </Button.Group>

        </Card>
    );
}

export default VideoItem;