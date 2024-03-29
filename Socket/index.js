const io = require('socket.io')(8800,{
    cors: {
        origin: "http://localhost:3000"
    }
})

let activeUsers = []


io.on("connection",(socket)=>{
    // add new User
    socket.on('new-user-add',(newUserId)=>{
        // if user is not added previously
        if(!activeUsers.some((user)=>user.userId===newUserId)){
            // if user is not already regsitered to any of the socket
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        console.log("Connected Users",activeUsers)
        // send sth towards the other side
        io.emit('get-users',activeUsers)

    })

    // send message
    socket.on("send-message",(data)=>{
        const {receiverId} = data;
        const user = activeUsers.find((user)=>user.userId=== receiverId)
        console.log("Sending from socket to: ",receiverId)
        console.log("Data",data)
        // if user(ReceiverId) is currently in the activeUser
        if(user){
            io.to(user.socketId).emit("receive-message",data)
        }
    })

    socket.on('disconnect',()=>{
        // from all the user from activeUsers filter out the data who wants to disconnect
        activeUsers = activeUsers.filter((user)=>user.socketId!==socket.id)
        console.log("User Disconnected",activeUsers)
        io.emit('get-users',activeUsers)
    })
})