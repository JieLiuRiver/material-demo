/*
*	author : heliujie
	date : 2016-11-02
	依赖： <script src="../js/l-by-l.min.js"></script> 逐句打字效果
*/
(function(){
	'use strict';
	angular
		.module('j.board',['mgcrea.ngStrap','j.console'])
		.directive('board',paginationFactory)

		paginationFactory.$inject = ['$timeout', '$http', '$compile', '$interval','log','$log'];
		function paginationFactory($timeout, $http, $compile, $interval,log, $log){
			var config = {
				restrict : "E",
				templateUrl : "../tpls/board.html",
				replace : false,
				scope : {
					configData : "="	/*传递配置参数过来*/
				},
				link : linkWork
			}
			function linkWork(scope, element, attrs){
				var wallsLength = 0;
				var timer1 = null;
				var timer2 = null;
				var timer3 = null;
				var timer4 = null;
				var num = false;
				var walls = [];
				scope.shakeAmimate = shakeAmimate;
				scope.removeAmimate = removeAmimate;
				scope.removeAmimate2 = removeAmimate2;
				/*遍历数据 循环*/
				scope.rows = angular.copy(scope.configData.rows);
				/*wall个数*/
				wallsLength= Math.ceil(scope.configData.rows.length/5);
				/*构造walls数据*/
				for( var i=0; i<wallsLength; i++ ){
					walls.push({
						topPosition : 110*(i+1) + 60*i
					});
				}
				/*$log.info('hello world', scope.configData)
				$log.log('hello world', scope.configData)
				log('hello world', scope.configData)
				$log.warn('hello world', scope.configData)*/

				/* 遍历数据 循环*/
				scope.walls = angular.copy(walls);
				scope.tooltip = [
					{
						"title" : "hello",
						"checked": true
					}
				];
				function shakeAmimate($event, item){
					num = false;
					var $a = angular.element($event.target).parents('.page1');
					var $a2 = angular.element($event.target).parents('li').find('.page2');
					$timeout.cancel(timer1);
					timer1 = $timeout(function(){
						num = true;
						$a.animate({
							left : -50
						},500);
						$a2.animate({
							left : 50
						},500);
						$timeout.cancel(timer2);
					}, 200);
				}
				function removeAmimate($event, item){
					if( num == false ){
						$timeout.cancel(timer1);
						return;
					}
					var $a = angular.element($event.target).parents('li').find('.page1');
					var $a2 = angular.element($event.target).parents('.page2');					$a.animate({
							left : 0
					},300);
					$a2.animate({
							left : 0
					},300);
				}
				function removeAmimate2($event, item){
					var $a2 = angular.element($event.target).parents('li').find('.page2');
					var $a = angular.element($event.target).parents('.page1');
					if( $a2.css('left') != '0px'){
						$a.animate({
								left : 0
						},300);
						$a2.animate({
								left : 0
						},300);
					}
				}
			}
			return config;
		}

})()