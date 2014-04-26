define ([
		'underscore', 
		'backbone', 
		'models/Board', 
		'text!templates/test_temp.html',
		'app/InitMessageWindow'
], function (_, Backbone, BoardItem, MenuItemHTML, InitMessageWindow) {
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

		template: _.template('<a href="#"><div class="thumbContainer"><div class="mask"></div><img id="<%= itemTitle %>" src="<%= imgSrc %>" width=100 height=100 /></div></a>'),

		events: {
			'click img': 'navigateOnClick',
		},

		navigateOnClick: function (e) {

			var target = e.target;
			console.log(target.id);
			var collection;

			if (typeof target.id === 'string' && target.id === 'Chat') {
				
				// IF I KEEP IT LIKE THIS - REMOVE THIS MODULE DEPENDENCY InitMessageWindow.
				Backbone.history.navigate("messages", {trigger: true});
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