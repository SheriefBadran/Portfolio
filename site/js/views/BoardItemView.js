define (['underscore', 'backbone', 'models/Board'], function (_, Backbone, BoardItem) {
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

		template: _.template('<a href="#"><div class="thumbContainer"><div class="mask"></div><img src="<%= imgSrc %>" width=100 height=100 /></div></a>'),

		events: {
			'click img': 'showMessage'
		},

		showMessage: function (e) {
			alert(this.model.get('itemTitle'));
		},

		url: function () {
			return this.model.get('imgUrl');
		}

	});

	return BoardItemView;
});