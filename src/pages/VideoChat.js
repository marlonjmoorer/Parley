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
const { peerOptions } = require('../config');


class VideoChatPage extends Component {
    state = {
        id: null,
        peers: [],
        stream: null,
        socket: io.connect(`/`),
        messages:[],
        chatOpen:true,
        username:UsernameGenerator.generateUsername()
    }

    init(){
        
       // console.log(process)
        var {socket,username} = this.state
        var {roomname} = this.props.match.params
        var peer = new Peer(username,peerOptions)
        peer.on("open", () => {
            this.getStream((stream) => {
                var audio=stream.getAudioTracks()[0]||{}
                var video= stream.getVideoTracks()[0]||{}
               audio.enabled=false
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
            call.answer(this.state.stream); // Answer the call with an A/V stream.
            call.on('stream', (remoteStream) => {
               this.updatePeer({username: call.peer, stream: remoteStream})
            });
        });
        socket.on("mute",this.mute)
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
        this.setState({username},this.init())
        
    }

    toggleCam = () => {
        var {video}=this.state
        video.enabled=!video.enabled
        this.setState({video})
    }
    toggleMic= () => {
        var {audio}=this.state
       audio.enabled=!audio.enabled
       this.setState({audio})
    }
    muteUser=(id)=>{
        var{socket,roomname}=this.state
        socket.emit("mute",id,roomname);
    }
    mute= () => {
       var {audio}=this.state
       audio.enabled=false
       console.log("muted")
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

        console.log(this.state);

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
                   

                   <UserList users={peers.concat({stream,username})} onClick={this.muteUser}/>
                    <Divider/>
                   
                    <ChatWindow messages={this.state.messages} sendMessage={this.sendMessage}/> 
                    
                </div>
            </div>
        );
    }
}

export default VideoChatPage;