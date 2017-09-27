import React, {Component} from 'react';
import io from 'socket.io-client';
import ChatWindow from './ChatWindow';

import {
    Grid,
    Feed,
    Icon,
    List,
    Input,
    Divider,
    TextArea,
    Container,
    Button,
    Sidebar,
    Segment,
    Menu,
    Image,
    Header
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
            visible: true,
            roomname: props.match.params.name
        }

    }

    toggleVisibility = () => this.setState({
        visible: !this.state.visible
    })

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
                    var peer = new Peer({
                        host: 'localhost',
                        port: 5500,
                        path: '/peer'
                    })
                    console.log("Ready")
                    var amLeader = peers[0] == id
                    peer.on("open",(id)=>{
                        console.log(id)
                    })
                    peer.on('call', (call) => {
                        console.log("Call recieved")
                        console.log(call)
                        call.answer(stream); // Answer the call with an A/V stream.

                        call.on('stream', (remoteStream) => {
                            this.appendPeer({id: call.peer, stream: remoteStream})
                        });
                    });
                    peer.on('connection', (conn) => {
                        conn.on('data', (data) => {
                            console.log('Received', data);
                            switch (data) {
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

    appendMessage = (event) => {
        console.log(this.state)
        var feed = document.querySelector("#feed")
        this.setState({
            events: [
                ...this.state.events,
                event
            ]
        }, () => {
            //  feed.scrollTop = feed.scrollHeight
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
    mute = () => {
        var {stream} = this.state
        alert("muted")
    }
    mutePeer = (id) => {
        var {peer} = this.state
        console.log("test")
        var conn = peer.connect(id);
        conn.on('open', function () {
            console.log("open")
            conn.send('mute');
        });
    }
    render() {
        console.log('====================================');
        console.log(this.state);
        console.log('====================================');
        var {stream, peers, id, peer, events} = this.state

        return (
            <div style={{
                height: "100%"
            }}>
                <Grid
                    celled
                    columns={2}
                    stretched
                    style={{
                    height: "100%"
                }}>
                    <Grid.Column width={13} style={{padding:"0"}}>
                                <VideoItem user={this.state}/>
                                <Menu color="black" inverted widths={3} >
                                <Menu.Item name='gamepad' >
                                    <Button.Group  size='large' widths={5}>
                                        <Button color='violet'  icon='microphone'/>
                                        <Button color='violet'  icon='video camera'/>
                                        <Button color='violet'  icon='computer' />
                                    </Button.Group>
                                </Menu.Item>
                              </Menu>
                    </Grid.Column>
                    <Grid.Column color="black" width={3}>
                        {/*    <VideoItem user={this.state}/> */}
                        {/* <ChatWindow events={events} sendMessage={this.sendMessage}/> */}

                       {/*  <Grid container columns={1}>

                        <Grid.Row >
                                <Grid.Column color="">
                                <Header as='h2' inverted color="Red" textAlign='center'>
                                    Callers
                                </Header>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row >
                                <Grid.Column>
                                   
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row >
                                <Grid.Column>
                                <VideoItem user={this.state} /> 
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row >
                                <Grid.Column>
                                <VideoItem user={this.state} /> 
                                </Grid.Column>
                            </Grid.Row>
                        </Grid> */}
                        <Segment inverted color="violet" textAlign="center" >
                                Header
                         </Segment>
                        <Segment.Group>
                                    <Segment inverted color="violet">
                                         <VideoItem user={this.state} /> 
                                    </Segment>
                                    <Segment>
                                         <VideoItem user={this.state} /> 
                                    </Segment>
                                    
                                    <Segment>
                                         <VideoItem user={this.state} /> 
                                    </Segment>
                                    <Segment>
                                         <VideoItem user={this.state} /> 
                                    </Segment>
                                   
                        </Segment.Group>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Room
