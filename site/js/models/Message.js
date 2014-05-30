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
				cid: '',
				date: new Date()
			}
		},

		urlRoot: '/messages',

		// Given for mongo db
		idAttribute: '_id',

		// Flag if message is created on this client or not.
		thisClient: false,

		userJoinedMessage: false,

		deleteMessage: function () {

			//-- bubble to every collection the model belongs --//
			var message = this.collection.get(this.cid);

			// Unable delete functionality for messages loaded from database.
			if (message.hasOwnProperty('id')) {
				return;
			};

			message.trigger('destroy', this);

			server.emit('message:delete', this.cid);
			// this.destroy();
		},

		updateMessage: function (value) {

			this.set({text: value});
			this.save();
		},

		saveMessage: function () {

			this.set({cid: this.cid});
			server.emit('message:create', this.toJSON());
			
			// TODO: Implement Error Handling.
			// this.save();
		}
	});

	return Message;
});