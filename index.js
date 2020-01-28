const net = require('net');
const fs = require('fs');
const honeyPorts = [3389,445,139,23,3306];
const output = 'output.log';
let ips = new Set();
try{ 
	ips = new Set(fs.readFileSync('output.log').toString().split('\n'));
}catch(e){

}

const servers = honeyPorts.map(port=>{
	return net.createServer(socket=>{
		socket.on('data',data=>{
			const address = socket.remoteAddress.replace('::ffff:','');
			ips.add(address);
			console.log(address);
			socket.on('error',e=>{});
			//Sling their bullshit back at em
			try{
				socket.write(data);
			}catch(e){}
		});
	}).listen(port,()=>{
		console.log(`Listening on port ${port}`);
	});
});
setInterval(()=>{
	fs.writeFileSync(output,[...ips].join('\n'));
},1000*5);
