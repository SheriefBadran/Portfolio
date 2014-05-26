define(['underscore', 'backbone', 'views/BoardItemView'], function (_, Backbone, BoardItemView) {
'use strict';

	var BoardItemListView = Backbone.View.extend({

		tagName: 'ul',

		className: 'boardThumb',

		initialize: function () {

			this.collection.on('add', this.addItem, this);
		},

		addItem: function (boardItem) {

			var boardItemView = new BoardItemView({model: boardItem});
			this.$el.append(boardItemView.render().el);
		},

		render: function () {
			
			this.collection.forEach(this.addItem, this);
			return this;
		},

		insertIntoDOM: function (renderedHTML, parentEl) {
			
			parentEl.html(renderedHTML);
		}
	});

	return BoardItemListView;
});