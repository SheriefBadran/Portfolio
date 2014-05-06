define(['socketio'], function (io) {
'use strict';

	window.socket = io.connect('http://localhost:3000');
});