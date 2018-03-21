import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
import util from '../common/js/util';

//判断接口token
export default function fetchIo(options,axiosConfig={baseURL:'',authorization:''}) {
    if(axiosConfig.baseURL!=''){
        axios.defaults.baseURL=axiosConfig.baseURL;
    }else{
            axios.defaults.baseURL=window.getClientObj().ioConf.url;
    }
    if(util.getLocalStorage(ioAuthorization)==''){
        axios({
            url: '/Token',
            method: 'post',
            data:`clientId=${window.getClientObj().ioConf.clientId}&
                  clientSecret=${window.getClientObj().ioConf.clientSecret}&
                  grant_type=client_credentials`
        }).then(data=>{
            let access_token="Bearer " +data.access_token;
            util.setLocalStorage(ioAuthorization,access_token);
                //实例化的对象
            const instance = axios.create(author==='none'?{}:{
                headers: { 'Authorization':access_token}
            });
             //初始化配置
            instance(options)
            .then(response => {
                const res = response.data;
                if (response.status!== 200) {
                        //错误处理
                        console.log(options); // for debug
                        Message({
                            message: '请求错误：'+res.error,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    reject(res);
                }
                    resolve(res);
                })
                .catch(error => {
                    Message({
                        message: '请求异常：'+error,
                        type: 'error',
                        duration: 5 * 1000
                    });
                console.log(error); // for debug
                reject(error);
                });
        })
    }else{
        const instance = axios.create(author==='none'?{}:{
            headers: { 'Authorization':access_token}
        });
         //初始化配置
        instance(options)
        .then(response => {
            const res = response.data;
            if (response.status!== 200) {
                    //错误处理
                    console.log(options); // for debug
                    Message({
                        message: '请求错误：'+res.error,
                        type: 'error',
                        duration: 5 * 1000
                    });
                reject(res);
            }
                resolve(res);
            })
            .catch(error => {
                Message({
                    message: '请求异常：'+error,
                    type: 'error',
                    duration: 5 * 1000
                });
            console.log(error); // for debug
            reject(error);
            });
    }
   
}


