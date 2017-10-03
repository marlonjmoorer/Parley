
import React from 'react';
const UserStream = ({stream}) => {
    var url=""
    if (stream) {
       
        url=URL.createObjectURL(stream)
    }
    return (
        <div style={{display:"grid",alignItems:"end",justifyContent:"center"}}>
        <video  className="user-video"
        src={url}
        autoPlay></video>
        </div>
    
    );
}

export default UserStream;