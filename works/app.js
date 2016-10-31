
/*
* 2016.10.17
* heliujie
* */
/*定义app模块，注入依赖模块*/
(function () {
    'use strict';
    angular
        .module('App',[
            'mgcrea.ngStrap',
            'ngMessages',
            'ui.router',
            'jack.service',
            'ngMaterial',
            'jack.combox',
            'treeControl'
        ])

        .run(['$rootScope', '$state', '$stateParams',routeRun])

        /*路由配置*/
        .config(['$stateProvider','$urlRouterProvider',routeConfig])

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

        .factory('initEChart',function(){
            var factory = {};
            factory.render = function(opt){
                var myChart = echarts.init(opt.id);
                myChart.setOption(opt.option);
                return this;
            };
            return factory;
        })

        /*wrap控制器*/
        .controller('WrapCtrl',wrapController)

        /*demo1控制器*/
        .controller('Demo1.Controller',demo1Controller)

})();

/*$state挂到$rootScope*/
function routeRun($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}
/*路由配置*/
function routeConfig($stateProvider, $urlRouterProvider){
    /*默认路由*/
    $urlRouterProvider.otherwise('/demo1');
    /*定义路由*/
    $stateProvider
        .state('demo1',{
            url : "/demo1",
            views : {
                'main' : {
                    templateUrl : "../works-tpls/demo1.html",
                    controller : 'Demo1.Controller',
                    controllerAs :　"vm"
                }
            }
        })
}
/*依赖注入*/
wrapController.$inject = ['$state','$rootScope','$modal','$alert','$http','$timeout', 'utils'];
demo1Controller.$inject = ['$scope','$state','$rootScope','$modal','$alert','$http','$timeout', 'utils','initEChart','highlightInit','$interval'];

/*构造函数*/
/*管理wrap*/
function wrapController($state, $rootScope, $modal, $alert, $http, $timeout, utils){
        var vm = this;
        vm.items = [
            {  itemName : "柱状图", newState : 'demo1'},
        ];
        vm.itemActive = '请选择';
        vm.changeView = changeView;

        /*==============  具体实现函数 ==================*/
        function changeView(item){
            vm.itemActive = item.itemName;
        }
}
/*管理demo1*/
function demo1Controller($scope, $state, $rootScope, $modal, $alert, $http, $timeout, utils, initEChart, highlightInit, $interval){
    var vm = this, timer, str;
    var iNew = new Date('2016-10-27 4:00');
    clearInterval(timer);  //清定时器
    timer = $interval (function(){  //注意这个定时器包的内容、范围。
        iNow = new Date();
        t = Math.floor((iNew - iNow)/1000);
        if(t>=0){  //注意倒计时结束的这个判断 。
            str =  Math.floor(t%86400/3600)+':'+Math.floor(t%86400%3600/60)+':'+t%60;
            vm.countdown = str;
        }else{
            clearInterval(timer);
        }
    },1000);

    vm.users = [];
    var n = 0;
    var m = 0;
    vm.height = 0;
    $interval(function(){
        var obj = {
            mifanname : "借鸡生蛋",
            word : "小米mix一出，太惊艳了"
        };
        n++;
        vm.users.push(obj);
        vm.heightstyle = {
            height : ($("#list").height() + 30*n) +'px'
        }
        if( $("#list").height() >= 500 ){
            m++;
            $("#list").animate({bottom:30*m+'px'})
        }
    },2000);
}
