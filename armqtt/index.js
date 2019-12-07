//import express 
var express = require('express');
//create express object named app
var app = express();


//instantiate a server on port 3000
var server = app.listen(3000);
var io = require('socket.io')(server);

const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort("/dev/cu.SLAB_USBtoUART", {
    baudRate: 9600
});

//expose the local public folder for inluding files js, css etc..
app.use(express.static('public'));

//on a request to / serve index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index2.html');
});

const parser = port.pipe(new Readline({
    delimiter: "\r\n"
}));

parser.on("data", function (data) {
    console.log(data);
    io.sockets.emit('data', data);
});
