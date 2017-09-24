module.exports=(server)=>{
   const db = require('monk')("")
   var rooms=db.get("rooms")
   var HashMap = require('hashmap');
   var io= require("socket.io")(server);
   var map= new HashMap();
   
   io.on("connection",(socket)=>{
    console.log("connected")
    socket.on("message",(msg)=>{
        var {rooms}=socket
        Object.keys(rooms).filter(key=>key!=socket.id).forEach(function(key) {
             io.to(key).emit("message",{message:msg,user:socket.id }) 
        });
       
    })
    socket.on("join",(roomname,done)=>{
       
        var room=[]
        if(map.has(roomname)){
            room=map.get(roomname)
        }
        
        socket.join(roomname,()=>{
                room.push(socket.id)
                socket.to(roomname).emit("user_joined",{user:socket.id, message:`has joined the room`})
                socket.to(roomname).broadcast.emit("member_update",room)    
                done({peers:room,id:socket.id})
                map.set(roomname,room)
        })
    })
    socket.on("disconnect",()=>{
        map.forEach((room,name)=>{
            if(room.includes(socket.id)){
                io.to(name).emit("user_left",{user:socket.id, message:`has left the room`})
                var updatedList=room.filter(id=>id!=socket.id)
                map.set(name,updatedList)
                io.to(name).emit("member_update",updatedList)
            }
        })
    })
})

   

}