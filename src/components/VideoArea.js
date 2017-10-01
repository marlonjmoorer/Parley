import React, { Component } from 'react';
import VideoGrid from './VideoGrid';
import UserStream from './UserStream';

class VideoArea extends Component {
    state = {  }
    
    constructor(props){
        super(props)

    }
    shouldComponentUpdate(nextProps, nextState) {

        console.log(nextProps)
        console.log(this.props)
        
        return  nextProps.user.id !=this.props.user.id
    }
    
    render() {
       
        return (
            <div className="video-area">
                <VideoGrid user={this.props.user}/>
                <UserStream stream={this.props.user.stream}/>
            </div>
            
        );
    }
}

export default VideoArea;
