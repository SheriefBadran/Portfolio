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

		deleteMessage: function () {
			this.set({deleted: true});
			this.save();
		}
	});

	return Message;
});