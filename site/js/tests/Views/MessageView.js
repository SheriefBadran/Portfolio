define(['models/Message', 'views/MessageView'], function (Message, MessageView) {
'use strict';

	return{
		test: function () {
			
			describe('Message View', function () {

				describe('Fundamental View Properties', function () {
					
					beforeEach(function () {

						this.message = new Message({text: 'Hey, what\'s up?'});
						this.messageView = new MessageView({model: this.message});
					});

					it('expect render() to return the view object', function () {

						expect(this.messageView.render()).to.equal(this.messageView);
					});

					it('expect renderBroadCast() to return the view object', function () {

						expect(this.messageView.renderBroadCast()).to.equal(this.messageView);
					});

					it('expect renderJoinedChatMessage() to return the view object', function () {

						expect(this.messageView.renderJoinedChatMessage()).to.equal(this.messageView);
					});

					it('has a section top element', function () {

						expect(this.messageView.render().el.nodeName.toLowerCase()).to.equal('section');
					});

					it('expects top element classname to equal message', function () {

						expect(this.messageView.className).to.eql('message');
					});
				});

				describe('Message Template', function () {

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

					it('expects template parent node to be a section element', function () {
						
						expect(this.messageView.render().el.nodeName).to.equal('SECTION');
					});

					it('contains three div elements', function () {

						expect(this.messageView.$el.find('div')).to.have.length(3);
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
				
				describe('Delete Message', function() {
						
					beforeEach(function () {

						// Render the message in browser test area.
						$('#testarea').html(this.messageView.render().el);

						this.deleteModelStub = sinon.stub(this.messageView, 'deleteMessageModel');
						this.removeFromDomStub = sinon.stub(this.messageView, 'removeMessageFromDom');
					});

					afterEach(function () {
						
						this.deleteModelStub.restore();
						this.removeFromDomStub.restore();
					});

					it('removes the message model when delete icon is clicked', function () {
						
						// trig the click event on the span.deleteIcon element  
						$('.deleteIcon').click(function () {
							
							expect(this.deleteModelStub).to.have.been.calledOnce;
						});
					});

					it('expects removeMessageFromDom() to be called', function () {
						
						$('deleteIcon').click(function () {
							
							expect(this.removeFromDomStub).to.have.been.calledOnce;
						});
					});

					it('removes message markup from the DOM when delete icon is clicked', function () {
						
						// messageView.deleteMessageModel triggers the destroy event.
						this.message.trigger('destroy', this);

						var testarea = document.getElementById('testarea');
						var messageSection = testarea.getElementsByClassName('message');
						expect(messageSection[0]).to.equal(undefined);
					});
				});	
			});
		}
	};
});