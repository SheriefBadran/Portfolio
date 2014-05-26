define(['app/Factory',
		'app/InitCollectionView',
		'collectionviews/BoardItemListView',
		'collectionviews/MenuItemListView'
],
function (Factory, InitCollectionView, BoardItemListView, MenuItemListView) {
'use strict';
	
	return {
		renderCollectionView: function (collectionViewName, parentEl) {
			
			var collectionView;
			
			if (typeof collectionViewName === 'string' && parentEl.length && parentEl instanceof jQuery) {

				if (collectionViewName === 'BoardItemListView') {

					// Retrieve an object literal with boardItem models and a boardItemList Collection.
					var boardCollectionSet = Factory.getBoardCollectionSet();

					try {

						// Retrieve rendered html for the apps menu board.
						var portfolioMenu = InitCollectionView(boardCollectionSet.boardItems, boardCollectionSet.boardItemList, BoardItemListView);
						collectionView = portfolioMenu.View;
					}
					catch (e) {

						console.log(e.message);
					}

					// Set a timeout for timing with the css3 page loader.
					setTimeout(function () {

						// Inject the rendered HTML into the DOM.
						// BoardItemListView.insertIntoDOM(portfolioMenu.View.el);
						collectionView.insertIntoDOM(portfolioMenu.View.el, parentEl);
						// parentEl.html(portfolioMenu.View.el);
					}, 1600);
				};

				if (collectionViewName === 'MenuItemListView') {

					// Retrieve rendered html for the general menu.
					var menuCollectionSet = Factory.getMenuCollectionSet();

					try {

						var menu = InitCollectionView(menuCollectionSet.menuItems, menuCollectionSet.menuItemList, MenuItemListView);
						collectionView = menu.View;
					}
					catch (e) {

						console.log(e.message);
					}

					// parentEl.append(menu.View.$el);
					collectionView.insertIntoDOM(menu.View.$el, parentEl);
				};
			}
			else {

				throw {message: 'RenderHTML.renderCollectionView is called with invalid parameters'};
			}
		},

		renderChatLoader: function () {

			require(['views/ChatLoaderView'], function (ChatLoaderView) {
				
				var chatLoaderView = new ChatLoaderView({}),
				chatLoaderHTML = chatLoaderView.render();

				if ($.trim($("#portfolioAppsContent").html())=='') {

					$('#portfolioAppsContent').html(chatLoaderHTML.$el);
				}
			});
		}
	}

});