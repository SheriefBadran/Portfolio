define(['underscore', 'backbone'], function (_, Backbone) {
'use strict';

	function InitCollectionView (modelsArr, collection, CollectionView) {

		if (_.isArray(modelsArr) && collection instanceof Backbone.Collection && typeof CollectionView === 'function') {

			// The literal objects in the array will become a collection of models when reset to the collection.
			collection.reset(modelsArr);

			// Instantiate backbone collection view - class. The collectionview manages all collection's models and views.
			var collectionView = new CollectionView({collection: collection});

			// Every model in the collection has a view. Render the view for each model.
			collectionView.render();
		}
		else {

			throw {message: 'InitCollectionView is called with invalid parameters.'};
			return;
		}

		return {
			View: collectionView,
			collection: collection
		};
	};

	return InitCollectionView;
});