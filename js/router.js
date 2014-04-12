// define(['underscore', 'backbone'], function (_, Backbone) {
	
// 	var ResumeApp = new (Backbone.Router.extend({

// 		routes: {
// 			'': 'index'
// 		},

// 		initialize: function () {
// 			var boardItemList = new BoardItemList();
// 			var boardItemListView = new BoardItemListView({collection: boardItemList});
// 			console.log(boardItemListView.el);
// 		},

// 		start: function () {
// 			Backbone.history.start({pushState: true});
// 		},

// 		index: function () {
// 			console.log('index func is the place for initial fetch from server');
// 		},
		
// 		show: function () {
// 			console.log('show function');
// 		}
// 	}));
// });