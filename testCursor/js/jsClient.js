(function($){

	var socket = io.connect('http://localhost:1337');

	$('#user').submit(function(event){
		event.preventDefault();
		socket.emit('login', {
			name : $('#name').val(),
			mail : $('#mail').val()
		})
	})

	$('#msgs').submit(function(event){
		event.preventDefault();
		socket.emit('sendMsg', {
			msg : $('#msg').val()
		})
		$('#msg').val('');
		$('#msg').focus();
	})

	socket.on('logged',function(){
		$('#user').fadeOut();
		$('#msgs').fadeIn();
		$(document).mousemove(function(event){
			socket.emit('cursorUser', {
				X : event.clientX,
				Y : event.clientY
			})
		})
	})

	socket.on('creatSquare',function(cursor){
		$('body').append('<div class="pointer '+ cursor.id +'"></div>');
	})

	socket.on('newusr', function(user){
		$('#users').append('<img src="' + user.avatar + '" id="' + user.id + '">');
	})
	socket.on('newmsg', function(msg){
		console.log(msg);
		$('#messages').append('<p><b>' + msg.user.name + ' : </b>' + msg.txt + '</p>');
	})

	socket.on('disusr', function(user){
		$('#' + user.id).remove();
	})


	socket.on('moveCursor', function(cursor){
		//console.log(cursor)
		$('.pointer.'+ cursor.id).css({'left':cursor.X,'top':cursor.Y});
	})

})(jQuery);