require.config({

	paths: {
		lib: '../libs',
		tests: '../tests',
		app: '../app'
	}
});

var tests = [
	'tests/app/domOperations'
];

require (tests, function(domOperations) {	
	domOperations.test();

	if (window.mochaPhantomJS) {
		mochaPhantomJS.run();
	}
	else {
		mocha.run();
	}
});