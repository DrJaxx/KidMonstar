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
			etage = null;
			that = this;
			end = {
				'goTo':false,
				'walk':false,
				'walkTo':false,
				'walkStaires':false,
				'goAround':false,
				'goToStaires':false,
				'stop':false
			}
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
		walk: function(){
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
		walkTo: function(point){
			if(persoCaract.x < point){
				persoCaract.x += 1;
				persoCaract.sens = 'droite';
				if(persoCaract.x % 10 == 0){
					if(bgp>3){
						bgp = 1;
					}else{
						bgp += 1;
					}
				}
			}else if(persoCaract.x == point){
				return;
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
		whichFloorAmI: function(){
			for(k in house.porte){
				if(persoCaract.y > house.porte[k].y){
					persoCaract.etage = k;
				}
			}
		},
		walkStaires: function(){
			if(etage == null){
				if (persoCaract.etage==1) {
					down = true;
					up = false;
				}else if(persoCaract.etage > 4){
					up = true;
					down = false;
				}else{
					if ((Math.round(Math.random()*3) == 1)) {
						up = true;
						down = false;
					}
				}
				if(down == true || (persoCaract.y < (house.porte[(persoCaract.etage)].y+191) && (Math.round(Math.random()*10) == 1))){
					persoCaract.y += 1;
					persoCaract.sens = 'haut'
					if(persoCaract.etage > 4){
						down = false;
						up = true; 
					}else if(persoCaract.y < (house.porte[parseInt(persoCaract.etage)+1].y+180)){
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
						persoCaract.sens = 'gauche';
						return house.goOut();
					}
				}else if(up == true || persoCaract.y>(house.porte[(persoCaract.etage)].y+131)){	
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
						return house.goOut();
					}
				}
			}else if(etage != null){
				if(persoCaract.etage < etage){
					up = false;
					down = true;
				}else{
					down = false;
					up = true;
				}
				if(down == true){
					persoCaract.y += 1;
					persoCaract.sens = 'haut'
					if(persoCaract.y < (house.porte[etage].y+180)){
						down = true;
						if(persoCaract.y % 10 == 0){
							if(bgp>3){
								bgp = 1;
							}else{
								bgp += 1;
							}
						}
					}else{
						console.log('out')
						down = false;
						etage = null;
						persoCaract.sens = 'gauche';
						end.goTo = true;
						return house.goOut(),false;
					}
				}else if(up == true){	
					persoCaract.y -= 1;
					persoCaract.sens = 'bas';
					if(persoCaract.y>(house.porte[etage].y-191)){
						up = true;
						if(persoCaract.y % 10 == 0){
							if(bgp>3){
								bgp = 1;
							}else{
								bgp += 1;
							}
						} 
					}else{
						console.log('out')
						up = false;
						etage = null;
						end.goTo = true;
						persoCaract.sens = 'gauche';
						return house.goOut(),false;
					}
				}
			}
			else{
				return false;
			}
		},
		inStaires:function(){
			if(persoCaract.x > 900){
				return true;
			}
		},
		goTo:function(floor,action){
			etage = floor;
			this.goToStaires(etage);
		},
		goAround: function(){
			if(persoCaract.sens == 'haut' || persoCaract.sens == 'bas' || (Math.round(Math.random()*300) == 1) ){
				that.goToStaires();
			}else if((Math.round(Math.random()*1000) == 9 ) || stop === true){
				that.stop();
			}else{
				that.walk();
			}
		},
		goToStaires: function(){
			if(house.goIn()){
				persoCaract.x = 910;
				if(that.walkStaires()){
					return
				}
			}else if(that.inStaires()){
				if(that.walkStaires()){
					return
				}
			}else{
				perso.walkTo(house.porte[persoCaract.etage].x);
			}
		},
		test: function(){
			if (end.goTo == false) {
				this.goTo(4)
			}else{
				this.goAround();
			}
		}
	}
	return perso;
}