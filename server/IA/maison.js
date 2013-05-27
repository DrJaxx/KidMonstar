module.exports = function(){
	var house = {
		init : function(sio,persoCaract){
		},
		sync:function(persoCaract){
			persoCaract = persoCaract;
		},
		porte: {
			1:{
				x:555,
				y:110,
				width:130,
				height:250
			},
			2:{
				x:843,
				y:470,
				width:130,
				height:250,
			},
			3:{
				x:648,
				y:830,
				width:130,
				height:250
			},
			4:{
				x:864,
				y:1190,
				width:130,
				height:250
			},
			5:{
				x:845,
				y:1550,
				width:130,
				height:250
			}
		},
		goIn: function(){
			for(k in this.porte){
				if(persoCaract.x > this.porte[k].x && persoCaract.x < (this.porte[k].x + this.porte[k].width) && persoCaract.y > this.porte[k].y && persoCaract.y <= (this.porte[k].y + this.porte[k].height)){
				 	return true;
				}
			}
		},
		goOut: function(){

		},
		test: function(){
		}
	}
	return house;
}