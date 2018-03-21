import fetch from  'api/fetch';
import Qs from 'qs';


   export const requestgetMainAllListC=params=>{
        return fetch({ 
            url:  '/api/services/app/dELIVERY_DETAIL/getMainAllList',
            method: 'post',
            data: params
        })
    };
  export const requestgetMainPageListC=params=>{
        return fetch({ 
            url: '/api/services/app/dELIVERY_DETAIL/getMainPageList',
            method: 'post',
            data: params
        })
    };
    export const requestcreateOrUpdateMainObjectC=params=>{
        return fetch({ 
            url: '/api/services/app/dELIVERY_DETAIL/createOrUpdateMainObject',
            method: 'post',
            data: params
        })
    };
 