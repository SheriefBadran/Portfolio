define (['underscore', 'backbone', 'models/Board'], function (_, Backbone, BoardItem) {
	boardItem = new BoardItem({itemTitle: 'Memory Game'});
	var BoardItemView = Backbone.View.extend({

		initialize: function () {
			this.model.on('change', this.render, this);
		},

		tagName: 'li',

		className: 'thumb',

		template: _.template('<a href="#"><div></div><div><img src="css/imgs/image.JPG" width=100 height=100 /></div></a>'),

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
		},

		events: {
			'click img': 'alertMessage'
		},

		alertMessage: function (e) {
			alert('Image is clicked!');
		}

	});

	return BoardItemView;
});