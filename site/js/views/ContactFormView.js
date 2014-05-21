define(['underscore',
		'backbone',
		'models/SuccessMessage',
		'views/SuccessMessageView',
		'text!templates/contactForm.html'
], 
function (_, Backbone, SuccessMessage, SuccessMessageView, ContactFormTemplate) {
'use strict';

	var doc = document;

	var ContactFormView = Backbone.View.extend({

		tagName: 'section',

		id: 'mainContent',

		initialize: function () {
			
			this.listenTo(this.model, 'invalid', this.displayFormErrors);
			this.listenTo(this.model, 'valid', this.displaySuccessMessage);
		},

		events: {
			'click #submitForm': 'saveForm',
			'blur input[name=firstname]': 'handleValidation',
			'blur input[name=surname]': 'handleValidation',
			'blur input[name=email]': 'handleValidation',
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
			formData.webpage = this.$('input[name=webaddress]').val();

			this.model.saveFormData(formData);
		},

		handleValidation: function (e) {

			var validation,
			errorSpan,
			target = e.target,
			fieldName = target.getAttribute('name');

			// Deligate field validation to the model.
			validation = this.model.validateField(fieldName, target.value);

			if (validation.fail) {

				target.setAttribute('class', 'invalid');

				errorSpan = this.$el.find('.' + fieldName);
				errorSpan.text(validation.messages[0]);
			}
			else {

				// Check if error aldready accured and is corrected.
				if (target.className === 'invalid') {

					target.removeAttribute('class');
				};
			}
		},

		displayFormErrors: function (model) {
			
			var validatedFields = model.validationError.validated,
			errorMessages = model.validationError.messages,
			fieldsWithErrors = {},
			errorSpan;

			var validate;
			for (validate in validatedFields) {

				if (!validatedFields[validate]) {

					fieldsWithErrors[validate] = false;
				};
			};


			var i = 0,
			fieldName;
			for (fieldName in fieldsWithErrors) {
				

				this.$('input[name='+fieldName+']').addClass('invalid');
				errorSpan = this.$el.find('.' + fieldName);
				errorSpan.text(errorMessages[i]);

				i++;
			};
		},

		displaySuccessMessage: function () {

			Backbone.history.navigate("", {trigger: true});

			var successMessage = new SuccessMessage();
			successMessage.set({message: 'The form was successfully submitted.'});

			var successMessageView = new SuccessMessageView({model: successMessage});
			var messageBox = successMessageView.render();

			messageBox.$el.hide();
			$('#container').append(messageBox.$el);
			messageBox.$el.fadeIn(500);
		}
	});

	return ContactFormView;
});