(function(global, factory) {
	'use strict';
	//the next lines untill line 13 handles differnet execution environments
	if (typeof exports === 'object') {
		// CommonJS

		module.exports = factory;
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define([], factory);
	} else {
		// Global Variables
		global.spyOn = factory;
	}
	// the next line pass the global scope and a wrapper of spyOn
	// in this way spy on will be available in the global scope
}(this, function(fn, ctx){
	var timesCalled = 0;
	var args = [];
	
	
	function spyfn(/* arguments */){
		timesCalled++;
		//next line convert weird argumets object into array and saves it to args
		args.push([].slice.call(arguments));
		//next line binds the this of spyfn to the function i want to spy on
		//in this way the new fn has access to timesCalled witch is what I want to know.
		//the arguments array is required by apply 
		//and contains the parameters to be used at runtime
		return fn.apply(ctx, arguments);
	};
	//all following methods are added tp spyfn constructor
	//in particular restore return the origina function that was passed
	spyfn.restore = function(){
		return fn;
	};

	spyfn.getTimesCalled = function(){
		return timesCalled;
	};

	spyfn.getArgsOfCall = function(callIndex){
		return args[callIndex];
	};

	return spyfn;
}));
