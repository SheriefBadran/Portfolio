define(['underscore', 'backbone', 'text!templates/successMessage.html'], function (_, Backbone, SuccessMessageTemplate) {
'use strict';

	var SuccessMessageView = Backbone.View.extend({

		className: 'resp_success',

		events: {
			'click #closeMsg': 'closeResponseMessage'
		},

		render: function () {
			
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		template: _.template(SuccessMessageTemplate),

		closeResponseMessage: function (e) {
			
			// TODO: Only temporary solution, destroy the model and delete from the dome when destroy trigger event.
			this.el.remove();
		}
	});

	return SuccessMessageView;
});