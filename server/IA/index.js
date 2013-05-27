module.exports = function(){

	var maison = require('./maison.js'),
		personnage = require('./perso.js');

	var house = new maison();
	var perso = new personnage();
	

	var ia = {
		init: function(app,sio){
			persoCaract = {
				x:100,
				y:300,
				etage:1,
				sens:'droite',
				opacity:1,
				bgp:{
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
						},
					'arret':{
						1:'8% 1%'
					},
					'bas':{
						1:'8% 100%',
						2:'36% 100%',
						3:'65% 100%',
						4:'94% 100%',
					},
					'haut':{
						1:'8% 0%',
						2:'36% 0%',
						3:'65% 0%',
						4:'94% 0%',
					}
				}
			};
			app = app || {};
			sio = sio;
			sio.sockets.on('connection', function(socket){
				console.log('New user has connect!')
			})
			perso.init(sio,persoCaract);
		}
	}
	return ia;
}