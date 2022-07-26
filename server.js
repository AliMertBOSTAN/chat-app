const express = require('express')
const socket = require('socket.io')

const app = express()
const server = app.listen(3000)

app.use(express.static('public'))

var hstry = []

//server tanımlaması
const io = socket(server)
//bağlantı gerçekleşmesi durumdan algılama
io.on('connection', (socket) => {
    console.log(socket.id)
    //chat dinleniyor gelen datalar alınıyor
    socket.on('chat', data => {
        //gelen datalar bütün bağlantılara gönderiliyor
        //https://socket.io/docs/v3/emit-cheatsheet/
        socket.emit('chat', data)
        //100 data tutan arr
        if (hstry.length < 100) { hstry.push(data) }
        else {
            hstry.push(data);
            hstry.reverse();
            hstry.pop();
            hstry.reverse();
        }
        console.log(socket.id + 'message: ' + data);
        socket.emit("disconnecting");
    })

    /*
    socket.on('typing', data => {
        // https://socket.io/docs/v3/broadcasting-events/
        socket.emit('typing', data)
        console.log(hstry.length)
        hstry.push(data)

    })*/
})