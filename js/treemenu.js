/*
	author : heliujie
	date : 2016-11-03
	依赖： ngMaterial  要设transclude : true;   jquery.mousewheel.js
*/
(function(){
	'use strict';
	angular
		.module('j.treeMenu',['ngMaterial'])
		.directive('treeMenu', treeMenuFactory);
		treeMenuFactory.$inject = ['$timeout', '$http', '$compile', '$interval','$log'];
		function treeMenuFactory($timeout, $http, $compile, $interval, $log){
			var config = {
				restrict : "E",	//E 元素 A属性
				transclude : true , //设为true意味着当前指令里面有个自定义指令，可以嵌套在里头，不会被覆盖。那存在哪里？存在模版tpl中的ng-transclude指令的标签里
				templateUrl : "../tpls/treemenu.html",
				replace : false,
				scope : {			/*scope 意义在于 这个指令有一个独立的作用域，而且还是隔离的，不跟外层作用域有关系，不会互相伤害*/
					options : "="	/*传递配置参数过来*/
				},
				link : linkWork,		/*link 主要负责该指令的功能实现*/
				controller : ['$scope', function($scope){	/*controller 共享数据、可以让其他指令找到数据*/
					this.name = "hello"; //传数据给我里面的指令,注意是this的写法。 还有一个前提，就是子指令里头要接收我这边传过去的数据,如何设置它接收？ 它的配置中，添加: require:"?^directiveName" //向上找这个名字的指令，
				}]
			}
			function linkWork(scope, element, attrs, reController){
				//reController 要依赖的controller对象   有指令发送数据给我当前这个指令， 我这里取到它的控制器作用域，get到数据
				//	console.log(scope)
				/*遍历第一层菜单*/
				scope.step1Items = angular.copy( scope.options.step1Items );
				/*点击 第一层菜单事件*/
				scope.openStep2Menu = openStep2Menu;
				/*点击 第二层菜单事件*/
				scope.openStep3Menu = openStep3Menu;
				/*是否能向上滚*/
				scope.isCanScrollToTop = false;
				/*是否能向下滚*/
				scope.isCanScrollToBottom = false;
				/*监听最外层ul的高度*/
				scope.listenHeight = 'auto';
				scope.treemenuStep1List = {
					height : scope.listenHeight
				}
				scrollEvent();
				function openStep2Menu($event, item){
					/*如果未展开*/
					if( !item.isStep2Expanded ){
						if( angular.isDefined( item.step2Items ) ){
							var step2Length = item.step2Items.length;
							/*计算当前li要扩大多少高度*/
							angular.element($event.target).parents('.treemenu-step1-item').height(40*(step2Length+1));
							/*干掉当前li的margin-bottom*/
							angular.element($event.target).parents('.treemenu-step1-item').css('marginBottom',0)
							item.isStep2Expanded = true;
							/*检查最外层ul高度*/
							checkUlHeight()
						}
					}else{
						/*还原*/
						item.isStep2Expanded = false;
						angular.element($event.target).parents('.treemenu-step1-item').height(40*(0+1));
						angular.element($event.target).parents('.treemenu-step1-item').css('marginBottom',"4px")
						if( angular.isObject(item) && angular.isArray(item.step2Items) ){
							angular.forEach(item.step2Items, function(o, i){
								if( o.isStep3Expanded ){
									angular.element($event.target).parents('.treemenu-step1-item').find('.treemenu-step2-list').find("li:eq("+ i +")").height(40);
									var aLi = angular.element($event.target).parents('.treemenu-step1-item').find('.treemenu-step2-list').find('.treemenu-step2-item');
									angular.forEach(aLi, function(oLi, k){
										if( $.trim($(oLi).find("button:first").text()) == o.name){
											$(oLi).height(40)
										}
									})
									o.isStep3Expanded = false;
								}
							})
						}
					}
				}
				function openStep3Menu($event, item){
					/*如果未展开*/
					//console.log(item)
					if( !item.isStep3Expanded ){
						if( angular.isDefined(item.step3Items) ){
							var step3Length = item.step3Items.length;
							/*计算当前li要扩大多少高度*/
							angular.element($event.target).parents('.treemenu-step2-item').height(40*(step3Length+1));
							var step1ItemHeight = angular.element($event.target).parents('.treemenu-step1-item').height();
							angular.element($event.target).parents('.treemenu-step1-item').height( step1ItemHeight + 40*(step3Length) );
							/*干掉当前li的margin-bottom*/
							angular.element($event.target).parents('.treemenu-step2-item').css('marginBottom',0)
							item.isStep3Expanded = true;
							/*检查最外层ul高度*/
							checkUlHeight();
						}
					}else{
						if( angular.isDefined(item.step3Items) ){
							var step3Length = item.step3Items.length;
							item.isStep3Expanded = false;
							/*还原*/
							angular.element($event.target).parents('.treemenu-step2-item').height(40*(0+1));
							var step1ItemHeight = angular.element($event.target).parents('.treemenu-step1-item').height();
							angular.element($event.target).parents('.treemenu-step1-item').height( step1ItemHeight - 40*(step3Length) );
							//angular.element($event.target).parents('.treemenu-step2-item').css('marginBottom',"4px");
						}
					}
				}
				function checkUlHeight(){
					var _h = angular.element(".treemenu-step1-list").height();
					var _hM = angular.element(".treemenu-box").height();
					if( _h > _hM ){
						scope.isCanScrollToBotttom = true;
					}
				}
				function scrollEvent(){
					$(".treemenu-step1-list").bind('mousewheel', function(event, delta, deltaX, deltaY) {
						if( delta == -1 ){
							$(".treemenu-step1-list").animate({
								top : -100
							},500)
						}else if( delta == 1 ){
							$log.info('向上滚')
						}
					})
				}

				var datasource = {};

				datasource.get = function (index, count, success) {
					$timeout(function () {
						var result = [];
						for (var i = index; i <= index + count - 1; i++) {
							result.push("item #" + i);
						}
						success(result);
					}, 100);
				};

				scope.datasource = datasource;
				
			}


			return config; /*如果没写这一行，报错'compile' of undefined*/
		}
})()