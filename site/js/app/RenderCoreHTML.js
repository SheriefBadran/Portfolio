define(['models/Header', 
		'models/MainWrapper',
		'views/HeaderView',
		'views/MainWrapperView'
],
function (Header, MainWrapper, HeaderView, MainWrapperView) {
'use strict';
	
	// Private properties.
	var container = $('#container'),
	header = new Header({}),
	headerView = new HeaderView({model: header}),

	mainWrapper = new MainWrapper({}),
	mainWrapperView = new MainWrapperView({model: mainWrapper}),

	headerHTML = headerView.render(),
	mainHTML = mainWrapperView.render(); 
	
	return {
		renderHeader: function () {
			
			container.append(headerHTML.$el);
			return headerHTML.$el;
		},

		renderMain: function () {
			
			container.append(mainHTML.$el);
			return mainHTML.$el;
		}
	}
});