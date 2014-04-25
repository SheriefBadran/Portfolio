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

mongoose.connect('mongodb://db_user:frasklas@ds029630.mongolab.com:29630/portfoliodb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('yay!!');
});

// Schemas
var Message = new mongoose.Schema({text: String, date: Date});

// Models
var MessageModel = mongoose.model('Message', Message);

// Get a list of all messages
app.get( '/api/messages', function( request, response ) {

    return MessageModel.find( function( err, messages ) {
        // if( !err ) {
        //     return response.send( messages );
        // } else {
        //     return console.log( err );
        // }
        // var mess = JSON.parse(messages);
        return response.send(messages);
    });

    // return response.send(resp);
    // return response.send(test);
    // return response.send({test1: 'hej', test2: 'test', test3: MessageModel.modelName});
});

// Insert a new message
app.post( '/messages', function( request, response ) {
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

// Get a single message by id
app.get( '/messages/:id', function( request, response ) {
    return MessageModel.findById( request.params.id, function( err, message ) {
        if( !err ) {
            return response.send( message );
        } else {
            return console.log( err );
        }
    });
});

// Update a message
app.put( '/messages/:id', function( request, response ) {
    console.log( 'Updating message ' + request.body.title );
    return MessageModel.findById( request.params.id, function( err, message ) {
        message.title = request.body.title;
        message.author = request.body.author;
        message.releaseDate = request.body.releaseDate;

        return message.save( function( err ) {
            if( !err ) {
                console.log( 'message updated' );
            } else {
                console.log( err );
            }
            return response.send( message );
        });
    });
});


// DB TEST CALLS FROM BROWSER CONSOLE

// POST A MESSAGE
// jQuery.post( '/messages', {
//     'text': 'Sherief Loves Backbone',
//     'date': new Date( 2014, 4, 25 ).getTime()
// }, function(data, textStatus, jqXHR) {
//     console.log( 'Post response:' );
//     console.dir( data );
//     console.log( textStatus );
//     console.dir( jqXHR );
// });
// 
// GET ALL MESSAGES (THE COLLECTION)
// jQuery.get( '/messages', function( data, textStatus, jqXHR ) {
//     console.log( 'Get response:' );
//     console.dir( data );
//     console.log( textStatus );
//     console.dir( jqXHR );
// });

// GET A SINGEL MESSAGE
// jQuery.get( '/messages/535a7d8b0258df5db7000008', 
//   function( data, textStatus, jqXHR ) {
//     console.log( 'Get response:' );
//     console.dir( data );
//     console.log( textStatus );
//     console.dir( jqXHR );
// });

// UPDATE A SINGEL MESSAGE
// jQuery.ajax({
//     url: '/messages/535a7d8b0258df5db7000008',
//     type: 'PUT',
//     data: {
//         'text': 'Sherief Loves Backbone with Require.js',
//         'date': new Date( 2014, 4, 25 ).getTime()
//     },
//     success: function( data, textStatus, jqXHR ) {
//         console.log( 'Post response:' );
//         console.dir( data );
//         console.log( textStatus );
//         console.dir( jqXHR );
//     }
// });