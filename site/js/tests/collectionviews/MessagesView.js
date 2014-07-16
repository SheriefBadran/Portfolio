define(['models/Message.js', 
		'views/MessageView',
		'collections/Messages',
		'collectionviews/MessagesView'], function (Message, MessageView, Messages, MessagesView) {
'use strict';

	return {
		test: function () {

			describe('Message Collection View', function () {
				
				describe('Fundamental View Properties', function () {

					beforeEach(function() {

						// Instantiate a message collection					
						this.messageCollection = new Messages();

						// Create three message objects
						var models = [{text: 'Hi'}, {text: 'Hi, how are you?'}, {text: 'Im great!'}];

						// Set the object literals as a collection of actual backbone models
						this.messageCollection.reset(models);

						// Instantiate a backbone collection view
						this.messageCollectionView = new MessagesView({collection: this.messageCollection});
					});

					it('expects renderMessages() to return the view object', function () {
						
						expect(this.messageCollectionView.renderMessages()).to.equal(this.messageCollectionView);
					});

					it('expects initialRender() to return the view object', function () {
						
						expect(this.messageCollectionView.initialRender()).to.equal(this.messageCollectionView);
					});

					it('has a div top element', function () {
						
						expect(this.messageCollectionView.initialRender().el.nodeName.toLowerCase()).to.equal('div');
					});

					it('expects top element classname to equal messageWindow', function () {

						expect(this.messageCollectionView.initialRender().el.className).to.equal('messageWindow');
					});
				});

				describe('Chat Template', function () {

					beforeEach(function () {
						
						this.template = this.messageCollectionView.initialRender().$el;
					});
					
					it('has a header element', function () {
						
						expect(this.template.find('#chatHeader').prop('nodeName').toLowerCase()).to.equal('header');
					});

					it('has a header element containing a p-tag', function () {
						
						var headerContents = this.template.find('#chatHeader').contents();
						this.p = headerContents.filter(function () {
							
							// Filter out element nodes
							// ref: https://developer.mozilla.org/en-US/docs/Web/API/Node.nodeType
							return this.nodeType === 1;
						});

						expect(this.p.prop('nodeName').toLowerCase()).to.equal('p');						
					})

					it('has a header element containing a p-tag with the text: Welcome to Drop-In Chat', function () {

						expect(this.p.contents().text()).to.equal('Welcome to Drop-In Chat');
					});

				});

				describe('Create Message', function () {
					

				});
			});
		}
	};
});