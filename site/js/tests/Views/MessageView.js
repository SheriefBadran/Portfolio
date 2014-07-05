define(['models/Message', 'views/MessageView'], function (Message, MessageView) {
'use strict';

	return{
		test: function () {
			
			describe('Message View', function () {

				beforeEach(function () {

					this.message = new Message({text: 'Hey, what\'s up?'});
					this.messageView = new MessageView({model: this.message});
				});

				it('expect render() to return the view object', function () {

					expect(this.messageView.render()).to.equal(this.messageView);
				});

				it('has a section top element', function () {

					expect(this.messageView.render().el.nodeName.toLowerCase()).to.equal('section');
				});

				it('expects top element classname to equal message', function () {

					expect(this.messageView.className).to.eql('message');
				});

				describe('Template', function () {

					beforeEach(function () {

						this.messageView.render();
					});

					it('contains expected message text', function () {

						var messageSectionContents = this.messageView.$el.find('div').contents();
						var messageSectionTextNodes = messageSectionContents.filter(function () {
							
							// Filter out all text nodes.
							return this.nodeType === 3;
						});

						// Trim away all leading and ending whitespace.
						var cleanMessageText = $.trim(messageSectionTextNodes.text());

						expect(cleanMessageText).to.eql('Hey, what\'s up?');
					});

					it('contains three div elements', function () {

						expect(this.messageView.$el.find('div')).to.have.length(3);
					});

					it('expects template parent node to be a section element', function () {

						expect(this.messageView.$el.find('div').prevObject[0].nodeName.toLowerCase()).to.eql('section');
					});

					it('contains a .topBar div element', function () {

						expect(this.messageView.$el.find('div')[0].className).to.eql('topBar');
					});

					it('contains a .text div element', function () {

						expect(this.messageView.$el.find('div')[1].className).to.eql('text');
					});

					it('contains a .bottomBar div element', function () {
						
						expect(this.messageView.$el.find('div')[2].className).to.eql('bottomBar');
					});
				});
				
				// describe('Remove from DOM', function () {
					

				// });
			});
		}
	};
});