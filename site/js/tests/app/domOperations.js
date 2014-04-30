define(['app/domOperations', 'models/Message'], function(DomOperations, Message) {
'use strict';
	
	return{
		test: function() {			

			describe('DOM Tests', function() {				
				DomOperations.createTextDiv();
				var myVariables = DomOperations.createVars();
				var myEl = document.getElementById('myDiv');

				it('is in the DOM', function() {
					expect(myEl).to.not.equal(null);
				});

				it('is a child of the body', function() {
					expect(myEl.parentElement).to.equal(document.body);
				});

				it('has the right text', function() {
					expect(myEl.innerHTML).to.equal('Hi there!');
				});

				it('var1 has the right value', function() {
					expect(myVariables.var1).to.equal('hello');
				});

				it('var2 is an integer and has value 42', function() {
					expect(myVariables.var2).to.deep.equal(42);
				});
			});
		}
	};
});