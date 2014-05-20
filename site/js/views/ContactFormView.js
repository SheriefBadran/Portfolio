define(['underscore', 'backbone', 'text!templates/contactForm.html'], function (_, Backbone, ContactFormTemplate) {
'use strict';

	var doc = document;

	var ContactFormView = Backbone.View.extend({

		tagName: 'section',

		id: 'mainContent',

		events: {
			'click #submitForm': 'saveForm',
			'blur input[name=firstname]': 'handleValidation',
			'blur input[name=surname]': 'handleValidation',
			'blur input[name=email]': 'handleValidation',
			'blur input[name=date]': 'handleValidation',
			'blur input[name=webaddress]': 'handleValidation'
		},

		template: _.template(ContactFormTemplate),

		render: function () {
			
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		saveForm: function (e) {

			e.preventDefault();
			var formData = {};

			formData.firstname = this.$('input[name=firstname]').val();
			formData.surname = this.$('input[name=surname]').val();
			formData.email = this.$('input[name=email]').val();
			formData.date = this.$('input[name=date]').val();
			formData.webpage = this.$('input[name=webaddress]').val();

			this.model.saveFormData(formData);
		},

		handleValidation: function (e) {

			var target = e.target,
			fieldName = target.getAttribute('name');

			if (this.validateField(target, fieldName) && target.className === 'invalid') {

				target.setAttribute('class', 'valid');
				console.log('success');


			}
			else {

				console.log('fail');
				// Add class invalid on input (remove the class I added in the html template).
				// 
				target.setAttribute('class', 'invalid');
			}

		},

		validateField: function (target, fieldName, value) {

			switch (fieldName) {

				case 'firstname':
					return this.model.validateName(target.value);

				case 'surname':
					return this.model.validateName(target.value);

				case 'email':
					return this.model.validateEmail(target.value);

				case 'date':
					return this.model.validateDate(target.value);

				case 'webaddress':
					return this.model.validateWebAdress(target.value);
			};
		}
	});

	return ContactFormView;
});