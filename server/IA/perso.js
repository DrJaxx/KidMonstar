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
		whichFloorAmI: function(){
			for(k in house.porte){
				if(persoCaract.y > house.porte[k].y){
					persoCaract.etage = k;
				}
			}
			console.log(persoCaract.etage)
		},
		walkstaires: function(){
			console.log(parseInt(persoCaract.etage)+1)
			if (persoCaract.etage==1) {
				down = true;
				up = false;
			}else if(persoCaract.etage == 5){
				up = true;
				down = false;
			}
			
			if(down == true || (persoCaract.y < (house.porte[(persoCaract.etage)].y+191) && (Math.round(Math.random()*1000) == 1))){
				persoCaract.y += 1;
				persoCaract.sens = 'haut'
				if(persoCaract.etage > 4){
					down = false;
					up = true; 
				}else if(persoCaract.y < (house.porte[parseInt(persoCaract.etage)+1].y+190)){
					down = true;
					if(persoCaract.y % 10 == 0){
						if(bgp>3){
							bgp = 1;
						}else{
							bgp += 1;
						}
					}
				}else{
					down = false;
					persoCaract.sens = 'gauche'
					this.whichFloorAmI();
					persoCaract.x = house.porte[(persoCaract.etage)].x;
					persoCaract.y = house.porte[(persoCaract.etage)].y + house.porte[(persoCaract.etage)].height - persoCaract.height;
				}
			}else if(up == true || persoCaract.y>(house.porte[(persoCaract.etage)].y+121)){	
				persoCaract.y -= 1;
				persoCaract.sens = 'bas';
				if(persoCaract.y>(house.porte[(persoCaract.etage)].y-191)){
					up = true;
					if(persoCaract.y % 10 == 0){
						if(bgp>3){
							bgp = 1;
						}else{
							bgp += 1;
						}
					} 
				}else{
					up = false;
					persoCaract.sens = 'gauche';
					this.whichFloorAmI();
					persoCaract.x = house.porte[(persoCaract.etage)].x;
					persoCaract.y = house.porte[(persoCaract.etage)].y + house.porte[(persoCaract.etage)].height - persoCaract.height;
				}
			}else{
				return false;
			}
		},
		inStaires:function(){
			if(persoCaract.x > 900){
				return true;
			}
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
				if(persoCaract.sens == 'haut' || persoCaract.sens == 'bas' || (Math.round(Math.random()*10) == 1) ){
					that.goToStaires();
				}else if((Math.round(Math.random()*1000) == 9 ) || stop === true){
					that.stop();
				}else{
					that.walk();
				}
				house.sync(persoCaract);
				io.sockets.emit('movement',persoCaract,bgp);
			},10)
		},
		goToStaires: function(){
			if(house.goIn()){
				persoCaract.x = 910;
				this.walkstaires();
			}else if(this.inStaires()){
				this.walkstaires();
			}
		}
	}
	return perso;
}