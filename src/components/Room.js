import React, {Component} from 'react';
import io from 'socket.io-client';
import {
    Grid,
    Feed,
    Icon,
    List,
    Input,
    Divider,
    TextArea,
    Container,
    Button
} from 'semantic-ui-react'
import UserList from './UserList';
import EventFeed from './EventFeed';
import Peer from "peerjs"
import VideoItem from './VideoItem';
class Room extends Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: io.connect(`http://localhost:5500/`),
            events: [],
            peers: [],
            username: "",
            isLeader: false
        }

    }


    componentDidMount() {

        //this.toggleCamera(true)
        var {name} = this.props.match.params
        var socket = io.connect(`http://localhost:5500/`)
        
        socket
            .on("message", this.appendMessage)
            .on("user_joined", this.appendMessage)
            .on("user_left", this.appendMessage)
            .on("user_left", this.userLeft)
            .on("peerListChanged", (peers) => {
                this.setState({peers})
            })
            .emit("join", name, ({peers, id}) => {
                this.getStream(stream => {
                    var peer = new Peer(id, {
                        host: 'localhost',
                        port: 5500,
                        path: '/peer'
                    })
                    console.log("Ready")
                    var amLeader = peers[0] == id

                    peer.on('call', (call) => {
                        console.log("Call recieved")
                        console.log(call)
                        call.answer(stream); // Answer the call with an A/V stream.

                        call.on('stream', (remoteStream) => {
                            this.appendPeer({id: call.peer, stream: remoteStream})
                        });
                    });
                    peer.on('connection', (conn)=> { 
                        conn.on('data', (data)=> {
                            console.log('Received', data);
                            switch(data){
                                case "mute":
                                    this.mute()
                            }
                        });
                    });
                    if (!amLeader) {
                        peers
                            .filter(p => p != id)
                            .forEach(pid => {
                                console.log("Calling  ", pid)
                                var call = peer.call(pid, stream)
                                call.on("stream", (remoteStream) => {
                                    this.appendPeer({id: pid, stream: remoteStream})
                                })
                            })
                    }

                    this.setState({peer, id, stream})
                })

            })

    }
    sendMessage = (e) => {
        var {socket} = this.state
        console.log(e.key)
        if (e.target.value && e.key == "Enter") {
            socket.emit("message", e.target.value)
            e.target.value = ''
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
  
    appendMessage = (event) => {
        console.log(this.state)
        var feed = document.querySelector("#eventBoard")
        this.setState({
            events: [
                ...this.state.events,
                event
            ]
        }, () => {
            feed.scrollTop = feed.scrollHeight
        })
    }

    appendPeer = (peer) => {
        var {peers} = this.state
        this.setState({
            peers: [
                ...peers,
                peer
            ]
        })
    }
    userAdded(event) {}
    userLeft = (event) => {
        var {peers} = this.state
        console.log('====================================');
        console.log(event.user);
        console.log('====================================');
        this.setState({
            peers: peers.filter(p => p.id != event.user)
        })
    }
    mute=()=>{
        var {stream} = this.state
        alert("muted")
    }
    mutePeer=(id)=>{
        var {peer} = this.state
        console.log("test")
        var conn = peer.connect(id);
        conn.on('open', function() {
            console.log("open")
            conn.send('mute');
        });
    }
    render() {
        console.log('====================================');
        console.log(this.state);
        console.log('====================================');
        var {stream, peers, id, peer} = this.state
        return (
            <div style={{
                minHeight: "300px"
            }}>
                <h3>{this.state.id}</h3>
                <Grid
                    celled
                    columns={3}
                    style={{
                    minHeight: "300px"
                }}>
                    <Grid.Row>
                        <Grid.Column color="blue" width={4}>
                            {/*  <UserList
                                users={this
                                .state
                                .peers
                                .filter(u => u != this.state.id)}
                                /> */}
                            <Divider/>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column >
                                        <Container>
                                            <VideoItem
                                                user={{
                                                id,
                                                stream
                                            }}/>
                                        </Container>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Grid.Column>
                        <Grid.Column color="green" width={7}>

                            
                            <Grid>
                                <Grid.Row columns={2}>
                                    {peers.map((p, i) => 
                                    <Grid.Column key={i}>
                                        <VideoItem user={p}/>
                                        <Button onClick={()=>{
                                           this.mutePeer(p.id)
                                        }} >Mute</Button>
                                    </Grid.Column>)}
                                </Grid.Row>

                            </Grid>

                        </Grid.Column>
                        <Grid.Column color="teal" width={5}>
                            <div
                                id="eventBoard"
                                style={{
                                overflowY: "scroll",
                                height: "400px",
                                background: "white"
                            }}>
                                <EventFeed events={this.state.events}/>
                            </div>

                            <Input fluid placeholder="message" onKeyPress={this.sendMessage}/>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Room
