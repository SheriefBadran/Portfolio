define([
			'collections/BoardItemList', 
			'collectionviews/BoardItemListView'
], 
function (BoardItemList, BoardItemListView) {
'use strict';

	function InitMenuBoard () {

		// Instantiate backbone collection class. The collection manages BoardItem models only.
		var boardItemList = new BoardItemList();


		var boardItems = [
			{itemTitle: 'Chat', imgSrc: 'css/imgs/chat.png', cathegory: 'entertainment'},
			{itemTitle: 'Memory Game', imgSrc: 'css/imgs/rss.png', cathegory: 'entertainment'},
			{itemTitle: 'Rss Feeds', imgSrc: 'css/imgs/rss.png', cathegory: 'news'}
		];

		// The literal objects in the boardItems array will become a collection of models when reset to the collection.
		boardItemList.reset(boardItems);

		// Instantiate backbone collection view - class. The collectionview manages all collection's models and views.
		var boardItemListView = new BoardItemListView({collection: boardItemList});

		// Every model in the collection has a view. Render the view for each model.
		boardItemListView.render();

		return boardItemListView.el;
	};

	return InitMenuBoard;
});