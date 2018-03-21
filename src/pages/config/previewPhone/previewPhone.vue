<template>
<div  class="print-responsive">
  <meta charset="UTF-8"  name="viewport" content="width=device-width,user-scalable=no, initial-scale=1, shrink-to-fit=no, minimum-scale=0.5, maximum-scale=2.0,minimal-ui">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <link type='text/css' rel='stylesheet' href='static/style/printTable.css'/>
  <div v-html="htmlContent"></div>
</div>
</template>
<script type="text/babel">
import fetch from "api/fetch";
import {requestGetModuleConfForEdit} from 'api/moduleconf';
import util from 'common/js/util';
export default {
  data() {
    return {
      htmlContent:'<p style="text-algin:center">加载中，请稍后...</p>',
      outPutConf:{},
      dataModel:{},
      access_token:''
    }
  },
  computed: {
                fetchObject:{
                    get(){
                        return fetch;
                    }
                },
                utilObject:{
                  get(){
                    return util;
                  }
                },
        },
  methods: {
    _randerPage(params){
            let _this=this;
            let mviewConf=this.outPutConf.mviewConf;
            mviewConf.content.dataModel=params;
             //渲染模板
           if(mviewConf.InterceptEvent.initTemplate!==undefined){
                        if(mviewConf.InterceptEvent.initTemplate.isOn){
                            mviewConf.InterceptEvent.initTemplate.event(mviewConf.content,_this.outPutConf.displayModel);
                        }
                    }
              //替换字符
            if(mviewConf.InterceptEvent.beforeView!==undefined){
                        if(mviewConf.InterceptEvent.beforeView.isOn){
                            mviewConf.InterceptEvent.beforeView.event(mviewConf.content,_this);
                        }
                    }
        },
     _loadPage(){
             let _this=this;
             let moduleCode=this.$route.params.menuCode;
             let OrderId=this.$route.params.id;
             fetch({ 
                url: '/Token',
                method: 'post',
                data: "grant_type=client_credentials"
              },{baseURL:'',authorization:util.getDefaultToken(),formatData:false}).then((data)=>{
                  this.access_token="Bearer " +data.access_token;
                  let inputArrs=[ 
                    {dataField:"ExtensionTwo",op:"EQ",dataValue:moduleCode},
                  ];
                  fetch({ 
                      url: '/api/services/app/moduleConf/GetModuleConfForEdit',
                      method: 'post',
                      data: inputArrs
                    },{baseURL:'',authorization:this.access_token,formatData:false}).then((data)=>{
                            if(data.success){
                                let mConfigs=data.result.moduleConf;
                                this.outPutConf=JSON.parse(mConfigs.extensionOne,util.dealFunction).outPutConf;
                                this._loadData(OrderId);
                            }
                            else {
                                this.$message.error('失败！'+data.error.message);
                            }
                        });
              }).catch((err)=>{  
                  _this.$message.error('获取token异常!'+err);
              });
             
     },
     _loadData(params){
        let _this=this;
        let mviewConf=this.outPutConf.mviewConf;
        if(mviewConf.InterceptEvent.loadData!==undefined){
            if(mviewConf.InterceptEvent.loadData.isOn){
                mviewConf.InterceptEvent.loadData.event(params,_this);
            }
        }
     }
  },
  mounted() {
    this._loadPage();
  },
  watch:{
    dataModel:function(n,o){
       this._randerPage(n);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>


