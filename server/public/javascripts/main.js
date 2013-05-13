(function($){

	var socket = io.connect('http://localhost:3000');
	var kreature = 
	
	socket.on('init',function(position){
		$('div.container').append('<div class="perso"></div>')
		console.log($(document.querySelector('.perso')))
		$(document.querySelector('.perso')).css({'background-color':position['color'],'bottom':position['y'],'margin-left':position['x']})
	})

	socket.on('movement', function(position,bgp,sensMarche){
		console.log(position['bgp'][sensMarche][bgp])
		console.log(sensMarche)
		console.log(bgp)
		$(document.querySelector('.perso')).css({'background-color':position['color'],'bottom':position['y'],'margin-left':position['x'],'background-position':position['bgp'][sensMarche][bgp]})
		socket.emit('infoWindow',{height:window.innerHeight,width:window.innerWidth});
	})

})(jQuery);