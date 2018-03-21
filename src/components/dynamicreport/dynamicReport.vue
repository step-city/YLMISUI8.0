<template>
<yl-panelpage 
    :titleName="baseInfoConf.panelpage.titleName" 
    :icon="baseInfoConf.panelpage.icon" 
    :reloadIsShow="baseInfoConf.panelpage.reloadIsShow" 
    :fullScreenIsShow="baseInfoConf.panelpage.fullScreenIsShow" 
    :helpIsShow="baseInfoConf.panelpage.helpIsShow" 
    :isZone="baseInfoConf.panelpage.isZone"
    :theme="baseInfoConf.panelpage.theme"
>
  <div slot="content">  
        <yl-containercoms     
                ref="containercoms"
                @init="_initContainerComs"
                :option="option"
                :outParams="outParams"
        >
        </yl-containercoms> 
   </div>
</yl-panelpage>
</template>

<script type="text/babel">
import fetch from 'api/fetch';
import util from 'common/js/util';
export default {
    data(){
        return {
            outParams:{},
            option:{},
          }
    },
    props:{
         baseInfoConf:{
            type:Object,
            require:true,
        },
        apiConf:{
            type:Object,
            require:true,
        },
        filterConf:{
            type:Object,
            require:true,
        },
        tableInfoConf:{
            type:Object,
            require:true,
        },
        functionConf:{
            type:Object,
            require:true,
        },
        formConf:{
            type:Object,
            require:true,
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
                globConf:{
                        get(){
                            return util.getLocalStorage('SysGlobConf');
                        }
                    },
    },
    methods:{
       _initContainerComs(_coms){
            let _this=this,option=_coms.option;
            if(this.baseInfoConf.InterceptEvent){
             let eventConf=this.baseInfoConf.InterceptEvent.init;
                if(eventConf){
                    if(eventConf.isOn){
                          eventConf.event(_this,option,_coms.outParams);
                    }  
                }
            }
        },
    },
    components:{
    },
    created(){
        let elmentConfig={};
        elmentConfig.baseInfoConf=this.baseInfoConf;
        elmentConfig.apiConf=this.apiConf;
        elmentConfig.filterConf=this.filterConf;
        elmentConfig.tableInfoConf=this.tableInfoConf;
        elmentConfig.functionConf=this.functionConf;
        elmentConfig.formConf=this.formConf;
        elmentConfig.style=this.baseInfoConf.style;
        this.option.elmentConfig=elmentConfig;
        this.option.type=this.baseInfoConf.reportType;
    },
    mounted(){
    },
    watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" rel="stylesheet/css" scoped>
</style>

