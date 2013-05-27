module.exports = function(){
	var maison = require('./maison.js');
	var house = new maison();
	var perso = {
		init: function(sio, persoCaract){
			io = sio;
			persoCaract = persoCaract;
			limite = {
				height:1000,
				width:(900-35)
			};
			io.sockets.on('connection', function(socket){
				console.log('Websocket has been connected');
				socket.emit('init', persoCaract);
			})
			bgp = 1;
			persoCaract.sens = '';
			stop = false;
			iStop = 0;
			down = false;
			up = false;
			this.go();
		},
		stop: function(){
				persoCaract.sens = 'arret';
				bgp = 1;
				stop = true;
				if(iStop<100){
					iStop += 1;
				}else{
					iStop = 0;
					stop = false;
					if ((Math.round(Math.random()*2) == 1 )) {
						persoCaract.sens = 'gauche';
					}else{
						persoCaract.sens = 'droite';
					}
				}
		},
		walk:function(){
			if(limite.width != null && limite.width==persoCaract.x){
				persoCaract.x -= 1;
				persoCaract.sens = 'gauche';
				if(persoCaract.x % 10 == 0){
					if(bgp>3){
						bgp = 1;
					}else{
						bgp += 1;
					}
				}
			}else if(limite.width != null && limite.width>0 && persoCaract.sens == 'droite'){
				persoCaract.x += 1;
				persoCaract.sens = 'droite';
				if(persoCaract.x % 10 == 0){
					if(bgp>3){
						bgp = 1;
					}else{
						bgp += 1;
					}
				}
			}else if(limite.width != null && persoCaract.x<0 && persoCaract.sens == 'gauche'){
				persoCaract.sens = 'droite';
				if(persoCaract.x % 10 == 0){
					if(bgp>3){
						bgp = 1;
					}else{
						bgp += 1;
					}
				}
			}else{
				persoCaract.x -= 1;
				persoCaract.sens = 'gauche';
				if(persoCaract.x % 10 == 0){
					if(bgp>3){
						bgp = 1;
					}else{
						bgp += 1;
					}
				}
			}		
		},
		godownstaires: function(){
			persoCaract.x = 0;
			persoCaract.y += 1;
			persoCaract.sens = 'etage'
			if(persoCaract.y<655){
				down = true;
				if(persoCaract.y % 10 == 0){
					if(bgp>3){
						bgp = 1;
					}else{
						bgp += 1;
					}
				}
			}else{
				persoCaract.sens = 'droite'
				down = false;
			}
		},
		walkstaires: function(){
			if(down == true || persoCaract.y<301){
				persoCaract.y += 1;
				persoCaract.sens = 'haut'
				if(persoCaract.y<655){
					down = true;
					if(persoCaract.y % 10 == 0){
						if(bgp>3){
							bgp = 1;
						}else{
							bgp += 1;
						}
					}
				}else{
					persoCaract.sens = 'droite'
					down = false;
				}
			}else if(up == true || persoCaract.y>299){	
				persoCaract.x = 0;
				persoCaract.y -= 1;
				persoCaract.sens = 'bas';
				if(persoCaract.y>300){
					up = true;
					if(persoCaract.y % 10 == 0){
						if(bgp>3){
							bgp = 1;
						}else{
							bgp += 1;
						}
					}
				}else{
					persoCaract.sens = 'droite'
					up = false;
				}
			}else{
				return false;
			}
			console.log('wtf')
			console.log(down)
			console.log(persoCaract.y)
		},
		goupstaires: function(){
			persoCaract.x = 0;
			persoCaract.y -= 1;
			persoCaract.sens = 'etage'
			if(persoCaract.y>300){
				up = true;
				if(persoCaract.y % 10 == 0){
					if(bgp>3){
						bgp = 1;
					}else{
						bgp += 1;
					}
				}
			}else{
				persoCaract.sens = 'droite'
				up = false;
			}
		},
		goTo:function(){

		},
		go: function(){
			that = this;
			setInterval(function(){
				if((Math.round(Math.random()*1000) == 9 ) || stop === true){
					that.stop();
				}else if(persoCaract.sens == 'haut' || persoCaract.sens == 'bas' || (persoCaract.x<40 && (Math.round(Math.random()*100) == 1) )){
				}else{
					that.walk();
				}
				house.sync(persoCaract);
				io.sockets.emit('movement',persoCaract,bgp);
				that.goToStaires();
			},10)
		},
		goToStaires: function(){
			if(house.goIn()){
				persoCaract.opacity = 0;
				persoCaract.x = 865;
				this.walkstaires();
			}else{
				persoCaract.opacity = 1;
			}
		}
	}
	return perso;
}