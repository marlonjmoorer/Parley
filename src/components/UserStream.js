
import React from 'react';
const UserStream = ({stream}) => {
    var url=""
    if (stream) {
       
        url=URL.createObjectURL(stream)
    }
    return (
        <div style={{position:"relative"}}>
        <video  className="user-video"
        src={url}
        autoPlay></video>
        </div>
    
    );
}

export default UserStream;