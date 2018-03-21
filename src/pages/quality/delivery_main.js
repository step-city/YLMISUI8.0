import fetch from  'api/fetch';
import Qs from 'qs';


   export const requestgetMainAllList=params=>{
        return fetch({ 
            url:  '/api/services/app/dELIVERY_MAIN/getMainAllList',
            method: 'post',
            data: params
        })
    };
  export const requestgetMainPageList=params=>{
        return fetch({ 
            url: '/api/services/app/dELIVERY_MAIN/getMainPageList',
            method: 'post',
            data: params
        })
    };
    export const requestcreateOrUpdateMainObject=params=>{
        return fetch({ 
            url: '/api/services/app/dELIVERY_MAIN/createOrUpdateMainObject',
            method: 'post',
            data: params
        })
    };
    export const requestgetMainObjectForEdit=params=>{
        return fetch({ 
            url: '/api/services/app/dELIVERY_MAIN/getMainObjectForEdit',
            method: 'post',
            data: params
        })
    };
