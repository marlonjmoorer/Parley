var express=require("express")
var app =express();
var parser= require("body-parser")
var socket_io= require("socket.io")
var ExpressPeerServer = require('peer').ExpressPeerServer;
app.use(parser.urlencoded({extended:true}))
app.use(parser.json())

app.get("/",(req,res)=>{
    res.send("Test")
})
var server=app.listen(5500,()=>{
    console.log("ready")
})
var peerServer=ExpressPeerServer(server,{})
app.use("/peer",peerServer)
var io =socket_io(server);

peerServer.on("connection",(id)=>{
    console.log('====================================');
    console.log(id);
    console.log('====================================');
})


var rooms={}
io.on("connection",(socket)=>{
    console.log("connected")
    socket.emit("username",socket.id)
    socket.on("message",(msg)=>{
        var {rooms}=socket
        Object.keys(rooms).filter(key=>key!=socket.id).forEach(function(key) {
             io.to(key).emit("message",{message:msg,user:socket.id }) 
        });
       
    })
    socket.on("join",(roomname,done)=>{
        if(!rooms[roomname]){
            rooms[roomname]=[]
        }
        
        rooms[roomname].push(socket.id)
        socket.join(roomname,()=>{
            
            done({isLeader:rooms[roomname].length==1,members:rooms[roomname]})
            //io.to(roomname).emit("member_update",rooms[roomname])
            socket.to(roomname).emit("user_joined",{user:socket.id, message:`has joined the room`})
        })
    })
    socket.on("disconnect",()=>{
        
        Object.keys(rooms).forEach(function(key) {
             var people= rooms[key];
             if(people.includes(socket.id)){
                 io.to(key).emit("user_left",{user:socket.id, message:`has left the room`})
                 var index= people.indexOf(socket.id)
                 rooms[key].splice(index)
                 io.to(key).emit("member_update",rooms[key])
              
                 
             }
              
        });
        
    })
})