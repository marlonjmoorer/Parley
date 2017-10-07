module.exports = (server) => {
    // const db = require('monk')("") var rooms=db.get("rooms")
    var HashMap = require('hashmap');
    var io = require("socket.io")(server);
    var map = new HashMap();
    var users={}

    io.on("connection", (socket) => {
        console.log("connected")
        socket.on("message", ({text,room,username}) => {
            
           try{
                var user= map.get(room).find(u=>u.sid==socket.id);
                io.to(room).emit("message", {
                    text,
                    username,
                    date:new Date().toLocaleDateString()
                })
 
           }catch(err){
               console.error(err)
           }
           
        })
        socket.on("mute",(id,roomname)=>{
            var user= map.get(roomname).find(u=>u.username==id)
            if(user){
                io.to(user.sid).emit("mute")
            }
        })
        socket.on("join", ({roomname,username}) => {

            var room = []
            if (map.has(roomname)) {
                room = map.get(roomname)
            }

            socket.join(roomname, (err) => {
                var user=users[socket.id]={username,sid:socket.id}
                socket.to(roomname).emit("AddUser",user)
                /* room.forEach(peer=>{
                    socket.emit("AddUser",peer)
                }) */
                room.push(user)
                map.set(roomname, room)
            })
        })
        socket.on("disconnect", () => {
            map.forEach((room, name) => {
                var user= room.find(u=>u.sid==socket.id)
                map.set(name,room.filter(u=>u.sid!=socket.id))
                io.to(name).emit("RemoveUser",user)
            })
        })
    })

}