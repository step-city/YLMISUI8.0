<template>
<yl-dynamicmodule 
        v-if="isRender" 
        :apiConf="apiConf"
        :baseInfoConf="baseInfoConf"
        :filterConf="filterConf"
        :tableInfoConf="tableInfoConf"
        :functionConf="functionConf"
        :formConf="formConf"
        :outPutConf="outPutConf">
    </yl-dynamicmodule>
</template>

<script type="text/babel">
import {
         requestGetModuleConfForEdit
       } from 'api/moduleconf';
import util from 'common/js/util';
export default {
    data(){
        return {
            isRender:false,
            mConfigs:{},
        }  
    },
    computed:{
                apiConf:function(){
                    return JSON.parse(this.mConfigs.apiConf,util.dealFunction).apiConf;
                  
                },
                baseInfoConf:function(){
                    return JSON.parse(this.mConfigs.baseInfoConf,util.dealFunction).baseInfo;
                    
                },
                filterConf:function(){
                    return JSON.parse(this.mConfigs.fliterConf,util.dealFunction).filterConf;
                     
                },
                tableInfoConf:function(){
                    return JSON.parse(this.mConfigs.tableInfoConf,util.dealFunction).tableInfoConf;
                    
                },
                functionConf:function(){
                    return JSON.parse(this.mConfigs.functionConf,util.dealFunction).functionConf;
                    
                },
                formConf:function(){
                    return JSON.parse(this.mConfigs.formConf,util.dealFunction).formConf;
                },
                outPutConf:function(){
                    return JSON.parse(this.mConfigs.extensionOne,util.dealFunction).outPutConf;
                },
                globalConf:{
                    get(){
                        return util.getLocalStorage('SysGlobConf');
                    }
                },
    },
    methods:{
        init(){
            this.isRender=false;
             let moduleCode=this.$route.params.tableName;
             let inputArrs=[ 
                    {dataField:"ExtensionTwo",op:"EQ",dataValue:moduleCode},
                    {dataField:"VersionNum",op:"EQ",dataValue:this.globalConf.versionNum},
                ];
            requestGetModuleConfForEdit(inputArrs).then((data)=>{
                    if(data.success){
                        
                        this.mConfigs=data.result.moduleConf;
                        this.isRender=true;
                    }
                    else {

                        this.$message.error('失败！'+data.error.message);
                    }
                });
        },
    },
    created(){
    },
    mounted(){
        this.init();
    }, 
     watch:{
          "$route": "init"
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
