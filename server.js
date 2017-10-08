var express=require("express")
var app =express();
var parser= require("body-parser")
var ExpressPeerServer = require('peer').ExpressPeerServer;
var path=  require('path')
var port=process.env.PORT||5000

app.use(parser.urlencoded({extended:true}))
app.use(parser.json())


var server=app.listen(port,()=>{
    console.log("ready")
})
var peerServer=ExpressPeerServer(server)
var io=require('./io')(server);


app.use("/peer",peerServer)

if(process.env.NODE_ENV=='production'){
    app.use (function (req, res, next) {
      var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
      if (schema === 'https') {
        next();
      } else {
        res.redirect('https://' + req.headers.host + req.url);
      }
    });
};

app.use(express.static('build'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
});
peerServer.on("connection",(id)=>{
    console.log('====================================');
    console.log(id);
    console.log('====================================');
})

