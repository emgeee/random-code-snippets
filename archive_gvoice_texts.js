'use strict';

var checkXPath = '//*[@id="gc-appbar"]/div/div[2]/div[1]/div[1]/span/div';
var archiveXPath = '//*[@id="gc-appbar"]/div/div[2]/div[2]';

function check() {
  var click = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': false
  });

  var selectAll = document.evaluate(checkXPath, document, null, XPathResult.ANY_TYPE, null ).iterateNext();
  selectAll.dispatchEvent(click);
}

function archive() {
  var down = new MouseEvent('mousedown', {
    'view': window,
    'bubbles': true,
    'cancelable': false
  });
  var up = new MouseEvent('mouseup', {
    'view': window,
    'bubbles': true,
    'cancelable': false
  });

  var archiveBtn = document.evaluate(archiveXPath, document, null, XPathResult.ANY_TYPE, null ).iterateNext();
  archiveBtn.dispatchEvent(down);
  archiveBtn.dispatchEvent(up);
}

function getUnread() {
  var unreadStr = document.evaluate('//*[@id="gc-appbar"]/div/div[4]/div[2]/span',document, null, XPathResult.ANY_TYPE, null ).iterateNext().innerHTML;
  var unread = parseInt(unreadStr.split(' ')[2], 10);

  return unread;
}

function waitUntilLoaded(xpath, fn) {
  var loaded = !!document.evaluate(xpath ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotLength;

  if(loaded) {
    fn();
  } else {
    setTimeout(waitUntilLoaded.bind(null, xpath, fn), 100);
  }
}


function run() {
  var unread = getUnread();
  console.log(unread);

  if(unread === 0) { return; }

  check();

  waitUntilLoaded(archiveXPath, function() {
    archive();

    setTimeout( waitUntilLoaded.bind(null, '//*[@id="gc-message-list"]/div[contains(@class, "gc-message-sms")]', run), 1000);
  });
}

run();

