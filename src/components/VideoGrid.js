import React from 'react';



const VideoGrid = ({user}) => {

   var url=""
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
        url=URL.createObjectURL(user.stream)
    }
   

    return (
            <div className="video-wrapper"> 
                
                 {[1,1].map(x=>

                    <div className="video-container">
                    <video 
                    src={url}
                    autoPlay></video>
                    </div>
                 )}
                 
            </div>
               
            
          
    );
}

export default VideoGrid;