define (['underscore', 'backbone', 'models/Board'], function (_, Backbone, BoardItem) {
	boardItem = new BoardItem({itemTitle: 'Memory Game'});
	var BoardItemView = Backbone.View.extend({

		tagName: 'li',

		className: 'thumb',

		initialize: function () {
			this.model.on('change', this.render, this);
		},			
		
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
		},

		template: _.template('<a href="#"><div class="thumbContainer"><div class="mask"></div><img src="css/imgs/image.JPG" width=100 height=100 /></div></a>'),

		events: {
			'click img': 'showMessage'
		},

		showMessage: function (e) {
			alert('Message');
		}

	});

	return BoardItemView;
});