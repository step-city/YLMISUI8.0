<template>
    <div slot="content" style="background-color:white">
        <el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="90px" style="height:450px;padding:15px 1.5em 3ex 1%;">
            
        <h2 style="text-align:center;color:#475669" >IC卡信息录入</h2>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="卡号" prop="v_Col12">
                        <object id="HDAccessCom" 
                            width="0" 
                            height="0"  
                            progid="Serial.WBPort" 
                            classid="clsid:EB691AD5-2793-43D9-9FE1-BE846404009E"
                            codebase="activex/WBalance.cab">
                         </object>
                        <span class="span">{{formModel.v_Col12}}</span>
                    </el-form-item>
                </el-col>
                  <el-col :span="12">
                    <el-form-item label="读取状态" prop="readState">
                        <el-tag type="success" v-if="readState">已读取</el-tag>
                        <el-tag type="danger" v-else>未读取</el-tag>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="过磅类型" prop="v_Col13">
                        <el-select v-model="formModel.v_Col13" style="width:100%" placeholder="请选择"  @change="_typechange">
                            <el-option
                            v-for="item in WeightTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车牌号" prop="o_Col27">
                         <yl-commonselect 
                            :clearable="true" 
                            style="width:100%"
                            :multiple="false" 
                            :defaultProps="carCard.defaultProps"
                            :apiConf="carCard.ApiConf"
                            :lists="carCard.Lists"
                            v-model="formModel.o_Col27"
                            @getCurrentNode="_getCarCardCurrentNode"
                            @clear="_carCardClear"></yl-commonselect>
                    </el-form-item>
                </el-col>
            </el-row>
                
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用料单位" prop="o_Col26" v-if="this.formModel.v_Col13=='commonGb_CC'">
                        <el-select v-model="formModel.o_Col26"  
                             filterable
                            style="width:100%" 
                            :placeholder="''"   
                            :clearable="true" 
                            :disabled="false"
                            @change="_labourchange"
                            @clear="_supplierClear">
                                <el-option v-for="item in labourData" 
                                    style="width:100%;height:auto;" 
                                    :key="item.labourId"  
                                    :label="item.labourName" 
                                    :value="item.labourId"> 
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="委托单位" prop="v_Col6" v-else-if="this.formModel.v_Col13=='commonGb_LS'">
                        <el-input v-model="formModel.v_Col6" ></el-input>
                    </el-form-item>
                      <el-form-item label="供应商" prop="o_Col26" v-else>
                         <el-select v-model="formModel.o_Col26"  
                             filterable
                            style="width:100%" 
                            :placeholder="''"   
                            :clearable="true" 
                            :disabled="false"
                            @change="_supplierchange"
                            @clear="_supplierClear">
                                <el-option v-for="item in supplierData" 
                                    style="width:100%;height:auto;" 
                                    :key="item.supplierId"  
                                    :label="item.supplierName" 
                                    :value="item.supplierId"> 
                                </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="材料名称" prop="o_Col28">
                        <el-select v-model="formModel.o_Col28" 
                                style="width:100%" 
                                filterable 
                                :placeholder="''" 
                                :clearable="true" 
                                :disabled="false"
                                @change="_materialchange"
                                @clear="_materialClear">
                                <el-option v-for="item in materialData" 
                                    style="width:100%;height:auto;" 
                                    :key="item.infoNM"  
                                    :label="item.infoName" 
                                    :value="item.infoNM" >
                                        <div style="height:18px; font-size: 12px">{{item.infoName}}</div> 
                                        <div style="height:15px;color: #8492a6; font-size: 11px" >{{ item.infoModel}}*{{ item.infoUnit}}</div>
                                        <!-- <div style="height:15px;color: #8492a6; font-size: 11px" >{{ item.infoUnit}}</div> -->
                                </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
               
                
                <el-col :span="6">
                    <el-form-item label="规格型号" prop="v_Col9">
                         <span class="span" >{{formModel.v_Col9}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="单位" prop="v_Col10">
                         <span class="span" >{{formModel.v_Col10}}</span>
                    </el-form-item>
                </el-col>
                 <el-col :span="6">
                    <el-form-item label="副单位" prop="v_Col15">
                         <span class="span">{{formModel.v_Col15}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="转换率" prop="d_Col20">
                         <span class="span">{{formModel.d_Col20}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="料仓" prop="o_Col29">
                            <el-select v-model="formModel.o_Col29" 
                                style="width:100%" 
                                filterable 
                                :placeholder="''" 
                                :clearable="true" 
                                :disabled="false"
                                @change="_getCurrentNode">
                                <el-option v-for="item in lcData" 
                                    style="width:100%;height:auto;" 
                                    :key="item.id"  
                                    :label="item.v_Col6" 
                                    :value="item.id" >
                                        <div style="height:18px; font-size: 12px">{{item.v_Col6}}</div> 
                                        <!-- <div style="height:15px;color: #8492a6; font-size: 11px" >{{ item.infoUnit}}</div> -->
                                </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                  <el-col :span="6">
                    <el-form-item label="是否启用" prop="b_Col17">
                        <el-switch  v-model="formModel.b_Col17"
                                    on-text="是"
                                    off-text="否">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否自动过磅" prop="b_Col18">
                        <el-switch  v-model="formModel.b_Col18"
                                    on-text="是"
                                    off-text="否">
                        </el-switch>
                    </el-form-item>
                </el-col>
                
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="扣率" prop="d_Col21">
                         <el-input v-model="formModel.d_Col21" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="扣吨" prop="d_Col22">
                         <el-input v-model="formModel.d_Col22" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row><br><hr>
                <el-form-item style="text-align:right;" >
                     <el-checkbox v-model="isClose">保存后关闭</el-checkbox>
                    <el-button class="icon-bin" type="danger" @click="_delete">注销</el-button>
                    <el-button class="icon-loop2" @click="_resetForm">重置</el-button>
                    <el-button class="icon-floppy-disk"  :loading="loading" type="primary" @click="_onSubmit">保存</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>

<script type="text/babel">
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel';
import CommonSelect from 'components/commonselect/CommonSelect';
import fetch from  'api/fetch';
export default {
    data(){
        return{
            formModel:{
                id:'',
                orgId:this.getUserInfo().user.manageOrgId,
                i_Col1:'',
                i_Col2:'',
                i_Col3:'',
                i_Col4:'',
                i_Col5:'',
                v_Col6:'',//供应商名称
                v_Col7:'',//车牌号
                v_Col8:'',//材料名称
                v_Col9:'',//规格型号
                v_Col10:'',//单位
                v_Col11:'',//料仓
                v_Col12:'',//卡号
                v_Col13:'commonGb_PT',//过磅类型（普通过磅、临时过磅）
                v_Col14:'',
                v_Col15:'',
                v_Col16:'',
                b_Col17:true,//是否启用
                b_Col18:'',
                b_Col19:'',
                d_Col20:'',//转换率
                d_Col21:'',
                d_Col22:'',
                d_Col23:'',
                d_Col24:'',
                d_Col25:'',
                o_Col26:'',//供应商ID
                o_Col27:'',//车牌ID
                o_Col28:'',//材料ID InfoNM
                o_Col29:'',//料仓ID
                o_Col30:'',
                sortCode:''
            },
            readState:0,
            isClose:true,
            rules:{
                o_Col27: [
                        { required: true, message: '车牌不能为空！', trigger: 'change' },
                    ],
                v_Col13: [
                    { required: true, message: '类型不能为空！', trigger: 'change' },
                ],
                v_Col12: [
                    { required: true, message: '卡号不能为空！', trigger: 'change' },
                ]
            },
            carCard:{    
                defaultProps:{
                    text:"v_Col6",
                    value:"id"
                },
                ApiConf:{
                    url:"/api/services/app/singleTable25/getMainPageList",
                    query:[{key:'OrgId',op:'EQ',value:this.getUserInfo().user.manageOrgId}],
                    sorting:''
                },
                Lists:[]
            },
            supplierData:[],
            labourData:[],
            materialData:[],
            treedata:[],
            defaultProps:{ 
                children: "children",
                label: "text",
                id: "id"
                },
            allSelectInfo:{
                supplier:[],
                material:[],
                labour:[]
            },
            loading:false,
            WeightTypes:[
                {label:'普通过磅',value:'commonGb_PT'},
                {label:'出场过磅',value:'commonGb_CC'},
                {label:'临时过磅',value:'commonGb_LS'}
            ],
            lcData:[],
            listenIcCardEvent:{},
            beforeData:'',
            nowData:''
        }
    },
    computed:{
        HDAccessCom:{
            get(){
                return document.getElementById("HDAccessCom");
            }
        } 
    },
     methods:{
        _typechange(node){
            this._supplierClear();
        },
        _resetForm(){
            this.$refs.formModel.resetFields();
            this.formModel.id ='';
            this.readState=false;
        },
        _onSubmit(){
            this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    params.order=this.formModel;
                    fetch({
                        url: '/api/services/app/singleTable26/createOrUpdateMainObject',
                        method: 'post',
                        data: params
                    }).then(data=>{
                    if(data.success){
                            _this.$notify({
                                title: '成功',
                                message: '保存数据成功！',
                                type: 'success'
                                });
                            _this.loading=false;
                            this._complete(this.isClose);
                        }
                        else {
                            this.$message.error('失败！'+data.error.message);
                            _this.loading=false;
                        }
                    })
                } else {
                    this.$message.warning('请按照条件填充表单！');
                    return false;
                }
                
            });
        },
        _delete(){
            this.$confirm('确认要注销这张卡吗?该操作将无法挽回！', '提示', {
                type: 'error',
                modal:false
            }).then(() => {
                var obj={}; 
                obj.id=this.formModel.id;
                fetch({
                    url: '/api/services/app/singleTable26/deleteMainObject',
                    method: 'post',
                    data: obj
                }).then(data =>{
                        if(data.success){
                                this.$notify({
                                    title: '成功',
                                    message: '删除数据成功！',
                                    type: 'success'
                                    });
                                this._resetForm();
                            }
                            else {
                                this.$notify.error({
                                    title: '错误',
                                      message: '删除数据失败！'+data.error.message,
                                    });
                            }
                })
            }).catch(() => {
                    console.log('已取消删除');       
                    });
        },
        _getMainObjectForEdit(code){
            let obj={
                sorting:'',
                queryConditionItem:[{dataField:'V_Col12',op:'EQ',dataValue:code}]
            };
             fetch({
                    url: '/api/services/app/singleTable26/getMainObjectForEdit',
                    method: 'post',
                    data: obj
                }).then(data =>{
                        if(data.success){
                                if(data.result.order==null){
                                    this.$refs.formModel.resetFields();
                                    this.formModel.id ='';
                                    this.formModel.v_Col12=code;
                                }else{ 
                                    if(data.result.order.orgId==this.getUserInfo().user.manageOrgId){
                                        Object.assign(this.formModel,data.result.order);
                                        this.formModel.o_Col29=data.result.order.o_Col29==this.guidOfNull()?'':data.result.order.o_Col29;
                                        this.formModel.o_Col28=data.result.order.o_Col28==this.guidOfNull()?'':data.result.order.o_Col28;
                                        this.formModel.o_Col27=data.result.order.o_Col27==this.guidOfNull()?'':data.result.order.o_Col27;
                                        this.formModel.o_Col26=data.result.order.o_Col26==this.guidOfNull()?'':data.result.order.o_Col26;
                                    }else{
                                        this.formModel.v_Col12='';
                                        this.readState=false;
                                        this.$message.error('此卡已被其他单位使用！');
                                    }
                                }
                               
                            }
                            else {
                                this.$notify.error({
                                    title: '错误',
                                      message: '获取数据失败！'+data.error.message,
                                    });
                            }
                })
        },
        _getCarCardCurrentNode(node){
            if(node[0]!=undefined){
                this.formModel.v_Col7=node[0].v_Col6;//车牌
                this.formModel.o_Col27=node[0].id;
            }
        },
        _carCardClear(){
            this.formModel.o_Col27='';
            this.formModel.v_Col7='';
        },
       
        _supplierClear(){
            this.formModel.o_Col26='';
            this.formModel.v_Col6='';
        },
        _materialClear(){
            this.formModel.o_Col28='';
            this.formModel.v_Col9='';
            this.formModel.v_Col10='';
            this.formModel.o_Col28='';
            this.formModel.v_Col15='';
            this.formModel.d_Col20='';
            this.formModel.o_Col30='';
        },
        _supplierchange(id){
            if(id != undefined&id!=''){
                let d=this.supplierData.filter(function(item){
                                return  item.supplierId == id; 
                            })
                this.formModel.v_Col6=d[0].supplierName;
                this.formModel.o_Col26=d[0].supplierId;
            }
        },
        _labourchange(id){
            if(id != undefined&id!=''){
                let d=this.labourData.filter(function(item){
                                return  item.labourId == id; 
                            })
                this.formModel.v_Col6=d[0].labourName;
                this.formModel.o_Col26=d[0].labourId;
            }
        },
        _materialchange(id){
             if(id != undefined&id!=""){
                let d=this.materialData.filter(function(item){
                                return  item.infoNM == id; 
                            })
                this.formModel.v_Col8=d[0].infoName;
                this.formModel.v_Col9=d[0].infoModel;
                this.formModel.v_Col10=d[0].infoUnit;
                this.formModel.o_Col28=d[0].infoNM;
                this.formModel.v_Col15=d[0].infoSecUnit;
                this.formModel.d_Col20=d[0].infoSecUnitPreci;
                this.formModel.o_Col30=d[0].cId;
                this._getLcInfo( this.formModel.o_Col28);
            }
        },
        _getTreeList(){
            fetch({
                url: '/api/services/app/singleTable21/GetTreeList',
                method: 'post',
                data: {parentId:this.guidOfNull(),orgId:this.getUserInfo().user.manageOrgId}
            }).then(data=>{
                if(data.success){
                        this.treedata=data.result;
                }
                else {
                    this.$message.error('获取数据失败！');
                }
            })
        },
        _getAllSelectInfo(){
            let _this=this;
            //供应商
            fetch({
                url: '/api/services/app/commonSupplier/getMainAllList',
                method: 'post',
                data: {
                    sorting:'SupplierName',
                    queryConditionItem:[ {dataField:"OrgId",op:"EQ",dataValue:this.getUserInfo().user.realOrgId}]
                }
            }).then(function (data) {
                if (data.success) {
                    _this.allSelectInfo.supplier=data.result;
                    _this.supplierData=_this.allSelectInfo.supplier.map(item=>{
                        return {
                            supplierId:item.id,
                            supplierName:item.supplierName
                        }
                    });
                } else {
                    _this.$message.error('获取数据失败！' + data.error.message);
                }
            })
            //用料单位
            fetch({
                url: '/api/services/app/commonLabour/getMainAllList',
                method: 'post',
                data: {
                    sorting:'LabourName',
                    queryConditionItem:[ {dataField:"OrgId",op:"EQ",dataValue:this.getUserInfo().user.realOrgId}]
                }
            }).then(function (data) {
                if (data.success) {
                    _this.allSelectInfo.labour=data.result;
                    _this.labourData=_this.allSelectInfo.labour.map(item=>{
                        return {
                            labourId:item.id,
                            labourName:item.labourName
                        }
                    });
                } else {
                    _this.$message.error('获取数据失败！' + data.error.message);
                }
            })
            //常用材料
            fetch({
                url: '/api/services/app/commonMaterial/getMainAllList',
                method: 'post',
                data: {
                    sorting:'InfoName',
                    queryConditionItem:[ {dataField:"OrgId",op:"EQ",dataValue:this.getUserInfo().user.realOrgId}]
                }
            }).then(function (data) {
                if (data.success) {
                    _this.allSelectInfo.material=data.result;
                    _this.materialData=_this.allSelectInfo.material.map(item=>{
                        return {
                            infoNM:item.id,
                            infoName:item.infoName,
                            infoModel:item.infoModel,
                            infoUnit:item.infoUnit,
                            infoSecUnitPreci:item.infoSecUnitPreci,
                            infoSecUnit:item.infoSecUnit
                        }
                    });
                } else {
                    _this.$message.error('获取数据失败！' + data.error.message);
                }
            })
        },
        _getLcInfo(infoNM){
            let arr=[ {dataField:"OrgId",op:"EQ",dataValue:this.getUserInfo().user.manageOrgId}]
            if (infoNM!=''){
                arr.push({dataField:"O_Col28",op:"EQ",dataValue:infoNM})
            }
             fetch({
                url: '/api/services/app/singleTable21/getMainAllList',
                method: 'post',
                data: {
                    sorting:'',
                    queryConditionItem:arr
                }
            }).then(data=>{
                 if (data.success) {
                     this.lcData=data.result;
                } else {
                    _this.$message.error('保存数据失败！' + data.error.message);
                }
            })
        },
         _getCurrentNode(id){
             let d=this.lcData.filter(function(item){
                                return  item.id == id; 
                            })
             this.formModel.o_Col29=d[0].id;
             this.formModel.v_Col11=d[0].v_Col6;
             this.formModel.v_Col14=d[0].v_Col10;
        },
         _listenIcCardEvent(){
            this.listenIcCardEvent=setInterval(()=>{    
                console.log(333);
                 this.beforeData=this.nowData;
                 this.nowData=this.redRFIData();
                //this.nowData=this.redEtcData();
                 if(this.beforeData!==this.nowData&&this.beforeData===''){
                     this.getFRIDSpeaker(); //发出声音
                     if(this.nowData!==undefined){
                         //获取IC卡绑定信息
                         //dosomething
                         this.formModel.v_Col12=this.nowData;
                         this.readState=true;
                         this._getMainObjectForEdit(this.nowData);
                     }
                      
                 }
             },3000);  
          return this.listenIcCardEvent;
        },
         redRFIData(){
                //读取IC卡数据
              return this.HDAccessCom.getFRIData();
        },
        redEtcData(){
                //读取etc卡数据
                return this.HDAccessCom.getETCData("192.168.0.200");
        },
        getFRIDSpeaker(){
             //读取IC卡发出声音
              return this.HDAccessCom.getFRIDSpeaker();
        },
         _complete(bool){
                this.$emit('close',bool);
            },
     },  
    mounted(){
        this._getTreeList();
        this._getAllSelectInfo();
        this._getLcInfo('');
        this._listenIcCardEvent();
    },
    components:{
        dataDictionaryForSel,
        'yl-commonselect':CommonSelect
    },
    beforeDestroy() {
            //清除监听
            window.clearInterval(this.listenIcCardEvent);
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.span
    text-decoration: underline
    line-height:34px

</style>


