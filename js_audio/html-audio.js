

$(document).ready(function(){

    var playing = false;
    var audio = $("audio").get(0);
    audio.src = url;
    audio.preload = 'none';

    audio.addEventListener("loadeddata", function(e){
        console.log(audio)
        console.log(audio.buffered.start(0), audio.buffered.end(0));
        audio.pause();
        // audio.src = "";
        // audio.load();
    })

    $('#play').on('click', function(){
        if(playing){
            audio.pause();
        } else {
            audio.play();
        }
        playing = !playing;
    });
    // audio.pause(0);
    // var tmp = audio.src;
    // audio.src = "";
    // audio.load();
    // $("audio").remove();
    //
    // $("#audio-player").html("<audio controls preload='none'></audio>");<br>
    // audio = $("audio").get(0);
    // audio.src = tmp;
    // audio.addEventListener('pause', current-function);


});
