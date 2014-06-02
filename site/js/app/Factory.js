define(['collections/BoardItemList', 'collections/MenuItemList'], function (BoardItemList, MenuItemList) {
	
	return {
		getBoardCollectionSet: function() {

			var boardItems = [
				{itemTitle: 'Chat', imgSrc: 'css/imgs/chat.png', cathegory: 'entertainment'},
				{itemTitle: 'Memory Game', imgSrc: 'css/imgs/memorygame.png', cathegory: 'entertainment'},
				{itemTitle: 'Rss Feeds', imgSrc: 'css/imgs/rss.png', cathegory: 'news'}
			];

			// Instantiate backbone collection class. The collection manages BoardItem models only.
			var boardItemList = new BoardItemList();

			return {
				boardItems: boardItems,
				boardItemList: boardItemList
			};
		},

		getMenuCollectionSet: function () {
			
			var menuItems = [
				{itemTitle: 'Home'},
				{itemTitle: 'My Work'},
				{itemTitle: 'Contact Me'},
				{itemTitle: 'About This App'}
			];

			var menuItemList = new MenuItemList();

			return {
				menuItems: menuItems,
				menuItemList: menuItemList
			};
		}
	};
})