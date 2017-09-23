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
            socket: null,
            events: [],
            members: [],
            username: "",
            isLeader:false
        }
        
    }

    componentDidMount() {

        //this.toggleCamera(true)
        var {name} = this.props.match.params
        var socket = io.connect(`http://localhost:5500/`)
        var peer = new Peer(socket.id, {
            host: 'localhost',
            port: 5500,
            path: '/peer'
        })
        peer.on('call', (call) => {
            alert("")
        })
        socket.emit("join", name,({isLeader,members})=>{
            this.getStream(stream=>{
                console.log('====================================');
                console.log(isLeader);
                console.log('====================================');
                if(isLeader){
                    peer.on('call', (call) => {
                        console.log("Call recieved")
                        call.answer(stream); // Answer the call with an A/V stream.
                        call.on('stream', (remoteStream) => {
                            this.setState({
                                remoteUrl: URL.createObjectURL(remoteStream)
                            })
                        });
                    });
                }else{
                    var leader=members[0]
                    var call=peer.call(leader, stream);
                    console.log("calling :" , leader)
                    console.log(call)
                    call.on('stream', function(remoteStream) {
                        alert("works")
                    })
                }
                this.setState({members})
            })
            
        })
        .on("message", this.appendMessage)
        .on("user_joined", this.appendMessage)
        .on("user_left", this.appendMessage)
        .on("member_update", (members) => {
            if(members.length>1){
                var leader=members[0]
                if(leader!=socket.id){
                   
                }
            }else{
                this.getStream(stream=>{})
                peer.on('call', (call) => {
                    console.log("Call recieved")
                    var {stream} = this.state
                    call.answer(stream); // Answer the call with an A/V stream.
                    call.on('stream', (remoteStream) => {
                        this.setState({
                            remoteUrl: URL.createObjectURL(remoteStream)
                        })
                    });
                });
                
            }
            this.setState({members})
        })
        this.setState({username:socket.id,socket, peer})
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
        if(this.state.stream){
            callback(this.state.stream)
        }else{
            navigator.getUserMedia({
              //  audio: true,
                video: true
            }, (stream)=>{
                this.setState({stream},()=>callback(this.state.stream))
            }, (err) => {})
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
                this.setState({
                    stream:null
                })
            }
        }

    }
    appendMessage = (event) => {
        console.log(this.state)
        var feed= document.querySelector("#eventBoard")
        this.setState({
            events: [
                ...this.state.events,
                event
            ]
        },()=>{
            feed.scrollTop=feed.scrollHeight
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
        var {stream}=this.state
        return (
            <div style={{minHeight:"300px"}} >
                <h3>{this.state.username}</h3>
                <Grid celled columns={3} style={{minHeight:"300px"}} >
                    <Grid.Row>
                        <Grid.Column color="red" width={3}>
                            <UserList
                                users={this
                                .state
                                .members
                                .filter(u => u != this.state.username)}
                                onClick={this.callUser}/>
                            <Divider/>
                            <Grid.Row>
                                <Grid.Column>
                                    <video src={stream?URL.createObjectURL(stream):""} autoPlay controls></video>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column color="green" width={8}>

                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <button onClick={() => this.toggleCamera(true)}>On</button>
                                    <button onClick={() => this.toggleCamera(false)}>
                                        Off</button>
                                </Grid.Column>

                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <video src={this.state.remoteUrl} autoPlay></video>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column color="teal" width={5}>
                            <div id="eventBoard" style={{overflowY: "scroll", height:"400px",background:"white" }} >
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
