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
			});
		}
	};
});