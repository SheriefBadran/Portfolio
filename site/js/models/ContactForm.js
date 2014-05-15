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

		saveFormData: function (formData) {
			
			this.set({
				firstname: formData.firstname,
				surname: formData.surname,
				email: formData.email,
				date: formData.date,
				webpage: formData.webpage
			});

			console.log(this);

			// this.set('firstname': formData.firstname);
			// this.set('surname': formData.surname);
			// this.set('email': formData.email);
			// this.set('date': formData.date);

			this.save();
		}		
	});

	return ContactForm;
});