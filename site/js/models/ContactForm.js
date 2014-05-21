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
			else {

				this.trigger('valid');
				console.log('valid');
				return;
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
			
			this.set({
				firstname: formData.firstname,
				surname: formData.surname,
				email: formData.email,
				date: new Date(),
				webpage: formData.webpage
			});

			this.save();
		}	
	});

	return ContactForm;
});