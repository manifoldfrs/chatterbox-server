/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require('url');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'bob': 'Hello I am Bob your useless header'
};

var messages = {
  results: [
    // {
    //   objectId: 'Dw2VY7QvBm',
    //   username: 'gd',
    //   roomname: 'Cats Only',
    //   text: 'MEOOWWW',
    //   createdAt: '2018-10-15T01:22:52.453Z',
    //   updatedAt: '2018-10-15T01:22:52.453Z'
    // },
    // {
    //   objectId: 'oXQ4Qo0zQD',
    //   username: 'a',
    //   roomname: 'Lobby',
    //   text: 'kljlk',
    //   createdAt: '2018-10-14T17:48:46.248Z',
    //   updatedAt: '2018-10-14T17:48:46.248Z'
    // }
  ]
};

requestHandler = function(request, response) {
<<<<<<< HEAD
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  var urlPath = url.parse(request.url).pathname;
  var host = url.parse(request.url).host;
  var hostname = url.parse(request.url).hostname;
  var protocol = url.parse(request.url).protocol;
  var searchQuery = url.parse(request.url).search;
  var username = url.parse(request.url).username;
  console.log('URL Path: ' + urlPath);
  console.log('URL Host: ' + host);
  console.log('URL Host + Port: ' + hostname);
  console.log('Protocol: ' + protocol);
  console.log('URL Search Query: ' + searchQuery);
  console.log('Username: ' + username);
  console.log('Directory Name: ' + __dirname);

  var filePath = path.join(__dirname + '/bin/messages.json');
  console.log('File Path: ' + filePath);
  // console.log('Directory Name: ' + _dirname);
  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  //request.url = myUrl;

  //console.log('pathname: ', pathname);
=======
>>>>>>> de87bab1b0d196d54007cf4f72c9071e6d249ed7
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

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
      var data = JSON.parse(chunk);
      messages.results.unshift(data);
    });
    var data = messages;
    data = JSON.stringify(data);
    statusCode = 201;
    response.writeHead(statusCode, headers);
    response.end(data);
  } else if (request.method === 'PUT' && request.url === '/classes/messages') {
    request.on('data', function(chunk) {
      var data = JSON.parse(chunk);
      messages.results.unshift(data);
    });
    var data = messages;
    data = JSON.stringify(data);
    statusCode = 204;
    response.writeHead(statusCode, headers);
    response.end(data);
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }
};

module.exports.requestHandler = requestHandler;