define(['underscore', 'backbone'], function (_, Backbone) {
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

		validateName: function (value) {
			
			if (value === null || value === '') {

				return false;
			};

			return true;
		},

		validateEmail: function (value) {
			

		},

		validateDate: function (value) {
			

		},

		validateWebAdress: function (value) {
			

		},

		saveFormData: function (formData) {
			
			this.set({
				firstname: formData.firstname,
				surname: formData.surname,
				email: formData.email,
				date: formData.date,
				webpage: formData.webpage
			});

			this.save();
		}	
	});

	return ContactForm;
});