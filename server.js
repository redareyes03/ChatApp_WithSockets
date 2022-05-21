const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const socket_io = require('socket.io')

const io = socket_io(server, {
    cors: {
        origin: '*'
    }
})




io.on('connection', (socket) => {
    socket.on('join', (user) => {
        io.emit('join', user);
        
        socket.on('new message', ( {message, user, id} ) => {
            io.emit('new message', {message, user, idUser: id});
        })
        socket.on('typing', (user) => {
            socket.broadcast.emit('typing', user)
        } )

        socket.on('stop typing', (user) => {
            io.emit('stop typing', user)
        })
    })

});

server.listen(3001);