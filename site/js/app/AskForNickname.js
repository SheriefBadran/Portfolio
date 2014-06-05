define(['underscore'], function ( _ ) {
'use strict';

	function AskForNickname () {

		if (window.localStorage && !('sender' in localStorage)) {

			var nameRequested = true;
			while (nameRequested) {

				var sender = prompt('Enter your nick name:');

				if (sender !== null && sender.length > 1 && !($.trim(sender) === '')) {

					localStorage.setItem('sender', sender);
					nameRequested = false;
				}
				else {

					nameRequested = true;
				}
			};
		};

		var nickname = _.escape(localStorage.getItem('sender'));

		return nickname;
	};

	return AskForNickname;
});