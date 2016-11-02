/*
*	author : heliujie
	date : 2016-11-02
*/
(function(){
	'use strict';
	angular
		.module('j.notebox',[])
		.directive('notebox',paginationFactory)

		paginationFactory.$inject = ['$timeout', '$http', '$compile', '$interval'];
		function paginationFactory($timeout, $http, $compile, $interval){
			var config = {
				restrict : "E",
				templateUrl : "../tpls/notebox.html",
				replace : false,
				scope : {
					configData : "="	/*传递配置参数过来*/
				},
				link : linkWork
			}
			function linkWork(scope, element, attrs){
				console.log(scope)
				var timer = null;
				scope._left = 0;
				scope.stopTimer = stopTimer;
				scope.startTimer = startTimer;
				initWork();
				function startTimer(){
					goRun();
				}
				function stopTimer(){
					$interval.cancel(timer);
				}
				function initWork(){
					var totalWidth = 0;
					/*样式*/
					scope.noteboxwrap = {
						"width" : scope.configData.width,
						"height" : scope.configData.height,
						"overflow" : "hidden",
						"position" : "relative"
					}
					/*遍历数据*/
					scope.rows = angular.copy( scope.configData.rows);
					goRun();
				}
				function goRun(){
					$interval.cancel(timer);
					timer = $interval(function(){
						scope._left -= 1;
						if( scope._left < -1250 ){
							scope._left = 0;	
						}
						angular.element('.notebox-list').css({
							left : scope._left
						})
					},20);
				}
			}
			return config;
		}

})()