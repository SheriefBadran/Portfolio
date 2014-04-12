define([
	'underscore', 
	'backbone', 
	'collections/BoardItemList',
	'collectionviews/BoardItemListView'
], 
function (_, Backbone, BoardItemList, BoardItemListView) {
'use strict';
	
	var ResumeApp = new (Backbone.Router.extend({

		routes: {
			'': 'index'
		},

		initialize: function () {
			var boardItemList = new BoardItemList();

			var boardItems = [
				{itemTitle: 'Chat', imgSrc: 'css/imgs/chat.png', cathegory: 'entertainment'},
				{itemTitle: 'Memory Game', imgSrc: 'css/imgs/rss.png', cathegory: 'entertainment'},
				{itemTitle: 'Rss Feeds', imgSrc: 'css/imgs/rss.png', cathegory: 'news'}
			];

			boardItemList.reset(boardItems);

			var boardItemListView = new BoardItemListView({collection: boardItemList});
			boardItemListView.render();

			console.log(boardItemListView.el);

			$('#menuBoard').html(boardItemListView.el);
		},

		start: function () {
			Backbone.history.start({pushState: true});
		},

		index: function () {
			console.log('index func is the place for initial fetch from server');
		},

		show: function () {
			console.log('show function');
		},

		chat: function () {
			console.log('Chat');
		},

		memoryGame: function () {
			console.log('MemoryGame');
		},

		rssFeed: function () {
			console.log('RssFeed');
		}
	}));

	return ResumeApp;
});