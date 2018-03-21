import fetch from 'api/fetch';
export default {
    //方式示例
    getThisMonthStore: function (mon,orgId) {
        return new Promise(function (resolve, reject) {
            let arr = mon.split('-'); 
            let year=arr[0];
            let month=parseInt(arr[1])+1;
            if (month == 13) {  
                year = parseInt(year) + 1;  
                month = 1;  
            };
            if(month<10){
                month='0'+month;
            };
            let rstmon=year+'-'+month;
            let params={
                queryConditionItem:[
                    {dataField:'OrgId',dataValue:orgId,op:'EQ',relation:'and'},
                    {dataField:'V_Col10',dataValue:rstmon,op:'EQ',relation:'and'}
                ],
                maxResultCount:1,
                skipCount:1,
                sorting:'',
                draw:1
            };
            fetch({ 
                  url: 'api/services/app/singleTable31/getMainPageList',
                  method: 'post',
                  data:params
            }).then((data)=>{
                   resolve(data);
            }).catch((err)=>{
                   reject(new Error('执行结果异常！'+err))
            });
        }); 
    },
    getThisMonthTurnoverStore: function (mon,orgId) {
        return new Promise(function (resolve, reject) {
            let arr = mon.split('-'); 
            let year=arr[0];
            let month=parseInt(arr[1])+1;
            if (month == 13) {  
                year = parseInt(year) + 1;  
                month = 1;  
            };
            if(month<10){
                month='0'+month;
            };
            let rstmon=year+'-'+month;
            let params={
                queryConditionItem:[
                    {dataField:'OrgId',dataValue:orgId,op:'EQ',relation:'and'},
                    {dataField:'V_Col8',dataValue:rstmon,op:'EQ',relation:'and'}
                ],
                maxResultCount:1,
                skipCount:1,
                sorting:'',
                draw:1
            };
            fetch({ 
                  url: 'api/services/app/singleTable38/getMainPageList',
                  method: 'post',
                  data:params
            }).then((data)=>{
                   resolve(data);
            }).catch((err)=>{
                   reject(new Error('执行结果异常！'+err))
            });
        }); 
    },
    getThisMonthEquipmentStore: function (mon,orgId) {
        return new Promise(function (resolve, reject) {
            let arr = mon.split('-'); 
            let year=arr[0];
            let month=parseInt(arr[1])+1;
            if (month == 13) {  
                year = parseInt(year) + 1;  
                month = 1;  
            };
            if(month<10){
                month='0'+month;
            };
            let rstmon=year+'-'+month;
            let params={
                queryConditionItem:[
                    {dataField:'OrgId',dataValue:orgId,op:'EQ',relation:'and'},
                    {dataField:'V_Col8',dataValue:rstmon,op:'EQ',relation:'and'}
                ],
                maxResultCount:1,
                skipCount:1,
                sorting:'',
                draw:1
            };
            fetch({ 
                  url: 'api/services/app/singleTable5/getMainPageList',
                  method: 'post',
                  data:params
            }).then((data)=>{
                   resolve(data);
            }).catch((err)=>{
                   reject(new Error('执行结果异常！'+err))
            });
        }); 
    }
}