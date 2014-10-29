$(document).ready(function(){
  if('webkitAudioContext' in window) {
    var myAudioContext = new webkitAudioContext();
  } else {
    var myAudioContext = new AudioContext();
  }

  // Add a list of song URLs here, the
  // audio download must be CORS compatible
  var songUrls = ['t.mp3'];

  // store the buffered songs
  var songData = [];

  var playing = false;

  // which song in the playlist
  var trackNumber = 0;
  var source;

  var play = function(){
    playing = true;

    // Create a new Audio buffer source and start playing
    source = myAudioContext.createBufferSource();
    source.buffer = songData[trackNumber].buffer;
    source.connect(myAudioContext.destination);
    source.start(0);
  };

  // stop playing
  var pause = function(){
    playing = false;
    source.noteOff(0);
  }

  // skip to the next track
  var skip = function(){
    trackNumber = (trackNumber + 1) % songUrls.length;
    pause();
    play();
  };

  $(':button').prop('disabled', true);

  $('#play').on('click', function(){
    if(playing){
      pause();
    } else {
      play();
    }
  });

  $('#skip').on('click', skip);

  // buffer all the song files first
  async.map(songUrls, function(url, cb){
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.addEventListener('load', function(event){
      try {
        console.log(event)
        var request = event.target;
        var source = myAudioContext.createBufferSource();
        source.buffer = myAudioContext.createBuffer(request.response, false);
        return cb(null, source);
      } catch (err){
        return cb(err);
      }
    }, false);
    request.send();

  },function(err, result){
    if(err) {
      $('#message').text("Error Buffering: " + err);
      return;
    }
    songData = result;
    $(':button').prop('disabled', false);
    $('#message').text("Buffered!")
  });

});
