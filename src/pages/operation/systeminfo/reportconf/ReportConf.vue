<template>
<yl-panelpage :titleName="'报表配置'" >
<div slot="content">
         <yl-toolbar>
                <el-form  :inline="true"  >
                            <el-form-item class="form-content-vertical">
                               <yl-menuItemTree  
                                    placeholder="请选择菜单" 
                                    size="small" 
                                    style="width:200px" 
                                    v-model="menuItemId"
                                    @getCurrentNode="_getCurrentNode"
                               ></yl-menuItemTree>   
                            </el-form-item>
                            <el-form-item class="form-content-vertical">
                               <el-button 
                                    type="primary" 
                                    size="small" 
                                    @click="_saveData" 
                                    :loading="loading">保存</el-button>   
                            </el-form-item>
                 </el-form>
          </yl-toolbar>
          <el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
                <el-tabs  type="border-card" active-name="baseInfoConf" >
                    <el-tab-pane label="基本信息配置" name="baseInfoConf" > 
                            <el-form-item label="基本信息配置" prop="baseInfoConf">
                                <yl-jsoneditor ref="baseInfoConf" v-model="formModel.baseInfoConf" style="height:600px"></yl-jsoneditor>
                            </el-form-item>
                    </el-tab-pane>
                      <el-tab-pane label="API配置" name="apiConf"> 
                            <el-form-item label="API配置" prop="apiConf">
                            <yl-jsoneditor ref="apiConf" v-model="formModel.apiConf" style="height:600px"></yl-jsoneditor>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="过滤器配置" name="fliterConf"> 
                            <el-form-item label="过滤器配置" prop="fliterConf">
                            <yl-jsoneditor ref="fliterConf" v-model="formModel.fliterConf" style="height:600px"></yl-jsoneditor>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="表信息配置" name="tableInfoConf"> 
                            <el-form-item label="表信息配置" prop="tableInfoConf">
                                <yl-jsoneditor ref="tableInfoConf" v-model="formModel.tableInfoConf" style="height:600px"></yl-jsoneditor>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="功能信息配置" name="functionConf"> 
                            <el-form-item label="功能信息配置" prop="functionConf">
                                <yl-jsoneditor ref="functionConf" v-model="formModel.functionConf" style="height:600px"></yl-jsoneditor>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="数据可视化配置  " name="formConf"> 
                            <el-form-item label="数据可视化配置" prop="formConf">
                                <yl-jsoneditor ref="formConf" v-model="formModel.formConf" style="height:600px"></yl-jsoneditor>
                            </el-form-item>
                        </el-tab-pane>
                </el-tabs>
            </el-form>
        
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import  util from 'common/js/util';
import menuItemTree from 'ocomponents/menuitem/menuItemTree';
import fetch from 'api/fetch'
export default {
    data(){
        return {
               formModel:{
                        id:'',
                        versionNum:'',
                        baseInfoConf:'',
                        formConf:'',
                        apiConf:'',
                        fliterConf:'',
                        tableInfoConf:'',
                        functionConf:'',
                        extensionOne:'',
                        extensionTwo:'',
                        extensionThere:'',
                        extensionFure:'',
                        extensionFrive:'',
                        },
                 menuItemId:'',       
                 loading:false,
                 rules: {},
            }
    },
    computed: {
            VersionNum:{
                        get(){
                            return util.getLocalStorage('SysGlobConf').versionNum;
                        }
                    }
              },
    methods:{
        _getCurrentNode(node){
                let params={};
                let inputArr=[
                                {dataField:"ExtensionTwo",op:'EQ',dataValue:node.funcCode},
                                {dataField:"VersionNum",op:'EQ',dataValue:this.VersionNum}
                             ];
                params.queryConditionItem=inputArr;
                fetch({
                     url: '/api/services/app/reportConf/getMainObjectForEdit',
                     method: 'post',
                     data: params
                }).then((data)=>{
                        if(data.success){
                           if(data.result.order!=null){
                                this.formModel=data.result.order;
                                this.formModel.extensionThere=node.text;
                                this.formModel.extensionFure=node.code;
                            }else{
                                    this.formModel.id="";
                                    this.formModel.versionNum=this.VersionNum;
                                    this.formModel.baseInfoConf="{}";
                                    this.formModel.apiConf="{}";
                                    this.formModel.formConf="{}";
                                    this.formModel.tableInfoConf="{}";
                                    this.formModel.functionConf="{}";
                                    this.formModel.extensionTwo=node.funcCode;
                                    this.formModel.extensionThere=node.text;
                                    this.formModel.extensionFure=node.code;
                            }
                        }else{  
                                this.$message.error('获取数据失败！');
                        }
                    })
        },
         _saveData(){
                if(this.menuItemId==''){
                    this.$message.warning('请选择模块配置菜单！');
                    return false
                }
                if(this.formModel.id===""){
                    //添加
                    //判断重复
                let params={};
                let inputArr=[
                                {dataField:"ExtensionTwo",op:'EQ',dataValue:this.formModel.extensionTwo},
                                {dataField:"VersionNum",op:'EQ',dataValue:this.VersionNum}
                             ];
                params.queryConditionItem=inputArr;
                fetch({
                     url: '/api/services/app/reportConf/getMainObjectForEdit',
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
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    this.formModel.baseInfoConf=this.$refs.baseInfoConf.getValue();
                     this.formModel.apiConf=this.$refs.apiConf.getValue();
                    this.formModel.formConf=this.$refs.formConf.getValue();
                    this.formModel.fliterConf=this.$refs.fliterConf.getValue(); 
                    this.formModel.tableInfoConf=this.$refs.tableInfoConf.getValue();
                    this.formModel.functionConf=this.$refs.functionConf.getValue();
                    this.formModel.createTime=this.formatDate(new Date(),'YYYY/MM/DD-HH:mm:ss');
                    params.order=this.formModel;
                    fetch({
                        url: '/api/services/app/reportConf/createOrUpdateMainObject',
                        method: 'post',
                        data: params
                     }).then(data=>{
                        if(data.success){
                                this.$notify({
                                    title: '成功',
                                    message: '保存数据成功！',
                                    type: 'success'
                                    });
                                //关闭面板
                                this._complete(this.isClose);
                            }
                            else {
                                this.$message.error('失败！'+data.error.message);
                            }
                            this.loading=false;
                    }).catch(function(error){
                        _this.loading=false;
                    })
                } else {
                    this.$message.warning('请按照条件填充表单！');
                    return false;
                }
                
            });
            },
    },
    components:{
         'yl-menuItemTree':menuItemTree
        },
    mounted(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

