const socket = io.connect()

socket.io("mensaje",data =>{
    console.log(data)
})