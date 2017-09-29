module.exports = (server) => {
    // const db = require('monk')("") var rooms=db.get("rooms")
    var HashMap = require('hashmap');
    var io = require("socket.io")(server);
    var map = new HashMap();

    io.on("connection", (socket) => {
        console.log("connected")
        socket.on("message", ({msg,room}) => {
            
           try{
               var user= map.get(room).find(u=>u.sid==socket.id);
            io
            .to(room)
            .emit("message", {
                message: msg,
                id:user.id
            })
 
           }catch(err){
               console.error(err)
           }
           
        })
        socket.on("join", (roomname,id) => {

            var room = []
            if (map.has(roomname)) {
                room = map.get(roomname)
            }

            socket.join(roomname, (err) => {
                var user={id,sid:socket.id}
                socket
                .to(roomname)
                .emit("AddUser",user)
                room.forEach(peer=>{
                    socket.emit("AddUser",peer)
                })
                room.push(user)
                map.set(roomname, room)
            })
        })
        socket.on("disconnect", () => {
            map.forEach((room, name) => {
                map.set(name,room.filter(u=>u.sid!=socket.id))
                io.to(name).emit("RemoveUser",{sid: socket.id})
            })
        })
    })

}