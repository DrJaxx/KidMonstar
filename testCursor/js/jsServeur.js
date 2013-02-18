var http = require('http');
var md5 = require('MD5');


httpServer = http.createServer(function(req, res){
	console.log('Connection made');
});

httpServer.listen(1337);

var io = require('socket.io').listen(httpServer);
var users = {};
var msgs = {};
var imsg = 0;

io.sockets.on('connection', function(socket){
	var me = false;
	var msg= {};

	for(var k in users){
		socket.emit('newusr', users[k]);
	}
	for(var k in msgs){
		socket.emit('newmsg', msgs[k]);
	}

	socket.on('login', function(user){
		me = user;
		me.id = user.mail.replace('@','-').replace('.','-');
		me.avatar = 'https://gravatar.com/avatar/' + md5(user.mail) + '?s=50';
		users[me.id] = me;
		io.sockets.emit('creatSquare', users[me.id]);
		socket.emit('logged', users[me.id]);
		io.sockets.emit('newusr', me);
	})
	socket.on('sendMsg', function(message){
		imsg += 1;
		msg.id = imsg;
		msg.txt = message.msg;
		msg.user = me;
		msgs[msg.id] = msg;
		io.sockets.emit('newmsg', msg);
	})

	socket.on('cursorUser', function(cursor){
		cursor.id = me.id;
		console.log(cursor);
		io.sockets.emit('moveCursor', cursor);
	})

	socket.on('disconnect', function(){
		if(!me){
			return false;
		}
		delete users[me.id];
		io.sockets.emit('disusr', me);
	})
})