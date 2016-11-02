/*
	author : heliujie
	date : 2016-11-01
	@ 传递的是变量，控制器传递带有数据的变量过来，指令可以接收显示在模块中
	& 传递函数，可以在指令中使用
	依赖：  <script src="../js/jquery.hover3d.min.js"></script>
	插件网址：http://www.htmleaf.com/jQuery/Image-Effects/201603123209.html#0-huaban-1-38773-a46a6d518beb2e5bf66279e3506e3905
*/
(function(){
	'use strict';
	angular
		.module('M.smartisan',[])
		.directive('coolPic',coolPicFactory)

		coolPicFactory.$inject = ['$timeout', '$http', '$compile', '$interval'];
})();
function coolPicFactory($timeout, $http, $compile, $interval){
	var config = {
		restrict : "E",
		templateUrl : "../tpls/coolpic.html",
		replace : false,
		scope : {
			name : "@",
			myData : '=',
			fn1 : '&',
			id : "@",
			configData : "="	/*传递配置参数过来*/
		},
		link : linkWork
	}
	function linkWork(scope, element, attrs){
		console.log('scope', scope);
		console.log('attrs',attrs);
		scope.getPosition = getPosition;
		scope.coolpicWrap = {
			"width" : scope.configData.width ,
			"height" : scope.configData.height,
			"position" : "absolute",
			"top" : 0,
			"overflow":"hidden",
			"zIndex" : 100,
			"transition" : ".3s",
			"borderRadius" : scope.configData.borderRadius,
			'backgroundColor' : scope.configData.backgroundColor,
			"left" : "calc( 50% - "+ scope.configData.width +"/2 )"
		}
		scope.activeItem = true;
		var num = 0;
		$interval(function(){
			num++;
			if( num == 3 ){
				num = 0;
			}
			var $items = angular.element(element).find('.coolpic-item');
			var $itemtips = angular.element(element).find('.coolpic-tip-item');
			angular.forEach($items, function(item, index){
				angular.element(item).hide();
			});
			angular.forEach($itemtips, function(itemTip, index){
				angular.element(itemTip).removeClass('active');
			})
			$items.eq(num).show();
			$itemtips.eq(num).addClass('active');
		},10000);
		$('.project').hover3d({
			selector :　".project__card",
			sensitivity : 50,
			perspective : 3000
		})
		function getPosition($event){
			var offset_left = angular.element($event.target).offset().left;
			var offset_top = angular.element($event.target).offset().top;
			if( $event.clientX - offset_left < 500 && $event.clientY - offset_top < 250 ){
				
				$(".project__card").css({
					boxShadow : "9px 10px 10px 1px rgba(0, 0, 0,0.1)"
				});
			}else if( $event.clientX - offset_left > 500 && $event.clientY - offset_top < 250 ){
				
				$(".project__card").css({
					boxShadow : "-9px 5px 10px 1px rgba(0, 0, 0,0.1)"
				});
			}else if( $event.clientX - offset_left < 500 && $event.clientY - offset_top > 250 ){
				
				$(".project__card").css({
					boxShadow : "9px -2px 10px 1px rgba(0, 0, 0,0.1)"
				});
			}else if( $event.clientX - offset_left > 500 && $event.clientY - offset_top > 250 ){
				
				$(".project__card").css({
					boxShadow : "-9px -2px 10px 1px rgba(0, 0, 0,0.1)"
				});
			}
		}
	}
	return config;
}