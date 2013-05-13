
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, io = require('socket.io')
	, path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

httpServer = http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

var position = {
	'x':100,
	'y':'52%',
	'sens':'droite',
	'bgp':{
		'droite':{
			1:'8% 67%',
			2:'36% 67%',
			3:'65% 67%',
			4:'94% 67%'
			},
		'gauche':{
			1:'8% 33%%',
			2:'36% 33%%',
			3:'65% 33%%',
			4:'94% 33%%'
			}
		}
	};
var limite = {};
var sio = io.listen(httpServer);

sio.sockets.on('connection', function(socket){
	console.log('Websocket has been connected');
	socket.emit('init', position);
	socket.on('infoWindow',function(req){
		limite = {
			height:req.height,
			width:(req.width-30)
		}
	})
})

var sens = true;
var bgp = 0;
var sensMarche = '';

setInterval(function(){
	console.log(limite)
	if(limite.width != null && limite.width==position['x']){
		position['x'] -= 1;
		sensMarche = 'droite';
		if(position['x']%10 == 0){
			if(bgp>4){
				bgp = 0;
			}else{
				bgp += 1;
			}
		}
		sens = false;
	}else if(limite.width != null && limite.width>0 && sens == true){
		position['x'] += 1;
		sensMarche = 'gauche';
	}
	else if(limite.width != null && position['x']<0 && sens == false){
		sens = true
	}else{
		position['x'] -= 1;
		sensMarche = 'droite';
	}
	sio.sockets.emit('movement',position,bgp,sensMarche);
	return position;
},10);  