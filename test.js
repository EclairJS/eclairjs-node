var gw = require('./jupyter-js-services');

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
global.WebSocket = require('ws');

var startNewKernel = gw.startNewKernel;

//var BASEURL = 'http://192.168.99.100:9502';
var BASEURL = 'http://127.0.0.1:8888';
var WSURL = 'ws://127.0.0.1:8888';
//var WSURL = 'ws://192.168.99.100:9502';

startNewKernel({
  baseUrl: BASEURL,
  wsUrl: WSURL,
  name: "spark"
}).then(function(k) {
  k.kernelInfo().then(function(info) { console.log(info); })

  var f = k.execute({
    code: '1 + 1',
    silent: false
  });

  f.onIOPub = msg => {
    console.log("onIOPub");
    console.log(msg);
  }

    /*
    f.onDone = msg => {
      console.log("onDone");
      console.log(msg);
    }

    f.onReply = msg => {
      console.log("onReply");
      console.log(msg);
    }
    */

   /*
    f.handleMsg = msg => {
      console.log("handleMsg");
      console.log(msg);
    }
    */
});
