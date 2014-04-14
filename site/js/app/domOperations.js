define([], function() {
	return{
		createTextDiv: function() {
			var el = document.createElement('div');
			el.id = 'myDiv';
			el.innerHTML = 'Hi there!';

			document.body.appendChild(el);

			var myEl = document.getElementById('myDiv');

			return myEl;
		},
		createVars: function() {
			var hello = 'hello';
			var integer = 42;

			return{
				var1: hello,
				var2: integer
			};
		}
	};
});