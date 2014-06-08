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
				webpage: '',
				comment: ''
			};
		},

		urlRoot: '/form',

		id_Attribute: '_id',

		validate: function (attributes, options) {
			console.log(attributes);
			var data = {
				firstname: _.escape(attributes.firstname),
				surname: _.escape(attributes.surname),
				email: _.escape(attributes.email),
				webaddress: _.escape(attributes.webpage),
				comment: _.escape(attributes.comment)
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
			data[fieldName] = _.escape(value);

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
				firstname: _.escape(formData.firstname),
				surname: _.escape(formData.surname),
				email: _.escape(formData.email),
				webpage: _.escape(formData.webpage),
				comment: _.escape(formData.comment),
				date: _.escape(new Date())
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