(function(){
	'use strict';
	angular
		.module('App',['ui.router'])

		.run(runWork)

		.config(configWork)

		.factory('highlightInit', function(){
		    return function(){
		        setTimeout(function(){
		            hljs.initHighlightingOnLoad();
		            $('pre code').each(function(i, block) {
		                hljs.highlightBlock(block);
		            });
		        },500)
		    }
		})

		.controller('WrapCtrl', wrapController)

		.controller('Demo1.Controller', Demo1Controller)

		runWork.$inject = ['$rootScope','$state','$stateParams'];
		configWork.$inject = ['$stateProvider','$urlRouterProvider'];
		wrapController.$inject = ['$state', '$rootScope', '$http', '$timeout'];
		Demo1Controller.$inject = ['$state', '$rootScope', '$http', '$timeout', 'highlightInit'];
})()

function runWork($rootScope, $state, $stateParams){
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}
function configWork($stateProvider, $urlRouterProvider){
	$urlRouterProvider
		.otherwise('/demo1');

	$stateProvider
		.state('demo1',{
			url : "/demo1",
			views : {
				'main' : {
					templateUrl : "../react-native-tpls/demo1.html",
					controller : "Demo1.Controller",
					controllerAs : "vm"
				}
			}
		})
}
function wrapController($state, $rootScope, $http, $timeout){
	var vm = this;
	vm.items = [
		{
			itemName : "xx", newState : "demo1",
			itemName : "xx", newState : "demo2"
		}
	];
	vm.itemActive = "请选择";

	function changeView( item ){
		vm.itemActive = item.itemName;
	}
}
function Demo1Controller($state, $rootScope, $http, $timeout, highlightInit){
	highlightInit();
	var vm = this;
}