const net = require('net');
const fs = require('fs');
const honeyPorts = [3389,445,139,23,3306];
const output = 'output.log';
const ips = new Set();

const servers = honeyPorts.map(port=>{
	return net.createServer(socket=>{
		socket.on('data',data=>{
			ips.add(socket.address().address);
			console.log(socket.address().address);
			//Sling their bullshit back at em
			socket.write(data);
		});
	}).listen(port);
});
setInterval(()=>{
	fs.writeFileSync(output,[...ips].join('\n'));
},1000*5);
