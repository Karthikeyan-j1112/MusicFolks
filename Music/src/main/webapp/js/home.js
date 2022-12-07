
var styleElement = document.createElement("style");



function myFunction() {
    var rhtSrl = document.getElementById("right");
    var rhtHead = document.getElementById("head");
    var x =(rhtSrl.scrollTop)/100;
    var a = "rgba(0,0,0,"+x+")";
    rhtHead.style.backgroundColor=a;
    styleElement.appendChild(document.createTextNode(".split-right::-webkit-scrollbar-track{ background:  linear-gradient( to bottom, "+a+" 0%, "+a+" 11vh, transparent 11vh,  transparent 100% );;}"));
    document.getElementsByTagName("head")[0].appendChild(styleElement);
}

function sign_up(){
    window.location.href="./register.html";
}
function log_in(){
    window.location.href="./Login.html";
}
function goAcc(){
    window.open("./Account.html",'_blank');
}

function logout(){
	var xmlHttp2 = new XMLHttpRequest();
	
	xmlHttp2.open("POST", "./logout?", true);
	xmlHttp2.send();
	xmlHttp2.responseType="text";
	xmlHttp2.onreadystatechange = function()
	{
	    if (xmlHttp2.readyState==4 && xmlHttp2.status ==200 )
	    {
			window.location.replace("./index.html")
		}
	}
}


function onld(){
	
	var xmlHttp1 = new XMLHttpRequest();
	
	xmlHttp1.open("POST", "./CheckLogin?", true);
	xmlHttp1.send();
	xmlHttp1.responseType="text";
	xmlHttp1.onreadystatechange = function(){
	    if (xmlHttp1.readyState==4 && xmlHttp1.status ==200 ){
			var obj = JSON.parse(xmlHttp1.responseText);
			console.log(obj.login);	
			var l ;
			if(obj.name.split(' ')[0].length>12)
			{
				l=obj.name.slice(0, 10)+"...";
			}
			else
			{
				l=obj.name.split(' ')[0];	
			}
			if(obj.login=="true")
			{				
				document.getElementById('head').innerHTML='<div class="sign_up"> <button class="sign_up_button" onclick="goAcc()">'+l+'&nbsp;<i class="fa-solid fa-up-right-from-square"></i></button></div><div class="log_in"><button class="log_button" onclick="logout()">Logout'
													    +'&nbsp; <i class="fa-solid fa-right-from-bracket"></i>'
  														+'</button>';
  														
      		}
      		else{
				var p= '<div class="details"><div class="track-art"><img class="track-image" src="music.png" alt = "Song Image" /></div><div class="track-name"></div><div class="track-artist"></div></div><div class="player" style="color:grey;"><div class="controls"><div class="random-track"><i class="fas fa-random fa-2x" title="random" style="color:grey;"></i></div><div class="prev-track" ><i class="fa fa-step-backward fa-2x" style="color:grey;"></i></div><div class="playpause-track" id="playpause" style="color:grey;"><i class="fa fa-play-circle fa-2x" style="color:grey;"></i></div><div class="next-track" ><i class="fa fa-step-forward fa-2x" style="color:grey;"></i></div><div class="repeat-track" ><i class="fa fa-repeat fa-2x" title="repeat" style="color:grey;"></i></div></div><div class="time"><div class="current-time" style="color:grey;">00:00</div><input type="range" min="1" max="100" value="0" class="seek_slider1" disabled style="color:grey;"><div class="total-duration" style="color:grey;">00:00</div></div></div><div class="volume" style="color:grey;"><i class="fa fa-volume-down" style="color:grey;"></i><input type="range" min="1" max="100" value="100" class="volume_slider1" disabled style="color:grey;"><i class="fa fa-volume-up" style="color:grey"></i> </div>';
				document.getElementById('footer').innerHTML=p;
			}
      		
		}
	};
	getsongs();	  
	
}

function getsongs()
{
	var xmlHttp1 = new XMLHttpRequest();
	
	xmlHttp1.open("POST", "./getSongs?", true);
	xmlHttp1.send();
	xmlHttp1.responseType="text";
	xmlHttp1.onreadystatechange = function(){
	    if (xmlHttp1.readyState==4 && xmlHttp1.status ==200 ){
			var obj1 = JSON.parse(xmlHttp1.responseText);
			var l='';
			for(var i=0; i<obj1.length; i++)
			{
				console.log(obj1[i].name);
				l+='<div class="songs" value="'+obj1[i].name +'"  ><img class="song_img" src=\''+obj1[i].song_image+'\' alter="song"/><a>'
					+obj1[i].name+'</a><a>'
					+obj1[i].artist+'</a><i class="fa-solid fa-circle-play playit" onclick="play(this)" id="'+obj1[i].name+'" ></i></div>';
			}
			document.getElementById('content').innerHTML=l;			
		}
	}
}


function play(b)
{
	loadTrack(b.id);
}


let track_art = document.getElementsByClassName('track-art')[0];
let track_name = document.getElementsByClassName('track-name')[0];
let track_artist = document.getElementsByClassName('track-artist')[0];

let playpause_btn = document.getElementsByClassName('playpause-track')[0];
let next_btn = document.getElementsByClassName('next-track')[0];
let prev_btn = document.getElementsByClassName('prev-track')[0];

let seek_slider = document.getElementsByClassName('seek_slider')[0];
let volume_slider = document.getElementsByClassName('volume_slider')[0];
let curr_time = document.getElementsByClassName('current-time')[0];
let total_duration = document.getElementsByClassName('total-duration')[0]
let wave = document.getElementById('wave');
let randomIcon = document.getElementsByClassName('fa-random')[0];
let curr_track = document.createElement('audio');

let isPlaying = false;
let isRandom = false;
let updateTimer=0;
let track_index = 0;

function loadTrack(a){
	var xmlHttp1 = new XMLHttpRequest();
	var l='';
	xmlHttp1.open("POST", "./getSongLink?song="+a, true);
	xmlHttp1.send();
	xmlHttp1.responseType="text";
	xmlHttp1.onreadystatechange = function(){
	    if (xmlHttp1.readyState==4 && xmlHttp1.status ==200 ){
			var obj1 = JSON.parse(xmlHttp1.responseText);			
			curr_track.src ='http://drive.google.com/uc?export=view&id='+obj1.link;		
			document.getElementsByClassName('track-image')[0].src=obj1.image;
			document.getElementsByClassName('track-artist')[0].textContent =obj1.artist;
		}
	}
    clearInterval(0);
    reset();         
    curr_track.load();
    
    document.getElementsByClassName('track-name')[0].textContent = a;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);    
}

function reset(){
    document.getElementsByClassName('current-time')[0].textContent = "00:00";
    document.getElementsByClassName('total-duration')[0].textContent = "00:00";
    document.getElementsByClassName('seek_slider')[0].value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    document.getElementsByClassName('fa-random')[0].classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    document.getElementsByClassName('fa-random')[0].classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    document.getElementsByClassName('track-art')[0].classList.add('rotate');    
    document.getElementsByClassName('playpause-track')[0].innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    document.getElementsByClassName('track-art')[0].classList.remove('rotate');    
    document.getElementsByClassName('playpause-track')[0].innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (document.getElementsByClassName('seek_slider')[0].value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = document.getElementsByClassName('volume_slider')[0].value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        document.getElementsByClassName('seek_slider')[0].value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        document.getElementsByClassName('current-time')[0].textContent = currentMinutes + ":" + currentSeconds;
        document.getElementsByClassName('total-duration')[0].textContent = durationMinutes + ":" + durationSeconds;
    }
}