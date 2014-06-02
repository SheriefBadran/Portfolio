define(['underscore', 'backbone', 'socketio'], function (_, Backbone, io) {
'use strict';

	if (typeof io === 'undefined') {

		io = require('socketio');
	}

	Backbone.socket = io.connect('http://localhost:8000');
	var server = Backbone.socket;

	var Message = Backbone.Model.extend({

		defaults: function () {

			return {
				sender: 'Anonymous',
				text: '',
				serverId: '',
				date: new Date()
			}
		},

		urlRoot: '/messages',

		// Given for mongo db
		idAttribute: '_id',

		test: [],

		// Flag if message is created on this client or not.
		thisClient: false,

		userJoinedMessage: false,

		deleteMessage: function () {

			//-- bubble to every collection the model belongs --//
			server.emit('message:delete', this.get('serverId'));

			this.trigger('destroy', this);
		},

		updateMessage: function (value) {

			this.set({text: value});
			this.save();
		},

		saveMessage: function () {



			var that = this;
			server.emit('message:create', this.toJSON());
			console.log(this.toJSON());
			server.on('clientcreate', function (messageObj) {

				console.log(that);
				// var number = Math.random() * (100 - 1) + 1;
				that.set({serverId: messageObj.serverId});
				that.set({_id: messageObj._id});
			});

			// TODO: Implement Error Handling.
			// this.save();
		}
	});

	return Message;
});