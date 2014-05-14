define(['underscore', 'backbone', 'text!templates/contactForm.html'], function (_, Backbone, ContactFormTemplate) {
'use strict';

	var doc = document;

	var ContactFormView = Backbone.View.extend({

		tagName: 'section',

		id: 'mainContent',

		events: {
			'click #submitForm': 'saveForm'
		},

		template: _.template(ContactFormTemplate),

		render: function () {
			
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		saveForm: function (e) {

			e.preventDefault();

			var formData = {};

			formData.firstname = doc.querySelector('#firstname').value;
			formData.surname = doc.querySelector('#surname').value;
			formData.email = doc.querySelector('#email').value;
			formData.date = doc.querySelector('#date').value;
			formData.webpage = doc.querySelector('#url').value;

			this.model.saveFormData(formData);

			// console.log(firstname.value);


			// this.model.set('firstName': )
		}
	});

	return ContactFormView;
});