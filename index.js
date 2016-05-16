const net = require('net');

// sockets
const sockets = [];
const removeSocket = (socket) => {
    const index = sockets.indexOf(socket);
    sockets.splice(index, 1);
};

// server
const server = net.createServer();

server.on('connection', socket => {

    socket.setKeepAlive(true);
    socket.on('data', data => console.log(`[client] "${data}"`));
    socket.on('end', () => removeSocket(socket));
    socket.on('error', () => removeSocket(socket));

    sockets.push(socket);
});

server.listen(3000);

// send "ping"s
const sendPing = () => {
    sockets.forEach(socket => socket.write('ping'));
    schedulePing();
};
const schedulePing = () => setTimeout(sendPing, 1000);

sendPing();
