<template>
<yl-panelpage titleName="门户配置" >
<div slot="content">
  <yl-columnlay hiddenLeft>
       <div slot="left"  >
       </div>
        <div slot="right" >
         <yl-toolbar>
          <el-form  :inline="true"  >
                    <el-form-item class="form-content-vertical">
                        <yl-roleTree 
                        size="small"
                        isexpand
                        :disabled="isDefault"
                        v-model="formModel.roleId"
                        @getCurrentNode="_getCurrentNode"
                        ></yl-roleTree>
                    </el-form-item>
                        <el-form-item class="form-content-vertical">
                        <el-switch
                            v-model="formModel.isEnable"
                            on-color="#13ce66"
                            off-color="#ff4949"
                            on-text="启用"
                            off-text="禁用">
                            </el-switch>       
                    </el-form-item>
                     <el-form-item class="form-content-vertical">
                    <el-checkbox 
                            v-model="isDefault" 
                            @change="_changeText"
                        >默认门户配置</el-checkbox>
                    </el-form-item>
                    <el-form-item class="form-content-vertical">
                        <el-button type="primary" @click="_saveData" :loading="loading" :disabled="formModel.roleId===''">保存</el-button>        
                    </el-form-item>
                </el-form>
          </yl-toolbar>
          <el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
                <el-form-item label="门户信息配置" prop="homePageConf">
                    <yl-jsoneditor ref="homePageConf" v-model="formModel.homePageConf" style="height:500px"></yl-jsoneditor>
                </el-form-item>
            </el-form>
        </div>
   </yl-columnlay>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import fetch from 'api/fetch';
import util from 'common/js/util';
import  {inputModel} from 'api/inputmodel';
import roleTree from 'ocomponents/role/roleTree';
export default {
    data(){
        return {
                 formModel:{
                        id:'',
                        roleId:'',
                        roleName:'',
                        versionNum:'',
                        homePageConf:'',
                        isEnable:true,
                        extensionOne:'',
                        extensionTwo:'',
                        extensionThere:'',
                        extensionFure:'',
                        extensionFrive:''
                            },
                 loading:false,
                 rules: {},
                 isDefault:false
            }
    },
    computed:{
                VersionNum:{
                    get(){
                        return util.getLocalStorage('SysGlobConf').versionNum;
                    }
                }
            },
    methods:{
          async  _getCurrentNode(node){
               let result=await this.asyncFunc({
                    url:'api/services/app/homePageConf/getMainObjectForEdit',
                    method:'post',
                    data:{
                        queryConditionItem:[
                                            {dataField:"RoleId",op:'EQ',dataValue:node.id},
                                            {dataField:"VersionNum",op:'EQ',dataValue:this.VersionNum}
                                        ],
                        sorting:''
                    }
                },'获取门户配置数据');
                if(result.order!=null){
                    this.formModel=result.order;
                }else{
                        this.formModel.id="";
                        this.formModel.homePageConf="{}";
                        this.formModel.roleName=node.text;
                        this.formModel.roleId=node.id;
                        this.formModel.isEnable=1;
                }
            },
         _changeText(){
             if(this.isDefault){
                 //默认配置
                 let node={id:this.guidOfNull(),text:''}
                 this._getCurrentNode(node);
             }else{
                 //正常配置
                 this.formModel.id="";
                 this.formModel.homePageConf="{}";
                 this.formModel.roleName=node.text;
                 this.formModel.roleId=node.id;
                 this.formModel.isEnable=1;
             }
          },
           _saveData(){
                if(this.formModel.id===""){
                    //添加
                    //判断重复
                    let params={};
                    let inputArr=[
                                    {dataField:"RoleId",op:'EQ',dataValue:this.formModel.roleId},
                                    {dataField:"VersionNum",op:'EQ',dataValue:this.VersionNum}
                                ];
                    params.queryConditionItem=inputArr;
                    fetch({
                        url:'api/services/app/homePageConf/getMainObjectForEdit',
                        method: 'post',
                        data: params
                    }).then((data)=>{
                            if(data.success){
                                if(data.result.order!=null){
                                    //提交重复
                                    this.formModel.id=data.result.order.id;
                                }
                                //提交数据    
                                this._onSubmit();
                            }
                        })
                }else{
                    this._onSubmit();
                }
                
         },
          _onSubmit() {
                    var _this=this;
                    let params={};
                        this.loading=true;
                        this.formModel.homePageConf=this.$refs.homePageConf.getValue();
                        this.formModel.versionNum=this.VersionNum;
                        this.formModel.createTime=this.formatDate(new Date(),'YYYY/MM/DD-HH:mm:ss');
                        params.order=this.formModel;
                        fetch({
                        url:'api/services/app/homePageConf/createOrUpdateMainObject',
                        method:'post',  
                        data:params
                        }).then(data=>{
                            if(data.success){
                                this.$notify({
                                    title: '成功',
                                    message: '保存数据成功！',
                                    type: 'success'
                                    });
                            }
                            else {
                                this.$message.error('失败！'+data.error.message);
                            }
                            this.loading=false;
                    }).catch(function(error){
                        _this.loading=false;
                    })
            },
    },
    components:{
         'yl-roleTree':roleTree
        },
    mounted(){
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

