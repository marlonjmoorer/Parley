import React, {Component} from 'react';
import io from 'socket.io-client';
import Peer from "peerjs"
import VideoItem from '../components/VideoItem';
import MediaControls from '../components/MediaControls';
import UserList from '../components/UserList';
import ChatWindow from '../components/ChatWindow';

import { Divider} from 'semantic-ui-react'
var dummyData = [
    {
        id: 1
    }, {
        id: 2
    }, {
        id: 3
    }, {
        id: 33
    }, {
        id: 44
    }, {
        id: 55
    }, {
        id: 6
    }, {
        id: 76
    }, {
        id: 332
    }, {
        id: 100
    }, {
        id: 27
    }, {
        id: 28
    }, {
        id: 1990
    }
]
var dummyMessages = [
    {
        user: "glorp",
        text: "WORKS"
    }, {
        user: "glorp",
        text: "WORKS"
    }, {
        user: "glorp",
        text: "WORKS"
    }, {
        user: "glorp",
        text: "WORKS"
    },
    {
        user: "glorp",
        text: "WORKS"
    }, {
        user: "glorp",
        text: "WORKS"
    }, {
        user: "glorp",
        text: "WORKS"
    }, {
        user: "glorp",
        text: "WORKS"
    },
    {
        user: "glorp",
        text: "WORKS"
    }, {
        user: "glorp",
        text: "WORKS"
    }, {
        user: "glorp",
        text: "WORKS"
    }, {
        user: "glorp",
        text: "WORKS"
    },
    {
        user: "glorp",
        text: "WORKS"
    }, {
        user: "glorp",
        text: "WORKS"
    }, {
        user: "glorp",
        text: "WORKS"
    }, {
        user: "glorp",
        text: "WORKS"
    }
]
class VideoChatPage extends Component {
    state = {
        id: null,
        peers: [],
        stream: null,
        socket: io.connect(`http://localhost:5500/`),
        messages:[]
    }

    componentDidMount() {
        var {socket} = this.state
        var {name} = this.props.match.params
        var peer = new Peer({host: 'localhost', port: 5500, path: '/peer'})
        peer.on("open", (id) => {
            this.getStream((stream) => {
                this.setState({id, stream,roomname:name})
            })
            socket.emit("join", name, id)
        })
        socket.on("message", this.appendMessage)
        socket.on("AddUser", (user) => {
            this.setState({
                peers: [user].concat(this.state.peers)
            })
        })
        socket.on("RemoveUser", (user) => {
            var peers = this
                .state
                .peers
                .filter(p => p.sid != user.sid)
            console.log(peers)
            this.setState({peers})
        })
        peer.on('call', (call) => {
            console.log("Call recieved")
            console.log(call)
            call.answer(this.state.stream); // Answer the call with an A/V stream.

            call.on('stream', (remoteStream) => {
                this.updatePeer({id: call.peer, stream: remoteStream})
            });
        });
    }
    updatePeer = (peer) => {
        var {peers} = this.state
        var oldPeer = peers.find(p => p.id == peer.id)
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
                //  audio: true,
                video: true
            }, callback, (err) => {})
        }
    }
    sendMessage = (e) => {
        var {socket, roomname} = this.state
        console.log(e.key)
        console.log(e.target.value)
        if (e.target.value && e.key == "Enter") {
            socket.emit("message", {
                room: roomname,
                msg: e.target.value
            })
            e.target.value = ''
        }
    }
    appendMessage = (message) => {
        console.log(this.state)
        var feed = document.querySelector("#feed")
        this.setState({
            messages: [
                ...this.state.messages,
                message
            ]
        }, () => {
            //  feed.scrollTop = feed.scrollHeight
        })
    }
    render() {
        console.log(this.state)
        var {stream} = this.state
        return (
            <div className="room-layout">
                <div
                    className="room-container"
                    style={{
                    background: "black"
                }}>
                    <VideoItem user={this.state}/>
                    <MediaControls/>
                </div>

                <div className="side-bar">
                   
                    <UserList users={[].concat(dummyData)}/>
                    <Divider/>
                   
                    <ChatWindow messages={this.state.messages} sendMessage={this.sendMessage}/>
                    
                </div>
            </div>
        );
    }
}

export default VideoChatPage;