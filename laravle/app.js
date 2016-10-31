
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
                    templateUrl : "../laravel-tpls/demo1.html",
                    controller : 'Demo1.Controller',
                    controllerAs :　"vm"
                }
            }
        })
}
/*依赖注入*/
wrapController.$inject = ['$state','$rootScope','$modal','$alert','$http','$timeout', 'utils'];
demo1Controller.$inject = ['$scope','$state','$rootScope','$modal','$alert','$http','$timeout', 'utils','initEChart','highlightInit'];

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
function demo1Controller($scope, $state, $rootScope, $modal, $alert, $http, $timeout, utils, initEChart, highlightInit){
    var vm = this;
    highlightInit();

    vm.treeOptions = {
        nodeChildren: "children",
        dirSelectable: true,
        injectClasses: {
            ul: "a1",
            li: "a2",
            liSelected: "a8",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            labelSelected: "a8"
        }
    }
    vm.dataForTheTree =
    [
        { "title":"关于路由", 'id' : 1, "children" :[]},
        { "title":"关于中间件",'id' : 2, "children" : [] },
        { "title":"关于控制器",'id' : 3, "children" : [] },
        { "title":"关于请求",'id' : 4, "children" : [] },
        { "title":"关于响应", 'id' : 5,"children" : [] },
        { "title":"关于视图",'id' : 6, "children" : [] }
    ];
    vm.showSelected = function(node){
        console.log(node);
       
    }
}
