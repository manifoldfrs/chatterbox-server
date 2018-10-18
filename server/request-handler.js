/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require('url');
// const myUrl = new URL('http://127.0.0.1:3000/classes/messages');
// var fs = require('fs');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'bob': 'Hello I am Bob your useless header'
};

var messages = {
  results: [{
    objectId: 'Dw2VY7QvBm',
    username: 'gd',
    roomname: 'Cats Only',
    text: 'MEOOWWW',
    createdAt: '2018-10-15T01:22:52.453Z',
    updatedAt: '2018-10-15T01:22:52.453Z'
  },
  {
    objectId: 'oXQ4Qo0zQD',
    username: 'a',
    roomname: 'Lobby',
    text: 'kljlk',
    createdAt: '2018-10-14T17:48:46.248Z',
    updatedAt: '2018-10-14T17:48:46.248Z'
  }]
};

requestHandler = function(request, response) {
  //console.log('our url = ', request.url, request.method);
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  //request.url = myUrl;

  //console.log('pathname: ', pathname);
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';
  //console.log('our headers: ', headers);
  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  if (request.method === 'GET' && request.url === '/classes/messages') {
    var data = messages;
    data = JSON.stringify(data);
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(data);
  } else if (request.method === 'OPTIONS' && request.url === '/classes/messages') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    request.on('data', function(chunk) {
      console.log('post chunk: ', chunk);
      var data = JSON.parse(chunk);
      console.log('post data here: ', data);
      // console.log('blah blah blah: ', messages.results);
      messages.results.unshift(data);
      console.log('our posted messages ------>>> : ', messages);
    });
    var data = messages;
    data = JSON.stringify(data);
    console.log('Return data is here!', data);
    statusCode = 201;
    response.writeHead(statusCode, headers);
    response.end(data);
  } else if (request.method === 'PUT' && request.url === '/classes/messages') {
    request.on('data', function(chunk) {
      //console.log('post chunk: ', chunk);
      var data = JSON.parse(chunk);
      //console.log('post data here: ', data);
      // console.log('blah blah blah: ', messages.results);
      messages.results.unshift(data);
      //console.log('our posted messages ------>>> : ', messages);
    });
    var data = messages;
    data = JSON.stringify(data);
    console.log('Return data is here!', data);
    statusCode = 204;
    response.writeHead(statusCode, headers);
    response.end(data);
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }


  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.end('Hello, World!');
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

module.exports.url = url;
module.exports.requestHandler = requestHandler;

