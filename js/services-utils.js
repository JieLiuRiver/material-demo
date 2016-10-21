/*公用服务模块*/
angular.module('jack.service',[])
    .factory('utils',[
        '$http',
        '$rootScope',
        function($http, $rootScope){
            var factory = {
                getSession : function(){
                    return {
                        "htl_companyname": "测试B公司",
                        "data": null,
                        "htl_stationid": 600973125,
                        "userid": 600973164,
                        "lastusetime": "2016-10-17 15:04:20",
                        "companytypeid": 0,
                        "mobilephone": "17017271210",
                        "loginname": "17017271210",
                        "companyid": 600973162,
                        "htl_companytypeid": 2010,
                        "stationtypeid": 1,
                        "username": "17017271210",
                        "stationid": 600973163,
                        "logintime": "2016-10-17 15:04:20",
                        "htl_companyid": 600973124,
                        "companytype": 2011,
                        "roletypeid": 1,
                        "stationname": "加盟A1站点",
                        "persisted": 1800,
                        "companyname": "加盟A1公司",
                        "stafficon": "",
                        "session": "dff6c89b1072464a9d166e9716ddb603",
                        "htl_stationname": "注册站点",
                        "companytypename": "加盟总部型物流",
                        "devicetype": 1,
                        "staffid": 600973164,
                        "staffname": "17017271210",
                        "roletypename": "系统管理员",
                        "ret": 0
                    }
                }
            };
            return factory;
        }
    ]);