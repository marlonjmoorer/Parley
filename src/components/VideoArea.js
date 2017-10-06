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
        var update=false;
        var func=p=>{if(p.stream) return p.stream}
        var oldStreams= this.props.peers.map(func)
        var newStreams= nextProps.peers.map(func)

      //  return true
        return  nextProps.peers.length!==this.props.peers.length || nextProps.user.stream!==this.props.user.stream||nextProps.user.username !==this.props.user.username
    }
    
    render() {
       
        return (
            <div className="video-area">
                <VideoGrid peers={this.props.peers}/>
                <UserStream stream={this.props.user.stream}/>
            </div>
            
        );
    }
}

export default VideoArea;
