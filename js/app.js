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
			'views/BoardItemView',
			'collections/BoardItemList',
			'collectionviews/BoardItemListView'
], 
function(_, Backbone, test_temp, BoardItem, BoardItemView, BoardItemList, BoardItemListView) {	
	
	// INSTANTIATE A MODEL chat-board-menu-item
	var boardItem = new BoardItem({itemTitle: 'Chat', imgSrc: 'css/imgs/chat.png'});
	console.log(boardItem.get('itemTitle'));
	console.log(boardItem.get('imgSrc'));

	// INSTANTIATE A VIEW 
	var boardItemView = new BoardItemView({model: boardItem});
	boardItemView.render();

	$('.thumb').html(boardItemView.el);

	// EXPERIMENT WITH A COLLECTION!
	// boardItemList will now be able to handle a set of models.
	var boardItemList = new BoardItemList();
	boardItemList.on('shout!', function () {
		console.log('I am a custom app.js eventlistener!');
	});
	boardItemList.trigger('shout!');

	boardItemList.add(boardItem);

	console.log(boardItemList.length);
	console.log(boardItemList.at(0));

	boardItemList.remove(boardItem);
	console.log(boardItemList.length);

	var boardItems = [
		{itemTitle: 'Chat', imgSrc: 'css/imgs/chat.png', cathegory: 'entertainment'},
		{itemTitle: 'Memory Game', imgSrc: 'css/imgs/memory.png', cathegory: 'entertainment'},
		{itemTitle: 'Rss Feeds', imgSrc: 'css/imgs/rss.png', cathegory: 'news'}
	];

	boardItemList.reset(boardItems);

	console.log(boardItemList.length);
	console.log(boardItemList.at(1));

	boardItemList.forEach(function (boardItem) {
		console.log(boardItem.get('itemTitle'));
	});

	var entertainmentItems = boardItemList.map(function (boardItem) {
		return boardItem.get('cathegory') === 'entertainment';
	});

	console.log(entertainmentItems);

	// EXPERIMENTING WITH A COLLECTIONVIEW!
	var boardItemCollectionView = new BoardItemListView({collection: boardItemList});

	// var compiledTemplate = _.template(test_temp);
	// console.log(Appointment);
	// console.log(compiledTemplate());
});