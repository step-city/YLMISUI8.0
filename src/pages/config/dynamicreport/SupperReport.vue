<template>
 <yl-dynamicreport 
        v-if="isRender" 
        :apiConf="apiConf"
        :baseInfoConf="baseInfoConf"
        :filterConf="filterConf"
        :tableInfoConf="tableInfoConf"
        :functionConf="functionConf">
 </yl-dynamicreport>
   

</template>

<script type="text/babel">
import fetch from 'api/fetch';
import util from 'common/js/util';
export default {
    data(){
        return {
            isRender:false,
            mConfigs:{},
        }
    },
    computed:{
                baseInfoConf:function(){
                    return JSON.parse(this.mConfigs.baseInfoConf,util.dealFunction).baseInfo;
                },
                apiConf:function(){
                    return JSON.parse(this.mConfigs.apiConf,util.dealFunction).apiConf;
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
             let inputArr=[],params={};
                inputArr=[ 
                    {dataField:"ExtensionTwo",op:"EQ",dataValue:moduleCode},
                    {dataField:"VersionNum",op:"EQ",dataValue:this.globalConf.versionNum},
                ];
                params.queryConditionItem=inputArr;
                fetch({
                     url: '/api/services/app/reportConf/getMainObjectForEdit',
                     method: 'post',
                     data: params
                }).then((data)=>{
                      if(data.success){
                        this.mConfigs=data.result.order;
                        this.isRender=true;
                      } 
                      else {
                          this.$message.error('失败！'+data.error.message);
                      }
                });
        },
    },
    components:{
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
