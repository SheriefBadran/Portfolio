define(['underscore', 'backbone', 'text!templates/myWork.html'], function (_, Backbone, MyWorkTemplate) {
'use strict';

	// console.log(Backbone);

	var MyWorkView = Backbone.View.extend({

		tagName: 'section',

		id: 'mainContent',

		render: function () {
			
			this.$el.html(this.template());
			return this;
		},

		template: _.template(MyWorkTemplate),

		insertIntoDOM: function (animation, renderedHTML, parentEl) {

			if (animation === null) {

				parentEl.html(renderedHTML);
			}
			else if (typeof animation === 'string' && animation === 'fadeIn') {

				parentEl.hide();

				parentEl.html(renderedHTML);

				parentEl.fadeIn(500);
			}
		}
	});

	return MyWorkView;
});