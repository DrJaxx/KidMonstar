module.exports = function(){
	var house = {
		init : function(sio,persoCaract){
		},
		sync:function(persoCaract){
			persoCaract = persoCaract;
		},
		porte: {
			1:{
				x:300,
				y:0,
				width:100,
				height:360
			},
			2:{
				x:500,
				y:360,
				width:100,
				height:360,
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