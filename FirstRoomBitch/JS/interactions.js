var duration; 
document.addEventListener("DOMContentLoaded", init, false);

function init()
{
	//Get video and size it
	var video = document.getElementById("video");
	console.log(video);
	video.style.height = window.innerHeight+'px';
	window.addEventListener("resize", updateVideoSize, false);
	
	
	//Get controls and manage them
	var controls = document.getElementById("controls");
	controls.style.width = video.innerWidth +'px';
	controls.addEventListener("click", playPause, false);
	
	//Start beginning video
	video.load();
	video.addEventListener("canplaythrough", launchVideo , false)
	
	//timebar
	setInterval(updateProgress, 250);
	document.querySelector('#progressBar').addEventListener('click',reach,false);

	
		
	
}

function updateVideoSize()
{
		video.style.height = window.innerHeight+'px';
}
function reach(e){
	var target=e.currentTarget;
	var targetW=target.offsetWidth;
	var x=e.pageX-target.offsetLeft;
	video.currentTime = (x/targetW)*duration
	


}
function launchVideo()
{
		video.play()
		video.className = controls.className = "played";
		duration=video.duration;
}

function playPause(e){
if(video.paused)
{
	video.play();
	controls.className = "played"
	
}
else
{
	video.pause();
	controls.className = "paused"
}
e.preventDefault();
	

}

function updateProgress(){
	var width=(video.currentTime/duration)*100;
	document.querySelector('#progressBar span').style.width=width+'%';
	
}