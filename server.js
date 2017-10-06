var express=require("express")
var app =express();
var parser= require("body-parser")
var ExpressPeerServer = require('peer').ExpressPeerServer;


app.use(parser.urlencoded({extended:true}))
app.use(parser.json())


var server=app.listen(5500,()=>{
    console.log("ready")
})
var peerServer=ExpressPeerServer(server)
var io=require('./io')(server);


app.use("/peer",peerServer)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

peerServer.on("connection",(id)=>{
    console.log('====================================');
    console.log(id);
    console.log('====================================');
})

