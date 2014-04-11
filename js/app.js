require.config({

	paths: {

		// folder paths

		// file paths
		'underscore': 'libs/underscore',
		'backbone': 'libs/backbone',
		'jquery': 'libs/jquery'
	},

	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

require ([
			'underscore', 
			'backbone', 
			'text!templates/test_temp.html', 
			'models/Board', 
			'views/BoardItemView'
], 
function(_, Backbone, test_temp, BoardItem, BoardItemView) {	
	
	// Instantiate a model		
	var boardItem = new BoardItem({itemTitle: 'MemoryGame'});
	console.log(boardItem.get('itemTitle'));

	// Instantiate a view
	var boardItemView = new BoardItemView({model: boardItem});
	boardItemView.render();

	$('.thumb').html(boardItemView.el);



	// var compiledTemplate = _.template(test_temp);
	// console.log(Appointment);
	// console.log(compiledTemplate());
});