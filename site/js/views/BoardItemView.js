define ([
		'underscore', 
		'backbone', 
		'models/Board', 
		'text!templates/test_temp.html',
		'app/InitMessageWindow',
		'text!templates/boardItem.html'
], function (_, Backbone, BoardItem, MenuItemHTML, InitMessageWindow, BoardItemTemplate) {
'use strict';

	var BoardItemView = Backbone.View.extend({

		tagName: 'li',

		initialize: function () {

			this.model.on('change', this.render, this);
		},			
		
		render: function () {

			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		template: _.template(BoardItemTemplate),

		events: {
			'click img': 'navigateOnClick',
		},

		navigateOnClick: function (e) {
			e.preventDefault();
			var target = e.target;
			console.log(target.id);
			console.log(target);
			var collection;

			if (typeof target.id === 'string' && target.id === 'Chat') {
				
				// IF I KEEP IT LIKE THIS - REMOVE THIS MODULE DEPENDENCY InitMessageWindow.
				Backbone.history.navigate("Chat", {trigger: true});
			};

			if (typeof target.id === 'string' && target.id === 'Memory Game') {
				console.log('open memory game window');
				// Backbone.history.navigate("rss", {trigger: true});
			};

			if (typeof target.id === 'string' && target.id === 'Rss Feeds') {
				console.log('open rss feeds window');
			};
		},

		url: function () {
			
			return this.model.get('imgUrl');
		}

	});

	return BoardItemView;
});