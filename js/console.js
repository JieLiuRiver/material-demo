(function(){
	'use strict';
	angular
		.module('j.console',[])
		.factory('log',function(){
			return function(a,b){
				console.log(a,b);
			}
		})
})()