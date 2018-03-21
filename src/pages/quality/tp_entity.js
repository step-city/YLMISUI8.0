import fetch from  'api/fetch';
import Qs from 'qs';


   export const requestgetMainAllListT=params=>{
        return fetch({ 
            url:  '/api/services/app/tP_ENTITY/getMainAllList',
            method: 'post',
            data: params
        })
    };
  export const requestgetMainPageListT=params=>{
        return fetch({ 
            url: '/api/services/app/tP_ENTITY/getMainPageList',
            method: 'post',
            data: params
        })
    };
    export const requestcreateOrUpdateMainObjectT=params=>{
        return fetch({ 
            url: '/api/services/app/tP_ENTITY/createOrUpdateMainObject',
            method: 'post',
            data: params
        })
    };
 