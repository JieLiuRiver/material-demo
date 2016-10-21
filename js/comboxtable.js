
/*下拉表格指令*/

angular.module('jack.combox',[])
    .directive('comboxtable', ['$timeout', '$compile', function($timeout,$compile){
        return {
            restrict : "E",
            templateUrl : "../tpls/comboxtable.html",
            replace : false,
            scope:{
                name : '@',
                ngModel : '=',
                columnNames: "=columnNames", /*表头名*/
                columnFields : "=columnFields", /*表字段*/
                datas : "=",
                onQuery: "&onQuery", /*函数传递过来，控制什么时候调用*/
                recordcount:"@",  /*总共的条数*/
            },
            link : function(scope,element,attrs){

                //模型变量在scope作用域管理。

                /*comboxtable.html里的jquery dom节点*/
                //console.log(element)
                /*传进来的属性*/
                //console.log(attrs)
                //console.log('ngModel',attrs.ngModel); // 模型传过来，我们可以在指令这边来操作管理加以控制，譬如  attrs.ngModel = '流花车站';
                //console.log( 'name',attrs.name ); //  @  是什么就传什么，通常传字段名

                /*模型变量*/
                scope.comboxtable = {
                    value : "",
                    valueid : 0,
                    datasOnepage : [] /*一页的渲染数据*/
                };

                /*主容器*/
                var container=element.find(".comboxtable-v2-container");
                var bBtn = true;
                /*展现出来*/
                scope.isShowContainer = true;

                /*输入框获取光标*/
                scope.toggleShowTable = function($event){
                    if( bBtn ){
                        scope.isShowTable = true;
                        bBtn = false;
                    }else{
                        scope.isShowTable = false;
                        bBtn = true;
                    }
                    /*阻止默认的向上冒泡*/
                    $event.stopPropagation();
                };

                /*文档点击*/
                angular.element(document).click(function(){
                    $timeout(function(){
                        scope.isShowTable = false;
                        bBtn = true;
                    },20)
                });
                    
                /*点击*/
                scope.noHideTable =function($event){
                    /*阻止默认的向上冒泡*/
                    $event.stopPropagation();
                }

                /*点击使用*/
                scope.onSelect = function(obj){
                    scope.comboxtable.value  = obj.stationname;
                    scope.comboxtable.valueid  = obj.stationid;
                    scope.isShowTable = false;
                    bBtn = true;
                }

                /*点击查询*/
                scope.query = function(){
                    /*这个传过来的函数，挂在我们的scope下*/
                    scope.onQuery();
                }

                console.log('scope',scope);

                /**/
                //分页工具对象
                scope.paging={
                    pageNum:1,
                    pageSize:5,
                    //获取总条目数
                    getRecordCount:function(){
                        if(scope.recordcount==null||scope.recordcount==''){
                            return 0;
                        }
                        return scope.recordcount;
                    },
                    //根据总条目数getRecordCount和每页条目数pageSize计算出总页数
                    getPageCount:function(){
                        var pageCount;
                        if(this.getRecordCount()%this.pageSize==0)
                        {
                            pageCount=this.getRecordCount()/this.pageSize;
                        }
                        else
                        {
                            pageCount=Math.floor(this.getRecordCount()/this.pageSize)+1;
                        }
                        if(pageCount<this.pageNum)
                        {
                            this.pageNum=1;
                        }
                        return pageCount==0?1:pageCount;
                    },
                    //跳转到首页
                    skipToFirst:function(){
                        if(this.pageNum!=1)
                        {
                            this.pageNum=1;
                            $timeout(function(){
                                scope.onQuery();
                            },0.1);
                        }
                    },
                    //跳转到上一页
                    skipToPrevious:function(){
                        if(this.pageNum > 1)
                        {
                            this.pageNum=this.pageNum-1;
                            $timeout(function(){
                                scope.onQuery();
                            },20);
                        }
                    },
                    //跳转到下一页
                    skipToNext:function(){
                        if(this.pageNum<this.getPageCount())
                        {
                            this.pageNum=this.pageNum+1;

                            $timeout(function(){
                                scope.onQuery({pagenum:this.pageNum});
                            },20);
                        }
                    },
                    //跳转到末页
                    skipToLast:function(){
                        if(this.pageNum!=this.getPageCount())
                        {
                            this.pageNum=this.getPageCount();
                            $timeout(function(){
                                scope.onQuery();
                            },0.1);
                        }
                    },
                    //跳转到指定页数
                    skipToPage:function(page){
                        this.pageNum=page.pageNum;
                        $timeout(function(){
                            scope.onQuery();
                        },0.1);
                    }
                };

            }
        }
    }]);