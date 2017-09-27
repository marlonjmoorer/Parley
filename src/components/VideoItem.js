import React from 'react';
import {Card, Icon, Image, Button, Header, Segment} from 'semantic-ui-react'
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
        // toggleMic()
    }
    var style={
        height:"30%"
    }

    return (
            <div className="video-wrapper"> 
                 <div className="overlay">
                 
                </div>    
                    <video 
                    src={user.stream
                    ? URL.createObjectURL(user.stream)
                    : ""}
                    autoPlay></video>
            </div>
               
            
          
    );
}

export default VideoItem;