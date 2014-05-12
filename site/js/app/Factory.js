define(['collections/BoardItemList'], function (BoardItemList) {
	
	return {
		getCollectionSet: function() {

			var boardItems = [
				{itemTitle: 'Chat', imgSrc: 'css/imgs/chat.png', cathegory: 'entertainment'},
				{itemTitle: 'Memory Game', imgSrc: 'css/imgs/rss.png', cathegory: 'entertainment'},
				{itemTitle: 'Rss Feeds', imgSrc: 'css/imgs/rss.png', cathegory: 'news'}
			];

			// Instantiate backbone collection class. The collection manages BoardItem models only.
			var boardItemList = new BoardItemList();

			return {
				boardItems: boardItems,
				boardItemList: boardItemList
			};
		},

		getMenuItems: function () {
			
		}
	};
})