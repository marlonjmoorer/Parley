import React, {Component} from 'react';
import io from 'socket.io-client';
import Peer from "peerjs"
import VideoArea from '../components/VideoArea';
import MediaControls from '../components/MediaControls';
import UserList from '../components/UserList';
import ChatWindow from '../components/ChatWindow';
import { Divider} from 'semantic-ui-react'

import UserNameForm from '../components/UserNameForm';

var UsernameGenerator = require('username-generator');


class VideoChatPage extends Component {
    state = {
        id: null,
        peers: [],
        stream: null,
        socket: io.connect(`http://localhost:5500/`),
        messages:[],
        chatOpen:true,
        username:UsernameGenerator.generateUsername()
    }

    init(){
        var {socket,username} = this.state
        var {roomname} = this.props.match.params
        var peer = new Peer(username,{host: 'localhost', port: 5500, path: '/peer'})
        peer.on("open", () => {
            this.getStream((stream) => {
                var audio=stream.getAudioTracks()[0]||{}
                var video= stream.getVideoTracks()[0]||{}
               
                this.setState({stream,roomname,video,audio})
            })
            socket.emit("join", {roomname,username})
        })
        socket.on("message", this.appendMessage)
        socket.on("AddUser", (user) => {
            var {stream,username}=this.state
            console.log("Connecting",user.username)
            var conn = peer.connect(user.username);
            conn.on('open', ()=>{
                conn.send({username});
                this.setState({
                    peers: [user].concat(this.state.peers)
                })
              /* console.log("Calling  ", user.username)
              var call = peer.call(user.username, stream)
              call.on("stream", (remoteStream) => {
                  user.stream=remoteStream
                  this.setState({
                      peers: [user].concat(this.state.peers)
                  })
              }) */
            });
        })
        socket.on("RemoveUser", (user) => {
            if(user){
                 var peers = this
                .state
                .peers
                .filter(p => p.sid != user.sid)
            this.setState({peers})
            }
           
        })
        peer.on('call', (call) => {
            console.log("Call recieved")
            console.log(call)
            call.answer(this.state.stream); // Answer the call with an A/V stream.
            call.on('stream', (remoteStream) => {
               this.updatePeer({username: call.peer, stream: remoteStream})
            });
        });
        peer.on('connection', (conn)=> {
            console.log("Connection recieved")
            conn.on('data', (data)=>{
                var peername=data.username;
                if(peername){
                    var {stream}=this.state
                    var call = peer.call(peername, stream)
                    call.on("stream", (remoteStream) => {
                        this.setState({
                            peers: [{username:peername,stream:remoteStream}].concat(this.state.peers)
                        })
                    }) 
                }
            });
        });
    }

    componentDidMount() {
       if(this.state.username){
           this.init()
       }
    }
    

    updatePeer = (peer) => {
        var {peers} = this.state
        var oldPeer = peers.find(p => p.username == peer.username)
        var index = peers.indexOf(oldPeer);
        console.log(peer)
        console.log(peers)
        console.log(index)
        if (index !== -1) {
            peers[index].stream = peer.stream
            this.setState({peers})
        }
    }
    getStream(callback) {
        if (this.state.stream) {
            callback(this.state.stream)
        } else {
            navigator.getUserMedia({
                audio: true,
                video: true
            }, callback, (err) => {})
        }
    }
    sendMessage = (e) => {
        var {socket, roomname,username} = this.state
        if (e.target.value && e.key == "Enter") {
            socket.emit("message", {
                room: roomname,
                text: e.target.value,
                username
            })
            e.target.value = ''
        }
    }
    appendMessage = (message) => {
        //message.username= this.state.peers.find(p=>p.id==message.id||p.id==this.state.id).username
        var feed = document.querySelector("#feed")
        this.setState({
            messages: [
                ...this.state.messages,
                message
            ]
        }, () => {
             feed.scrollTop = feed.scrollHeight
        })
    }
    toggleChat=()=>{
      this.setState({chatOpen:!this.state.chatOpen})  
    }
    join=(username)=>{
        this.setState({username})
        this.init()
    }

    toggleCam = () => {
        var {video}=this.state
        video.enabled=!video.enabled
       // this.setState({video})
    }
    toggleMic= () => {
        var {audio}=this.state
       audio.enabled=!audio.enabled
       this.setState({audio})
    }


    render() {
       
       
        var {stream,id,username,peers,video,audio} = this.state
        if(!username){
            return <UserNameForm OnJoin={this.join}/>
        }
        var activePeers=peers.filter(p=>{
            if(p.stream){
                return true;
            }
        })
        console.log('====================================');
        console.log(this.state);
        console.log(activePeers);
        console.log('====================================');
        return (
            <div className="room-layout">
                <div
                    className="room-container"
                    style={{
                    background: "black"
                }}>

                    <VideoArea user={{stream,username}} peers={activePeers} />
                    {stream &&
                    
                    <MediaControls 
                    toggleChat={this.toggleChat} 
                    toggleCam={this.toggleCam} 
                    toggleMic={this.toggleMic} 
                    video={video}
                    audio={audio} />
                    }
                </div>

                <div className="side-bar" style={this.state.chatOpen?null:{width:0}}>
                   

                   <UserList users={peers.concat(this.state)}/>
                    <Divider/>
                   
                    <ChatWindow messages={this.state.messages} sendMessage={this.sendMessage}/> 
                    
                </div>
            </div>
        );
    }
}

export default VideoChatPage;