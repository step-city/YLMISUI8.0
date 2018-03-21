<template>
  <div id="pic_list">
    <!--<div v-for="item in stateList"  style="line-height:30px;display:inline;">-->
     <ul style="font-size: 14px;background-color:#58B7FF;color:#FFFFFF;" >
                        <li>
                            <span>审批阶段</span> 
                        </li>
                        <li>
                            <span>操作人</span>
                        </li> 
                        <li>
                            <span>操作时间</span>
                        </li>
                         <li>
                            <span>状态</span>
                        </li>
                        <li>
                            <span>审批意见</span>
                        </li>
                    </ul>
                     <ul  v-for="item in stateList"  style="font-size:12px;">
                       <li> <span>{{item.stateDesc}}</span>  </li>
                        <li><span>{{item.dealUserName}}</span>  </li>
                        <li><span>{{item.dealTime}}</span>  </li>
                        <li><span>{{item.stateText}}</span>  </li>
                        <li><span>{{item.dealOptions}}</span>  </li>
                    </ul>
      </div>
</div>
</template>

<script type="text/babel">
import fetch from  'api/fetch';
export default {
    data(){
        return{
            stateList:[]
        }      
    },
    props:{
        orderId:{
            type:String,
            default:'',
        }
    },
    methods:{
         _getApproveInfo(){  
             let Params={},inputArr=[];
             Params.sorting="DealTime asc";
             inputArr.push({
                 dataField:'OrderId',
                 op:'EQ',
                 dataValue:this.orderId,
             });
             Params.queryConditionItem=inputArr;
            fetch({ 
                url: '/api/services/app/approveFlow/GetApproveFlows',
                method: 'post',
                data:Params
            }).then((data)=>{
                if(data.success){
                   this.stateList=data.result;
                }
            })
        },
    },
    components:{
    },
     mounted(){
         this._getApproveInfo();
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
#pic_list {
  display: block;
  width: 100%;
  color: #002;
  text-align: left;
  height:auto;
}
#pic_list li {
  width: 19%;
  margin: 5px 0px;
  display: inline-block;
}
</style>
