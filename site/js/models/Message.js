define(['underscore', 'backbone', 'socketio'], function (_, Backbone, io) {
'use strict';

	window.socket = io.connect('http://localhost:3000');
	var server = window.socket;


	var Message = Backbone.Model.extend({

		initialize: function () {

			// Create a "global" context for the server listener. 
			
		},

		defaults: function () {

			return {
				text: '',
				cid: '',
				date: new Date()
			}
		},

		urlRoot: '/messages',

		// given for mongo db
		idAttribute: '_id',

		deleteMessage: function () {
			console.log(this);

			// CHECK IF MESSAGE MODEL ALREADY IS LOADED ONCE FROM SERVER AND HAS AN ID OR IF IT IS PURE NEW ONE WITH ONLY CID!!
			// THIS MIGHT SOLOW  FOUND BUG!
			// console.log(this.attributes._id);

			//-- this.collection.remove(this) will work on messages collection only! --//
			// this.collection.remove(this);

			//-- bubble to every collection the model belongs --//
			var messageModel = this.collection.get(this.cid);
			messageModel.trigger('destroy', this);


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
			// this.save();
		}
	});

	return Message;
});