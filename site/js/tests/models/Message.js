define(['models/Message'], function (Message) {
	'use strict';

	return {
		test: function () {			

			describe('Message Model Default Behaviour', function () {

				// Instantiating a couple of message default models to test default behaviour.	
				var firstDefaultMessage = new Message({}),
				secondDefaultMessage = new Message({}),
				date1 = firstDefaultMessage.attributes.date,
				date2 = secondDefaultMessage.attributes.date,
				dataObj;

				it('message model has to be an instance of the Message model class', function () {

 					expect(firstDefaultMessage).to.be.an.instanceof(Message);
 				});

 				it('message model has to be an object', function () {

 					expect(firstDefaultMessage).to.be.an.object;
 				});

 				it('message model has a urlRoot property that equals /messages', function () {

 					expect(firstDefaultMessage).to.have.property('urlRoot', '/messages');
 				});

 				it('message Backbone model contains an object literal for model data', function () {

 					dataObj = firstDefaultMessage.attributes;
 					expect(dataObj).to.be.an.object;
 				});

 				it('Default Backbone model-data has a text attribute that equals an empty string', function () {

 					expect(firstDefaultMessage).to.have.deep.property('attributes.text', '');
 				});

 				it('Default Backbone model-data has a date attribute', function () {

 					expect(firstDefaultMessage).to.have.deep.property('attributes.date');
 				});

 				it('Instances of the Message model class can not share the same attributes-object', function () {

					expect(firstDefaultMessage.attributes).to.not.equal(secondDefaultMessage.attributes);
				});

 				it('Instances of the Message model class can not share the same date instance.', function () {

 					expect(date1).to.not.equal(date2);
 				});
			});


			describe('Message Model: Testing correct output for given input', function () {

				// Instantiating a message model and assign it a message.
				var firstMessage = new Message({text: 'Hi, what\'s up?'});
				var secondMessage = new Message({text: 'Hi, what\'s up?'});

				it('message - model\'s text attribute represents input for message text', function () {

					expect(firstMessage.toJSON().text).to.eql('Hi, what\'s up?');
					expect(firstMessage.get('text')).to.eql('Hi, what\'s up?');
				});
			});

			// Nested describes.
			// The Mocha framework automatically makes sure that the JavaScript context (the value of this) is consistent for all our test cases.
			describe('Message Model', function () {
				describe('Initialization', function () {

					beforeEach(function () {

						this.message = new Message();
					});

					it('message model should default message text to an empty string', function () {
						
						expect(this.message.get('text')).to.eql('');
					});
				});
			});
		}
	};
});