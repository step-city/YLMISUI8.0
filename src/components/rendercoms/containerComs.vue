<template>
     <!--数据集查询容器-->
   <yl-querycontainerR  ref="querycontainerR"
        v-if="option.type==='querycontainerR'" 
        :baseInfoConf="option.elmentConfig.baseInfoConf"
        :apiConf="option.elmentConfig.apiConf"
        :filterConf="option.elmentConfig.filterConf"
        :tableInfoConf="option.elmentConfig.tableInfoConf"
        :functionConf="option.elmentConfig.functionConf"
        :style="option.elmentConfig.style"
        :outParams="outParams"
   >
   </yl-querycontainerR>

    <!--模块数据集查询容器-->
   <yl-querycontainer ref="querycontainer"
        v-else-if="option.type==='querycontainer'" 
        :baseInfoConf="option.elmentConfig.baseInfoConf"
        :apiConf="option.elmentConfig.apiConf"
        :filterConf="option.elmentConfig.filterConf"
        :tableInfoConf="option.elmentConfig.tableInfoConf"
        :functionConf="option.elmentConfig.functionConf"
        :formConf="option.elmentConfig.formConf"
        :style="option.elmentConfig.style"
        :outParams="outParams"
   >
   </yl-querycontainer>

  <!--图表展示容器-->
   <yl-queryChart  ref="queryChart"
        v-else-if="option.type==='queryChart'" 
        :baseInfoConf="option.elmentConfig.baseInfoConf"
        :apiConf="option.elmentConfig.apiConf"
        :filterConf="option.elmentConfig.filterConf"
        :tableInfoConf="option.elmentConfig.tableInfoConf"
        :functionConf="option.elmentConfig.functionConf"
        :style="option.elmentConfig.style"
        :outParams="outParams"
   >
   </yl-queryChart>

  <!--html内容渲染静态页面-->
   <div ref="htmlRaw"
        v-else-if="option.type==='htmlRaw'" 
        v-html="option.elmentConfig.content" 
        :style="option.elmentConfig.style"
    >
   </div>   
   
    <!--html容器-->
   <yl-htmlContainer ref="htmlContainer"
        v-else-if="option.type==='htmlContainer'" 
        :baseInfoConf="option.elmentConfig.baseInfoConf"
        :apiConf="option.elmentConfig.apiConf"
        :filterConf="option.elmentConfig.filterConf"
        :tableInfoConf="option.elmentConfig.tableInfoConf"
        :functionConf="option.elmentConfig.functionConf"
        :style="option.elmentConfig.style"
        :outParams="outParams"
    >
   </yl-htmlContainer>   

   <!--统计块容器-->
   <yl-statisticsBlock ref="statisticsBlock"
        v-else-if="option.type==='statisticsBlock'" 
        :style="option.elmentConfig.style"
        :backgroudColor="option.elmentConfig.backgroudColor"
        :theme="option.elmentConfig.theme"
        :duration="option.elmentConfig.duration"
        :number="option.elmentConfig.number"
        :unit="option.elmentConfig.unit"
        :title="option.elmentConfig.title"
        :linkUrl="option.elmentConfig.linkUrl"
        :icon="option.elmentConfig.icon"
        :eventConf="option.eventConf"
    >
   </yl-statisticsBlock>   

 </template>

<script type="text/babel">
import globalJS from 'common/js/globalJS';
export default {
    data(){
        return{
        }
    },
    props:{
         option:{
            type:Object,
            require:true,
            default:function(){
                return {}
            }
        },
        outParams:{
            type:Object,
            require:false,
            default:function(){
                return {}
            }
        }
    },
    computed:{
         globalFunObject:{
            get(){
                return globalJS;
            }
        },
    },
    methods:{
        _initComs(){
          this.$emit('init',this);
        },
        _reload(refName){
           this.$refs[refName]._reload();
        }
    },
    components:{
    },
    beforeMount(){
       this._initComs();   
    },
    mounted(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
