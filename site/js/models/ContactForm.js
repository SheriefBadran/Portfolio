define(['underscore', 'backbone', 'app/Validator'], function (_, Backbone, Validator) {
'use strict';

	var ContactForm = Backbone.Model.extend({

		// Add company and coment.
		defaults: function () {
			return {
				firstname: '',
				surname: '',
				email: '',
				date: '',
				webpage: ''
			};
		},

		urlRoot: '/form',

		id_Attribute: '_id',

		validate: function (attributes, options) {
			
			var data = {
				firstname: attributes.firstname,
				surname: attributes.surname,
				email: attributes.email,
				webaddress: attributes.webaddress
			};

			Validator.config = {
				firstname: 'firstname',
				surname: 'surname',
				email: 'email',
				webaddress: 'webaddress'
			};

			var validated = Validator.validate(data);

			if (Validator.hasErrors()) {

				return {
					messages: Validator.messages,
					validated: validated[0]
				};
			}
		},

		validateField: function (fieldName, value) {

			var data = {};
			data[fieldName] = value;

			Validator.config[fieldName] = fieldName;

			Validator.validate(data);

			return {
				fail: Validator.hasErrors(),
				messages: Validator.messages
			};

		},

		saveFormData: function (formData) {

			var contactForm = this;
			
			this.set({
				firstname: formData.firstname,
				surname: formData.surname,
				email: formData.email,
				date: new Date(),
				webpage: formData.webpage
			});

			// Above we set the model with data, hence we pass in null as first parameter instead of JSON key-value pair data. 
			this.save(null, {
				success: function () {
					
					// On success, event is triggered on the view, to display a success message.
					contactForm.trigger('valid');
				}
			});
		}	
	});

	return ContactForm;
});