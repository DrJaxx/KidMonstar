(function($){

	var socket = io.connect('http://localhost:3000');

	socket.on('init',function(position){
		$('div.container').append('<div class="perso"></div>')
		$(document.querySelector('.perso')).css({'background-color':position['color'],'top':position['y'],'margin-left':position['x']})
	})

	socket.on('movement', function(position,bgp,sensMarche){
		$(document.querySelector('.perso')).css({'background-color':position['color'],'top':position['y'],'margin-left':position['x'],'background-position':position['bgp'][sensMarche][bgp]})
	})


})(jQuery);