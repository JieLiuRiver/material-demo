/*
*	author : heliujie
	date : 2016-11-01
	依赖 ：bootstrap.css
*/

(function(){
	'use strict';
	angular
		.module('j.pagination',[])
		.directive('pagination',paginationFactory)

		paginationFactory.$inject = ['$timeout', '$http', '$compile', '$interval'];
		function paginationFactory($timeout, $http, $compile, $interval){
			var config = {
				restrict : "E",
				templateUrl : "../tpls/pagination.html",
				replace : false,
				scope : {
					configData : "="	/*传递配置参数过来*/
				},
				link : linkWork
			}
			function linkWork(scope, element, attrs){
				//console.log(scope)
				/*是否隐藏 '上一页' */
				scope.isHidePrev = false;
				/*是否隐藏 '下一页'*/
				scope.isHideNext = false;
				/*点击数字，切换页*/
				scope.changePage = changePage;
				/*点击 上一页*/
				scope.getPrevPage = getPrevPage;
				/*点击 下一页*/
				scope.getNextPage = getNextPage;
				/*当前页*/
				var currentPage = scope.configData.pagenum;
				/*数字按钮 开始数*/
				var start = 1;
				/*点击查询*/
				scope.query = query;
				/*是否隐藏首页*/
				scope.isHideBenginPage = false;
				/*是否隐藏尾页*/
				scope.isHideEndPage = false;
				/*点击 首页*/
				scope.getBenginPage = getBenginPage;
				/*点击 尾页*/
				scope.getEndPage = getEndPage;
				refreshAmoutBtn(start, currentPage);

				/*更新数字按钮*/
				function refreshAmoutBtn(start, pagenum){
					if( initAmoutsData(start, pagenum) ){
						scope.amouts = angular.copy( initAmoutsData(start, pagenum) );
						console.log(scope.amouts)
						/*如果开始数字是1 隐藏上一页*/
						if( scope.amouts[0].size == 1 ){
							scope.isHidePrev = true;
							scope.isHideBenginPage = true;
						}else{
							scope.isHidePrev = false;
							scope.isHideBenginPage = false;
						}
						/*如果最后一个数字是total，隐藏下一页*/
						//console.log( scope.amouts[scope.amouts.length-1] )
						if( scope.amouts[scope.amouts.length-1].size == scope.configData.total ){
							scope.isHideNext = true;
							scope.isHideEndPage = true;
						}else{
							scope.isHideNext = false;
							scope.isHideEndPage = false;
						}

					}else{
						console.log('没生成数字按钮');
					}
				}
				/*计算出页数*/
				function getPageCount(){
					/*如果不足一页或刚好一页*/
					if( scope.configData.total <= scope.configData.amout ){
						return 1;
					}
					/*如果没有数据*/
					if( scope.configData.total == 0 || angular.isUndefined( scope.configData.total ) ){
						return false;
					}
					/*如果刚好倍数关系*/
					if( scope.configData.total%scope.configData.amout == 0 ){
						return scope.configData.total/scope.configData.amout;
					}
					/*其他*/
					return Math.floor(scope.configData.total/scope.configData.amout) + 1;
				}
				/*获取数字按钮*/
				function initAmoutsData(start, pagenum){
					/*是否当前*/
					var isActive = false;
					var amouts = [];
					var amout = 0;
					/*从哪个数开始*/
					var startnum = start;

					/*如果总条数小于amout*/
					if( scope.configData.total < scope.configData.amout ){
						amout = scope.configData.total;
					}else{
						amout = scope.configData.amout;
					}
					/*如果不够9个了，从后补齐*/
					if( amout+1 - startnum < 9 ){
						var lose = 9 - (amout+1 - startnum);
						for( var i=0; i<lose; i++ ){
							amout++;
						}
						/*如果大于total,则取total*/
						if( amout > scope.configData.total ){
							amout = scope.configData.total;
						}
					}
					/*循环生成数字*/
					for(var i=startnum; i<amout+1; i++){
						/*如果是当前点击的这个，设置active*/
						if( i == pagenum ){
							isActive = true;	
						}else{
							isActive = false;
						}
						amouts.push({
							size : i,
							active : isActive
						});
					}
					if( amouts ){
						return amouts;
					}else{
						return false;
					}
				}
				/*点击数字，切换页*/
				function changePage($event){
					/*点击的页数*/
					var pagenum = Number(angular.element($event.target).text());
					currentPage = pagenum;
					/*如果点击的这个页数往后退4位后得到的数字，仍然大于或者等于1，则这个页数居中*/
					if( pagenum - 4 >= 1 ){
						refreshAmoutBtn(pagenum - 4, pagenum);
					}else if( pagenum - 4 < 1 ){
						refreshAmoutBtn(1, pagenum);
					}
					var params = {
						pagesize : scope.configData.pagesize,
						pagenum : currentPage
					}
					query(params);
				}
				/*点击上一页*/ getNextPage
				function getPrevPage(){
					currentPage = currentPage - 1;
					var params = {
						pagesize : scope.configData.pagesize,
						pagenum : currentPage
					}
					if( currentPage - 4 >= 1 ){
						refreshAmoutBtn(currentPage-4, currentPage);
					}else if( currentPage - 4 < 1 ){
						refreshAmoutBtn(1, currentPage);
					}
					query(params);
				}
				/*点击下一页*/ 
				function getNextPage(){
					currentPage = currentPage + 1;
					var params = {
						pagesize : scope.configData.pagesize,
						pagenum : currentPage
					}
					if( currentPage - 4 >= 1 ){
						refreshAmoutBtn(currentPage-4, currentPage);
					}else if( currentPage - 4 < 1 ){
						refreshAmoutBtn(1, currentPage);
					}
					query(params);
				}
				/*发请求，查询*/
				function query(params){
					var params = angular.extend(scope.configData.params, params);
					$http({
						method : "GET",
						url : scope.configData.queryUrl,
						params : params
					})
					.success(function(resp){
						console.log(resp)
					})
					.error(function(error){
						console.log(error)
					})
				}
				/*点击 首页*/
				function getBenginPage(){
					currentPage = 1;
					var params = {
						pagesize : scope.configData.pagesize,
						pagenum : currentPage
					}
					if( currentPage - 4 >= 1 ){
						refreshAmoutBtn(currentPage-4, currentPage);
					}else if( currentPage - 4 < 1 ){
						refreshAmoutBtn(1, currentPage);
					}
					query(params);
				}
				/*点击 尾页*/
				function getEndPage(){
					currentPage = scope.configData.total;
					var params = {
						pagesize : scope.configData.pagesize,
						pagenum : currentPage
					}
					if( currentPage - 4 >= 1 ){
						refreshAmoutBtn(currentPage-4, currentPage);
					}else if( currentPage - 4 < 1 ){
						refreshAmoutBtn(1, currentPage);
					}
					query(params);
				}
			}
			
			return config;	
		}

})()