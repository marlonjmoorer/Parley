import React from 'react';
import Analyser from './Analyser';

const UserStream = ({stream}) => {
    var url = ""
    if (stream) {

        url = URL.createObjectURL(stream)
    }

    console.log(url)
    return (
        <div className="userStream">
            <div>
                <video className="user-video" src={url} muted autoPlay></video>

                <Analyser stream={stream} />
            </div>
        </div>

    );
}

export default UserStream;