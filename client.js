const net = require('net');

const client = net.connect({ port: 3000 });

client.on('data', data => {
    console.log(`[server] "${data}"`);
    client.write('acknowledged');
});

client.on('end', () => {
    console.log('disconnected from server');
});