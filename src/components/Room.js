import React, {Component} from 'react';
import io from 'socket.io-client';
import {
    Grid,
    Feed,
    Icon,
    List,
    Input,
    Divider,
    TextArea
} from 'semantic-ui-react'
import UserList from './UserList';
import EventFeed from './EventFeed';
import Peer from "peerjs"

class Room extends Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: io.connect(`http://localhost:5500/`),
            events: [],
            peers: [],
            username: "",
            isLeader: false,
            peerSteams: []

        }

    }
    componentWillMount() {}

    componentDidMount() {

        //this.toggleCamera(true)
        var {name} = this.props.match.params
        var socket = io.connect(`http://localhost:5500/`)

        socket
            .on("message", this.appendMessage)
            .on("user_joined", this.appendMessage)
            .on("user_left", this.appendMessage)
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

                        call.answer(stream); // Answer the call with an A/V stream.

                        call.on('stream', (remoteStream) => {
                            var {peerSteams} = this.state
                            this.setState({
                                peerSteams: [
                                    ...peerSteams,
                                    remoteStream
                                ]
                            })
                            // this.appendStream(remoteStream)
                        });
                    });
                    if (!amLeader) {
                        peers
                            .filter(p => p != id)
                            .forEach(p => {
                                console.log("Calling  ", p)
                                var call = peer.call(p, stream)

                                call.on("stream", (remoteStream) => {
                                    var {peerSteams} = this.state
                                    this.setState({
                                        peerSteams: [
                                            ...peerSteams,
                                            remoteStream
                                        ]
                                    })
                                    //this.appendStream(remoteStream)
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
                //  audio: true,
                video: true
            }, callback, (err) => {})
        }
    }
    toggleCamera(show) {
        if (show) {
            this.getStream(stream => {
                this.setState({
                    url: URL.createObjectURL(stream),
                    stream
                })
            })
        } else {

            var {stream} = this.state
            if (stream) {

                stream
                    .getTracks()
                    .forEach(function (track) {
                        track.stop();
                    });
                console.log(stream.getTracks())
                this.setState({stream: null})
            }
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
    appendStream = (s) => {
        console.log(s)
        var {peerSteams} = this.state
        console.log(peerSteams)
        this.setState({
            peerSteams: peerSteams.concat(s)
        })
    }
    callUser = (e) => {
        var {peer, stream} = this.state
        console.log(e.target.text)
        console.log(peer)

        var call = peer.call(e.target.text, stream);
        console.log(call)
        /* var conn = peer.connect(e.target.text);
        conn.on('open', function() {
            // Receive messages
            conn.on('data', function(data) {
              console.log('Received', data);
            });

            // Send messages
            conn.send('Hello!');
        })*/
    }

    render() {
        var {stream, peerSteams} = this.state
        return (
            <div style={{
                minHeight: "300px"
            }}>
                <h3>{this.state.username}</h3>
                <Grid
                    celled
                    columns={3}
                    style={{
                    minHeight: "300px"
                }}>
                    <Grid.Row>
                        <Grid.Column color="red" width={3}>
                            <UserList
                                users={this
                                .state
                                .peers
                                .filter(u => u != this.state.username)}
                                onClick={this.callUser}/>
                            <Divider/>
                            <Grid.Row>
                                <Grid.Column >
                                    <video
                                        src={stream
                                        ? URL.createObjectURL(stream)
                                        : ""}
                                        autoPlay
                                        controls></video>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column color="green" width={8}>

                            {/*  <Grid.Row>
                                <Grid.Column width={4}>
                                    <button onClick={() => this.toggleCamera(true)}>On</button>
                                    <button onClick={() => this.toggleCamera(false)}>
                                        Off</button>
                                </Grid.Column>

                            </Grid.Row> */}
                            <Grid>
                                <Grid.Row columns={2}>
                                    {peerSteams.map(ps => <Grid.Column >
                                        <video width="200" height="200" src={URL.createObjectURL(ps)} autoPlay></video>
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
