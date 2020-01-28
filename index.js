'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var oas3Tools = require('oas3-tools');
var jsyaml = require('js-yaml');
var serverPort = 8080;

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

function simpleErrorHandler(err, req, res, next)
{
  if(err)
  {
    console.log("error activated");
    console.error(err);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
      {
        error: "yes",
        reason: "All your base belog to us",
        message: err.message
      }
    ));

  }
  next();
}

// Initialize the Swagger middleware
oas3Tools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  app.use(simpleErrorHandler);

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
