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
	



	// instantiate a model		
	var boardItem = new BoardItem({itemTitle: 'MemoryGame'});
	console.log(boardItem.get('itemTitle'));

	// // instantiate a view
	// var boardItemView = new BoardItemView({model: boardItem});
	// console.log(boardItemView.el);
	// console.log(boardItemView);

	// // render the view
	// boardItemView.render();

	// // print the view
	// $('#image').html(boardItemView.el);
	// console.log($('#image').html(boardItemView.el));

	// var BoardItemView = Backbone.View.extend({

	// 	tagName: 'li',

	// 	className: 'thumb',

	// 	initialize: function () {
	// 		this.model.on('change', this.render, this);
	// 	},			
		
	// 	render: function () {
	// 		this.$el.html(this.template(this.model.toJSON()));
	// 	},

	// 	template: _.template('<a href="#"><div class="testdiv"><img src="css/imgs/image.JPG" width=100 height=100 /></div></a>'),

	// 	events: {
	// 		'click div': 'showMessage'
	// 	},

	// 	showMessage: function (e) {
	// 		alert('Message');
	// 	}

	// });

	var boardItemView = new BoardItemView({model: boardItem});
	boardItemView.render();

	$('#image').html(boardItemView.el);

	// document.addEventListener('click', function(e){
	// 	console.log(e.target.className);
	// }, false);


	// var compiledTemplate = _.template(test_temp);
	// console.log(Appointment);
	// console.log(compiledTemplate());
});