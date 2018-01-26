var musicXML;
var song;
var clickHandler = "click";
$(document).ready(function(){
	if ('ontouchstart' in document.documentElement) {
	  	clickHandler = "touchend";
	}
	$.ajax({
		url: "data/music-tracks.xml",
		dataType: "xml",
		success: function(data){
			if (typeof data == "string" && window.ActiveXObject) {
				musicXML = new ActiveXObject("Microsoft.XMLDOM");
				musicXML.async = false;
				musicXML.loadXML(data);
			} else {
				musicXML = data;
			}
			loadTracks();
		}
	});
});

function loadTracks(){
	currentTrackNo = 1;
	trackCount = $(musicXML).find("tracksList").attr("count");
	currentTrackTitle = $(musicXML).find("track[id='"+currentTrackNo+"']").find("track_title").text();
	currentTrackArtist = $(musicXML).find("track[id='"+currentTrackNo+"']").find("track_artist").text();
	currentTrackCover = $(musicXML).find("track[id='"+currentTrackNo+"']").find("track_cover").text();
	currentTrackSrc = $(musicXML).find("track[id='"+currentTrackNo+"']").find("track_src").text();
	slider = new Slider('#seekBar');
	slider.disable();
	$(".musicTitle").html(currentTrackTitle);
	$(".artistName").html(currentTrackArtist);
	$(".artHolder img").attr("src", 'music-tracks/'+currentTrackCover);
	song = new Audio('music-tracks/'+currentTrackSrc);
	song.id="myAudio";
	enableControls();
}

function enableControls(){
	$('#playtoggle').unbind().bind(clickHandler, function(e) {
		e.preventDefault();
		slider.enable();
		slider.options.max = parseInt(song.duration);
		if(!song.paused){
			song.pause();
			$('#playtoggle').removeClass("glyphicon-pause").addClass("glyphicon-play");
		}else{
			song.play();
			$('#playtoggle').removeClass("glyphicon-play").addClass("glyphicon-pause");
		}
	});
	song.addEventListener('timeupdate',function (){
		currtime = parseInt(song.currentTime);
		if(currtime<60){
			minDone = '00';
			secDone = currtime;
			if(secDone<10){
				secDone = '0'+secDone;				
			}
		}else{
			tempCurr = ((currtime/60)+'').split('.');
			minDone = parseInt(tempCurr[0]);
			secDone = currtime-minDone*60;
			if(minDone<10){
				minDone = '0'+minDone;				
			}
			if(secDone<10){
				secDone = '0'+secDone;				
			}
		}
		$(".timeDone").html(minDone+':'+secDone);

		timeLeft = parseInt(song.duration-song.currentTime);
		if(timeLeft<60){
			minLeft = '00';
			secLeft = timeLeft;
			if(secLeft<10){
				secLeft = '0'+secLeft;				
			}
		}else{
			tempLeft = ((timeLeft/60)+'').split('.');
			minLeft = parseInt(tempLeft[0]);
			secLeft = timeLeft-minLeft*60;
			if(minLeft<10){
				minLeft = '0'+minLeft;				
			}
			if(secLeft<10){
				secLeft = '0'+secLeft;				
			}
		}
		$(".timeLeft").html('-'+minLeft+':'+secLeft);
		slider.setValue(currtime);
		if(song.currentTime>=song.duration){
			$('#playtoggle').removeClass("glyphicon-pause").addClass("glyphicon-play");
			playNxtSong();
		}
		if(!song.paused){
			$('#playtoggle').removeClass("glyphicon-play").addClass("glyphicon-pause");
		}else{
			$('#playtoggle').removeClass("glyphicon-pause").addClass("glyphicon-play");
		}
	});
	slider.on("change",function(){
		song.currentTime = slider.getValue();
	});
	$(".nxtTrack").unbind().bind(clickHandler, function(){
		playNxtSong();
	});
	$(".preTrack").unbind().bind(clickHandler, function(){
		playPreSong();
	});
}
function playNxtSong(){
	if (currentTrackNo>=trackCount) {
		currentTrackNo = 1;
	}else{
		currentTrackNo++;
	}
	playNewSong(currentTrackNo);
}
function playPreSong(){
	if (currentTrackNo<=1) {
		currentTrackNo = trackCount;
	}else{
		currentTrackNo--;
	}
	playNewSong(currentTrackNo);
}
function playNewSong(currentTrackNo){
	slider.enable();
	currentTrackTitle = $(musicXML).find("track[id='"+currentTrackNo+"']").find("track_title").text();
	currentTrackArtist = $(musicXML).find("track[id='"+currentTrackNo+"']").find("track_artist").text();
	currentTrackCover = $(musicXML).find("track[id='"+currentTrackNo+"']").find("track_cover").text();
	currentTrackSrc = $(musicXML).find("track[id='"+currentTrackNo+"']").find("track_src").text();
	$(".musicTitle").html(currentTrackTitle);
	$(".artistName").html(currentTrackArtist);
	$(".artHolder img").attr("src", 'music-tracks/'+currentTrackCover);
	song.src = "music-tracks/"+currentTrackSrc;
	song.load();
	song.play();
	setTimeout( function(){
		slider.options.max = parseInt(song.duration);
	},2000);
}

