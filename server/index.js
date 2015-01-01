var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

server.route([
  { method: 'GET',   path: '/{path*}', handler : {directory: { path: 'app' , listing: false, index: true }}}
]);

server.start(function(err) {
  if (err) return callback('Failed to start server', err);

  console.log('Server started at: ', server.info.uri);
});

module.exports = server;