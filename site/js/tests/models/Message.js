define(['models/Message'], function (Message) {
	'use strict';

	return {
		test: function () {		

			describe('Message Model', function () {
				
				describe('Default Behaviour', function () {

					// Instantiating a couple of message default models to test default behaviour.	
					var firstDefaultMessage = new Message({}),
					secondDefaultMessage = new Message({}),
					date1 = firstDefaultMessage.attributes.date,
					date2 = secondDefaultMessage.attributes.date,
					dataObj;

					it('has to be an instance of the Message model class', function () {

	 					expect(firstDefaultMessage).to.be.an.instanceof(Message);
	 				});

	 				it('has to be an object', function () {

	 					expect(firstDefaultMessage).to.be.an.object;
	 				});

	 				it('has a urlRoot property that equals \"/messages\"', function () {

	 					expect(firstDefaultMessage).to.have.property('urlRoot', '/messages');
	 				});

	 				it('has a flag property - thisClient - indicating if the view is created by this client, by default set to false', function () {
	 					
	 					expect(firstDefaultMessage).to.have.property('thisClient', false);
	 				});

	 				it('has a flag property - userJoinedMessage - indicating if the message is a joined-message, by default set to false', function () {
	 					
	 					expect(firstDefaultMessage).to.have.property('userJoinedMessage', false);
	 				});

	 				it('contains an object literal for model data', function () {

	 					dataObj = firstDefaultMessage.attributes;
	 					expect(dataObj).to.be.an.object;
	 				});

	 				it('has default model-data text attribute that equals an empty string', function () {

	 					expect(firstDefaultMessage).to.have.deep.property('attributes.text', '');
	 				});

	 				it('has default model-data date attribute', function () {

	 					expect(firstDefaultMessage).to.have.deep.property('attributes.date');
	 				});

	 				it('Expect instances of the Message model class to not share the exact same attributes-object', function () {

						expect(firstDefaultMessage.attributes).to.not.equal(secondDefaultMessage.attributes);
					});

	 				it('Expect instances of the Message model class to not share the same date instance.', function () {

	 					expect(date1).to.not.equal(date2);
	 				});
				});


				describe('Testing correct output for given input', function () {

					// Instantiating a message model and assign it a message.
					var firstMessage = new Message({text: 'Hi, what\'s up?'});
					var secondMessage = new Message({text: 'Hi, what\'s up?'});

					it('expects message - model\'s text attribute to equal message text', function () {

						expect(firstMessage.toJSON().text).to.eql('Hi, what\'s up?');
						expect(firstMessage.get('text')).to.eql('Hi, what\'s up?');
					});
				});

				// The Mocha framework automatically makes sure that the JavaScript context (the value of this) is consistent for all our test cases.
				describe('Initialization', function () {

					beforeEach(function () {

						this.message = new Message();
					});

					it('expects default message to equal an empty string', function () {
						
						expect(this.message.get('text')).to.eql('');
					});
				});
			});
		}
	};
});