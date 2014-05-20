define(['underscore', 'backbone', 'text!templates/mainwrapper.html'], function (_, Backbone, MainWrapperTemplate) {
'use strict';

	var MainWrapperView = Backbone.View.extend({

		tagName: 'main',

		template: _.template(MainWrapperTemplate),

		render: function function_name () {
			
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return MainWrapperView;
});