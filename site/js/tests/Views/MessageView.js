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

				it('messageView has a section top element', function () {

					expect(this.messageView.render().el.nodeName.toLowerCase()).to.equal('section');
				});

				it('top element classname is set to message', function () {

					expect(this.messageView.className).to.eql('message');
				});

				describe('Template', function () {

					beforeEach(function () {

						this.messageView.render();
					});

					it('messageView contains the message text set in the model', function () {

						expect(this.messageView.$el.text()).to.eql('Hey, what\'s up?Hey, what\'s up?');
					});

					it('messageView contains three div elements', function () {

						expect(this.messageView.$el.find('div')).to.have.length(3);
					});

					it('template parent node is a section element', function () {

						expect(this.messageView.$el.find('div').prevObject[0].nodeName.toLowerCase()).to.eql('section');
					});

					it('messageView contains a topBar div element', function () {

						expect(this.messageView.$el.find('div')[0].className).to.eql('topBar');
					});

					it('messageView contains a text div element', function () {

						expect(this.messageView.$el.find('div')[1].className).to.eql('text');
					});

					it('messageView contains a bottomBar', function () {
						
						expect(this.messageView.$el.find('div')[2].className).to.eql('bottomBar');
					});
				});
			});
		}
	};
});