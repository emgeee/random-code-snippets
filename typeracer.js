
// Beat typeracer!
// this is a little script that can be copy+pasted into the console
// on typerace.net and auto beat it for you

// Include jQuery
var jq = document.createElement('script');
jq.src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

// wait for jQuery to be loaded
function defer(method) {
  if (window.$){
    method();
  } else {
    setTimeout(function() { defer(method)  }, 100);
  }
}

// constantly check to see if the race has started
function beginRace(raceFunc){
  if($(".arrowPopup").length === 0){
    setTimeout(function(){
      beginRace(raceFunc);
    }, 100);
  } else {
    raceFunc();
  }
}

defer(function(){
  var textField = window.$('input.txtInput');
  var enterWord = function(currentWord){
    textField.val(currentWord);

    // pressing enter is hard...
    var press = jQuery.Event("keypress");
    press.bubbles = true;
    press.cancelable = true;
    press.charCode = 32;
    press.currentTarget = textField[0];
    press.eventPhase = 2;
    press.keyCode = 32;
    press.returnValue = true;
    press.srcElement = textField[0];
    press.target = textField[0];
    press.type = "keypress";
    press.view = Window;
    press.which = 32;
    textField.trigger(press);
  };

  var race = function(array, speed){
    enterWord(array[0]);
    array.shift();

    if(array.length > 0){
      setTimeout(function(){
          race(array, speed);
        }, speed)
    }
  };

  beginRace(function(){

    var textElem = window.$('[id^=nhwRightgwt-uid-]');
    var textContent = textElem.text();
    var text = textContent.split(' ');
    var startWord = window.$('[id^=nhwMiddlegwt-uid-]').text();
    var startComma = window.$('[id^=nhwMiddleCommagwt-uid-]').text();

    text.shift();
    text.pop();
    text.unshift(startWord + startComma);

    console.log(text);

    var numChars = text.join(" ").length;

    // because 5 characters is the definition of a word
    var number_of_delays_ideal = numChars / 5;
    var number_of_delays_actual = text.length - 1;

    // WPM to achieve - change this
    var wpm = 150;

    var delay_actual = 60000 / wpm;
    var delay_ideal = delay_actual * number_of_delays_ideal / number_of_delays_actual;

    var delay = delay_ideal;

    // Begin!
    race(text, delay);
  });
});

