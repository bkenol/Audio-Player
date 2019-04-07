var playButton = document.getElementById("playButton");
var nextButton = document.getElementById("nextButton");
var prevButton = document.getElementById("prevButton");
var shufButton = document.getElementById("shuffleButton");
var stopButton = document.getElementById("stopButton");
var currIndex = 0;
var music = document.getElementById('music');
var albumCover = document.getElementById('album');
var title = document.getElementById('title');
var myQueue = document.getElementById('playlist');

var playhead = document.getElementById('playhead');
var timeline = document.getElementById('timeline'); 
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

function Song(songName, source, image) {
	this.songName = songName;
	this.source = source;
	this.image = image;
}
var song1 = new Song("Honeymoon Avenue", "Music/HoneymoonAvenue.mp3", "https://is2-ssl.mzstatic.com/image/thumb/Music62/v4/65/eb/91/65eb9115-6776-35a8-e8b8-b03adbb4acff/dj.geetznpt.jpg/600x600bf.png");
var song2 = new Song("Stitches", "Music/Stitches.mp3", "https://is4-ssl.mzstatic.com/image/thumb/Music69/v4/c9/96/7d/c9967d08-dba0-e621-36e3-a61047880381/UMG_cvrart_00602547799005_01_RGB72_1500x1500_15UMGIM06404.jpg/1200x630bb.jpg");
var song3 = new Song("Demons", "Music/Demons.mp3", "https://is2-ssl.mzstatic.com/image/thumb/Music/v4/04/15/78/04157815-169d-9f91-d596-342dee2f4c46/UMG_cvrart_00602537150120_01_RGB72_1200x1200_12UMGIM46901.jpg/1200x630bb.jpg");
var song4 = new Song("Red", "Music/Red.mp3", "https://m.media-amazon.com/images/I/41j7-7yboXL._SR500,500_.jpg");
var song5 = new Song("Why Try", "Music/WhyTry.mp3", "https://is5-ssl.mzstatic.com/image/thumb/Music4/v4/52/1b/90/521b904e-6fe1-e54d-97dc-b515983f4f21/UMG_cvrart_00602537939497_01_RGB72_1500x1500_14UMGIM28138.jpg/268x0w.jpg");
var playlist = [song1, song2, song3, song4, song5];

//allows user to adjust the volume of the player
window.SetVolume = function(val){
    var loudness = document.getElementById('music');
    // console.log('Before: ' + music.volume);
    music.volume = val / 100;
    // console.log('After: ' + music.volume);
}

//allows user to select the song they want from the list of songs
function songSelect(user){
	console.log(user);
	music.pause();
	currIndex = user;
	albumCover.src = playlist[currIndex].image;
	title.innerHTML = playlist[currIndex].songName;
	music.src = playlist[currIndex].source;
	if (music.paused) {
	        music.play();
	} else { // pause music
        music.pause(); 
    }
	music.play();
	playButton.src= "pause.png";
}

function makeSongSelectCallBack(index){
	return function(){ 
		songSelect(index);
	};
}

//creates the list of songs in the order they will be played
function queue(array){
	for (var i = 0; i < array.length; i++){
		let elem = document.createElement("li");
		elem.setAttribute("class", "item");
		elem.setAttribute("id", "song"+i);
		elem.onclick = makeSongSelectCallBack(i);
		var node = document.createTextNode((i+1) + ". " + array[i].songName);
		elem.appendChild(node);
		myQueue.appendChild(elem);
	}
}

//function to play song
function play(){
	if(music.paused && currIndex < playlist.length){
		playButton.src= "pause.png";
		music.play();
	}
	else{
		playButton.src= "play.png";
		music.pause();
	}
	albumCover.src = playlist[currIndex].image;
	title.innerHTML = playlist[currIndex].songName;
}

//shuffle the songs in the playlist
var shuffle = function (array) {
	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	for (var i = array.length-1; i>=0; i--) {
		randomIndex = Math.floor(Math.random() * (i+1));
		var itemAtIndex = array[randomIndex];
		array[randomIndex] = array[i];
		array[i] = itemAtIndex;
		albumCover.src = array[i].image;
		title.innerHTML = array[i].songName;
	}
	playlist = array;
	changeQueue(array);
	songSelect(currIndex);
	return array;

};

//changes the song list in the html
function changeQueue(array){
	for (var i = 0; i < array.length; i++) {
		var temp = document.getElementById("song" + i);
		temp.innerHTML = (i+1) + ". " + array[i].songName;
	}
}

function stop(){
    playButton.src= "play.png";
    var temp = music.src;
    music.src = " ";
    music.src = temp;
    music.pause();
}

//jukebox class that contains the basic functions of a music player
class Jukebox{
	constructor(){
		albumCover.src = playlist[currIndex].image;
		title.innerHTML = playlist[currIndex].songName;
		music.src = playlist[currIndex].source;
		music.pause();
	}
	play(){
		music.src = playlist[currIndex].source;
	}
	next(){
		if (currIndex < playlist.length-1){
			console.log(currIndex);
			playButton.src= "play.png";
			music.pause();
			currIndex++;
			music.src = playlist[currIndex].source;
			play();
		}
	}
	prev(){
		if(currIndex > 0){
			console.log(currIndex);
			playButton.src= "play.png";
			music.pause();
			currIndex--;
			music.src = playlist[currIndex].source;
			play();
		}
	} //end prev
	shuffle(){
		shuffle(playlist);
	}
} //end class

queue(playlist);
var myJukebox = new Jukebox();

playButton.addEventListener("click", play);
nextButton.addEventListener("click", myJukebox.next);
prevButton.addEventListener("click", myJukebox.prev);
shufButton.addEventListener("click", myJukebox.shuffle);
stopButton.addEventListener("click", stop);

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#Creating_closures_in_loops.3A_A_common_mistake
//https://teamtreehouse.com/community/for-loops-onclick