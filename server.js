#!/bin/env node

var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on URL and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use('/', express.static( path.join( application_root, 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get( '/api', function( request, response ) {
    response.send( 'Rest API is running.' );
});

//Start server
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8080;

app.set('ipaddr', ipaddr);
app.set('port', port);

app.listen( port, ipaddr, function() {
    console.log( 'Express server listening on port %d in %s mode', 
    port, app.settings.env );
});

// Connect to the database
mongoose.connect('mongodb://port_user:2br@Basr@ds029630.mongolab.com:29630/portfoliodb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  alert('yay!!');
});

// Schemas
var Message = new mongoose.Schema({text: String, date: Date});

// Models
var MessageModel = mongoose.model('Message', Message);

// Get a list of all messages
app.get( '/api/messages', function( request, response ) {

    var resp = MessageModel.find( function( err, messages ) {
        // if( !err ) {
        //     return response.send( messages );
        // } else {
        //     return console.log( err );
        // }
        return messages;
    });

    return response.send(resp);
    // return response.send(test);
    // return response.send({test1: 'hej', test2: 'test', test3: MessageModel.modelName});
});

//Insert a new message
app.post( '/api/messages', function( request, response ) {
    var message = new MessageModel({
        text: request.body.text,
        date: request.body.date
    });
    message.save( function( err ) {
        if( !err ) {
            return console.log( 'created' );
        } else {
            return console.log( err );
        }
    });
    return response.send( message );
});

//Get a single message by id
app.get( '/api/messages/:id', function( request, response ) {
    return MessageModel.findById( request.params.id, function( err, message ) {
        if( !err ) {
            return response.send( message );
        } else {
            return console.log( err );
        }
    });
});