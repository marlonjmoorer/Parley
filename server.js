var express=require("express")
var app =express();
var parser= require("body-parser")
var ExpressPeerServer = require('peer').ExpressPeerServer;


app.use(parser.urlencoded({extended:true}))
app.use(parser.json())


var server=app.listen(5500,()=>{
    console.log("ready")
    var o=require('os')
   var name=server.address()
   name;
})
var peerServer=ExpressPeerServer(server,{})
var io=require('./io')(server);


app.use("/peer",peerServer)


 

peerServer.on("connection",(id)=>{
    console.log('====================================');
    console.log(id);
    console.log('====================================');
})



