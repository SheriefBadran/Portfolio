define(['underscore', 'backbone'], function (_, Backbone) {
'use strict';

	var Message = Backbone.Model.extend({

		defaults: function () {
			return {
				text: '',
				date: new Date()
			}
		},

		urlRoot: '/messages',

		// given for mongo db
		idAttribute: '_id',

		deleteMessage: function () {
			this.destroy();
		},

		updateModel: function (value) {
			this.set({text: value});
			this.save();
		}
	});

	return Message;
});