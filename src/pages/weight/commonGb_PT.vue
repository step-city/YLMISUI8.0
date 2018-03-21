<template>
        <yl-layout class="gbpt">
            <div slot="fristbox" class="editor">
                    <el-form  :model="formModel"  ref="formModel" label-width="80px" class="formStyle">
                       <el-row>
                           
                            <el-col :span="6">
                                <el-form-item label="车牌号" prop="v_Col11">
                                        <el-autocomplete style="width:100%" id="keyboard"
                                            :fetch-suggestions="_carNumSearch"
                                            placeholder="请输入车牌号"
                                            v-model="formModel.order.v_Col11" 
                                            size="small" 
                                            icon="setting"
                                            :disabled="saveBtnState"
                                            :props="carNumConf.defaultProps"
                                            @select="_carNumSel"
                                            @change.native="_carNumChange"
                                            :on-icon-click="_displayKeyboard">
                                        </el-autocomplete>
                                </el-form-item> 
                            </el-col>
                        
                            <el-col :span="6">
                                <el-form-item label="供应单位" prop="o_Col36">
                                    <yl-commonselect ref="commonselect" 
                                            style="width:100%"
                                            v-model="formModel.order.o_Col36" 
                                            size="small"
                                            placeholder="请选择供应单位"
                                            :initData="supplierConf.dataList"
                                            :defaultProps="supplierConf.defaultProps"
                                            @getCurrentNode="_supplierChange">
                                      </yl-commonselect> 
                                </el-form-item> 
                            </el-col>

                           <el-col :span="6">
                                <el-form-item label="材料名称" prop="infoNM">
                                     <yl-commonselect ref="commonselect" 
                                            style="width:100%"
                                            v-model="formModel.order.infoNM" 
                                            size="small"
                                            placeholder="请选择材料"
                                            :initData="materialConf.dataList"
                                            :lists="materialConf.lists"
                                            :defaultProps="materialConf.defaultProps"
                                            @getCurrentNode="_materialChange">
                                      </yl-commonselect> 
                                </el-form-item> 
                           </el-col>

                           <el-col :span="6">
                                <el-form-item label="规格|辅单位" >
                                     <el-col :span="18">
                                       <el-input v-model="formModel.order.infoModel"  size="small" :readonly="true"></el-input>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-input v-model="formModel.order.v_Col15"  size="small" :readonly="true"></el-input>
                                    </el-col>
                                </el-form-item> 
                           </el-col>      
                       </el-row>
                        <el-row>
                             <el-col :span="6">
                                    <el-col :span="12">
                                         <el-form-item label="毛重(吨)" prop="d_Col36">
                                            <el-input 
                                                type="Number"
                                                v-model.Number="formModel.order.d_Col36" 
                                                size="small" 
                                                :readonly="true"> 
                                            </el-input>
                                          </el-form-item> 
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="皮重(吨)" prop="d_Col37" >
                                                <el-input 
                                                    type="Number"
                                                    v-model.Number="formModel.order.d_Col37" 
                                                    size="small" 
                                                    :readonly="true"> 
                                                </el-input>
                                            </el-form-item> 
                                        </el-col>
                            </el-col>

                             <el-col :span="6">
                                    <el-form-item label="料仓" prop="o_Col37">
                                            <yl-commonselect ref="commonselect" 
                                                style="width:100%"
                                                v-model="formModel.order.o_Col37" 
                                                size="small"
                                                placeholder="请选择料仓"
                                                :initData="LcConf.dataList"
                                                :defaultProps="LcConf.defaultProps"
                                                @getCurrentNode="_getLCChange">
                                        </yl-commonselect> 
                                    </el-form-item> 
                            </el-col>


                              <el-col :span="6">
                                    <el-col :span="12">
                                         <el-form-item label="扣率(%)">
                                                     <el-input 
                                                        v-model.Number="formModel.order.d_Col39"   
                                                        type="number"  
                                                        size="small"
                                                        @blur="_kouRate" >
                                                     </el-input>
                                         </el-form-item> 
                                    </el-col>
                                     <el-col :span="12">
                                         <el-form-item label="扣吨">
                                                     <el-input 
                                                        v-model.Number="formModel.order.d_Col40"   
                                                        type="number"  
                                                        size="small"
                                                        @blur="_kouDunBlur" ></el-input>
                                         </el-form-item> 
                                    </el-col>
                            </el-col>
                            <el-col :span="6">
                                    <el-col :span="12">
                                         <el-form-item label="转化率(%)">
                                                     <el-input 
                                                        v-model.Number="formModel.order.d_Col38"   
                                                        type="number"  
                                                        size="small" :readonly="true">
                                                     </el-input>
                                         </el-form-item> 
                                    </el-col>
                                     <el-col :span="12">
                                         <el-form-item label="主单位">
                                                     <el-input v-model="formModel.order.infoUnit"  size="small" :readonly="true"></el-input>
                                         </el-form-item> 
                                    </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                    <el-form-item label="进场时间" prop="v_Col16">
                                        <el-input v-model="formModel.order.v_Col16" size="small" :readonly="true"></el-input>
                                    </el-form-item> 
                            </el-col>
                               <el-col :span="6">
                                       <el-form-item label="净重(主)" >
                                            <el-input 
                                                type="Number"
                                                v-model.Number="jinZ" 
                                                size="small" 
                                                icon="more"
                                                :on-icon-click="handleIconClick"
                                                :readonly="true"> 
                                            </el-input >
                                          </el-form-item> 
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="备注信息" prop="orderRemark">
                                        <el-input v-model="formModel.order.orderRemark" size="small" ></el-input>
                                </el-form-item> 
                            </el-col>

                          
                        </el-row>
                    </el-form>
            </div>
            <div slot="secondbox" class="flexbox">
                <yl-layout>
                        <div slot="fristbox" >
                                <yl-toolbar class="toolbar" >
                                    <el-row>
                                        <el-button  
                                                type="primary" 
                                                size=""
                                                :loading="importLoading" 
                                                :disabled="saveBtnState" 
                                                @click="_importWight">
                                                <i class="icon-sign-in" ></i>进场称重</el-button>
                                            <el-button  
                                                type="success" 
                                                size="" 
                                                :loading="exportLoading" 
                                                :disabled="!saveBtnState" 
                                                @click="_exportWight">
                                                <i class="icon-sign-out" ></i>出场称重</el-button>
                                             <el-button  
                                                type="danger" 
                                                size="small" 
                                                :disabled="cancelBtnState"
                                                @click="_canelImportWight">
                                                <i class="icon-cancel" ></i>取消入场</el-button>
                                            <el-button 
                                                :plain="true" 
                                                type="warning" 
                                                size="small"
                                                @click="_resetFunc"
                                                ><i class="icon-spinner11" ></i> 重 置</el-button>
                                          <el-checkbox 
                                                v-model="formModel.order.b_Col26" 
                                                style="color:red;margin-left:10px" 
                                                :disabled="saveBtnState"
                                                @change="_backOrder"
                                          >是否退料</el-checkbox>
                                           <span style="font-size:12px;margin-left:10px">转化率运算：</span>
                                           <el-checkbox 
                                                v-model="isComputations" 
                                                style="color:blue;margin-left:10px" 
                                                @change="_changeText"
                                          >{{isComputationsText}}</el-checkbox>

                                           
                                    </el-row>
                                </yl-toolbar>
                        </div>
                        <div slot="secondbox" class="flexbox">
                                <yl-table ref="GbTable"
                                    @reload="_reload"
                                    @current-change="_currentChange"
                                    :configs="tableConfig" 
                                    :input="mainInput.inputModel"
                                    :tableloading="mainTableLoading" 
                                    >
                                        <template slot="flag" scope="scope">
                                            <el-tag type="primary" v-if="!scope.row.b_Col27">未回皮</el-tag>
                                            <el-tag type="success" v-else>已回皮</el-tag>
                                        </template>

                                        <template slot="backflag" scope="scope">
                                            <el-tag type="primary" v-if="!scope.row.b_Col26">正常</el-tag>
                                            <el-tag type="success" v-else>退料</el-tag>
                                        </template>
                                       
                                        <template slot="upload" scope="scope">
                                            <el-tag type="primary" v-if="!scope.row.b_Col30">未上传</el-tag>
                                            <el-tag type="success" v-else>已上传</el-tag>
                                        </template>
                                       
                                        <template slot="print" scope="scope" > 
                                            <div v-if="scope.row.b_Col27">
                                               <el-tooltip 
                                                effect="dark" 
                                                :hide-after="0"
                                                content="打印（不带扣重）"
                                                placement="bottom-start" 
                                                > 
                                                <span class="yl-table-icon" style="margin:0px 5px 0px 5px"  >  
                                                        <i  class="yl-text-color icon-printer"   @click="_printPage(scope.row,0)" ></i>
                                                </span>
                                                </el-tooltip>

                                                <el-tooltip 
                                                    effect="dark" 
                                                    :hide-after="0"
                                                    content="打印（带扣重）"
                                                    placement="bottom-start" 
                                                > 
                                                <span class="yl-table-icon" style="margin:0px 5px 0px 5px"  >  
                                                        <i  class="yl-text-color icon-diff-modified"   @click="_printPage(scope.row,1)" ></i>
                                                </span>
                                                </el-tooltip>
                                                <el-tooltip 
                                                effect="dark" 
                                                :hide-after="0"
                                                content="打印（电子榜单）"
                                                placement="bottom-start" 
                                                > 
                                                <span class="yl-table-icon" style="margin:0px 5px 0px 5px"  >  
                                                        <i  class="yl-text-color icon-clipboard2"   @click="_printPage(scope.row,2)" ></i>
                                                </span>
                                                </el-tooltip>
                                            </div>
                                            <div v-else>
                                                <el-tag type="primary">未进场暂不打印</el-tag>
                                            </div>
                                        </template>
                                          
                                </yl-table>
                        </div>
                    </yl-layout>         
            
            </div>
        </yl-layout>
</template>

<script type="text/babel">
import { getLodop } from 'common/print/lodop/LodopFuncs'
import  {inputModel} from 'api/inputmodel';
import util from 'common/js/util'
import fetch from 'api/fetch';
import keyboardJs from 'common/plugins/jqkeyboard/css/keyboard.css';
import keyboardStyle from 'common/plugins/jqkeyboard/js/jquery.keyboard.min';
export default {
  data(){
        return{
            selectRows:[],
            mainInput:new inputModel(),
            mainTableLoading:false,
            tableData:[],
            carNumConf:{
                dataList:[],
                defaultProps:{
                    label: 'v_Col6',
                    value: 'v_Col6'
                },
             },
            supplierConf:{
              defaultProps: {
                        text:"supplierName",
                        value:"id"
              },
              dataList:[],
                },
            materialConf:{
              defaultProps: {
                        text:"infoName",
                        value:"id"
              },
              lists:['infoModel','infoUnit'],
              dataList:[],
                },
            LcConf:{
                defaultProps: {
                        text:"v_Col10",
                        value:"id"
              },
              dataList:[],
                },
            bakUpData:{
                carNumConf:{},
                supplierConf:{},
                materialConf:{},
                LcConf:{}
                },
            saveBtnState:false,
            cancelBtnState:true,
            importLoading:false,
            exportLoading:false,
            jinZ:0,
            formModel:{
                order:{
                    id:'',
                    orgId:'',
                    orgCode:'',
                    orgName:'',
                    OrderDate:'',
                    orderCode:'',
                    orderDataType:'0',
                    orderDataId:'',
                    infoNM:'',
                    infoCode:'',
                    infoName:'',
                    infoModel:'',
                    infoUnit:'',
                    cId:'',
                    classNodebh:'',
                    maker:'',
                    makerDate:'',
                    orderRemark:'',
                    v_Col11:'',
                    v_Col12:'',
                    v_Col13:'',
                    v_Col14:'',
                    v_Col15:'',
                    d_Col36:0,
                    d_Col37:0,
                    d_Col38:0,
                    d_Col39:0,
                    d_Col40:0,
                    d_Col41:0,
                    d_Col42:0,
                    b_Col26:false,
                    b_Col27:false,
                    b_Col28:true,
                    b_Col29:false,
                    o_Col36:'',
                    o_Col37:'',
                },
                items:[],
                config:{
                    "isGenerateCode":true
                },
             },
            moduleConf:{},
            extensionObj:{},
            isComputations:false,
            isComputationsText:'除（默认）'
        }
    },
  props:{
        apiList:{
            type:Object,
            default:function(){
                return {}
            }
        },
        dbData:{
            type:Object,
            default:function(){
                return {}
            }
        },
        cameraList:{
            type:Object,
            default:function(){
                return {}
            }
        },
        icCardData:{
            type:Object,
            default:function(){
                return {}
            }
        },
        isValue:{
            type:Boolean,
            default:false
        },
        currentView:{
            type:String,
            default:''
        },
        gbGlobConf:{
            type:Object,
            default:function(){
                return {}
            }
        }
   },
  computed: {
            computedKoudun:{
                get(){
                    //计算扣吨 |(毛重-皮重)|*扣率/100
                   if(this.formModel.order.d_Col40===0){
                         let koudun=0;
                         koudun=Math.abs(this.formModel.order.d_Col36-this.formModel.order.d_Col37)*this.formModel.order.d_Col39/100;
                         return koudun.getToFixed(this.gbGlobConf.commonConf.gbFloatLength.jzl);
                   }else{
                       return this.formModel.order.d_Col40;
                   }
                }
             },
            computedjingWeight:{
                get(){
                       //计算净重 |(毛重-皮重)|-扣吨
                      
                       let jz= Math.abs(this.formModel.order.d_Col36-this.formModel.order.d_Col37)-this.formModel.order.d_Col40;
                        if(this.formModel.order.b_Col26){
                           jz=0-jz;
                        }
                        return jz.getToFixed(this.gbGlobConf.commonConf.gbFloatLength.jzl);
                }
             },
            computedjingWeight2:{
                get(){
                        let jz=Math.abs(this.formModel.order.d_Col36-this.formModel.order.d_Col37)-this.formModel.order.d_Col40;
                        if(this.formModel.order.b_Col26){
                           jz=0-jz;
                        }
                        if(this.isComputations){
                            //乘法
                             if(this.formModel.order.d_Col38>0){
                                    return (jz*this.formModel.order.d_Col38).getToFixed(this.gbGlobConf.commonConf.gbFloatLength.jzl);
                             }else{
                                    return jz.getToFixed(this.gbGlobConf.commonConf.gbFloatLength.jzl);
                             }
                        }else{
                            //除法
                            if(this.formModel.order.d_Col38>0){
                                return (jz/this.formModel.order.d_Col38).getToFixed(this.gbGlobConf.commonConf.gbFloatLength.jzl);
                            }else{
                                return jz.getToFixed(this.gbGlobConf.commonConf.gbFloatLength.jzl);
                            }
                        }
                }
             },
            utilObject:{
                    get(){
                        return util;
                    }
                },
            tableConfig: {
                    get () {
                        return {
                            table: {
                                attr: {
                                    data: this.tableData,
                                    highlightCurrent:true,
                                }
                            },
                            columns: [
                                {attr: { headerAlign:"center",prop: 'id', label: '打印', width:120,scopedSlot: 'print'} },
                                {attr: { prop: 'b_Col27', label: '状态', width:80,scopedSlot: 'flag'} },   
                                {attr: { prop: 'orderCode', label: '磅单号', width:120,} },   
                                {attr: { prop: 'v_Col11', label: '车牌号', width:120,  } },
                                {attr: { prop: 'v_Col12', label: '供应商名称', width:120, } },
                                {attr: { prop: 'infoName', label: '材料名称', width:120,  } },   
                                {attr: { prop: 'infoModel', label: '规格型号', width:150,  } },   
                                {attr: { prop: 'infoUnit', label: '主单位', width:60,  } },  
                                 {attr: { prop: 'v_Col15', label: '辅单位', width:60,  } },    
                                {attr: { prop: 'd_Col36', label: '毛重', width:80, } },
                                {attr: { prop: 'd_Col37', label: '皮重', width:80, } },
                                {attr: { prop: 'd_Col40', label: '扣吨', width:80, } },
                                 {attr: { prop: 'd_Col43', label: '净重(主)', width:80, } },
                                {attr: { prop: 'd_Col42', label: '净重(辅)', width:80, } },
                                {attr: { prop: 'v_Col16', label: '进场时间', width:120,  } }, 
                                {attr: { prop: 'v_Col17', label: '出场时间', width:120,  } },
                                {attr: { prop: 'v_Col13', label: '料仓', width:100,  } }, 
                                {attr: { prop: 'b_Col26', label: '是否退料', width:80,scopedSlot: 'backflag'} },   
                                {attr: { prop: 'b_Col30', label: '上传状态', width:80,scopedSlot: 'upload'} },  
                                {attr: { prop: 'maker', label: '制单人', width:100, } },
                                {attr: { prop: 'orderRemark', label: '备注信息',  } },
                            ]
                        }
                    }
                }
        },
   methods:{
        _changeText(a,b){
            if(this.isComputations){
                this.isComputationsText='乘法';
                }
                else{
                    this.isComputationsText='除法（默认）';
                }
            },
        //模块配置
        _getModuleConf(){
           let inputArrs=[ 
                    {dataField:"ExtensionTwo",op:"EQ",dataValue:'table31Order'},
                  ];
            fetch({ 
                     url: '/api/services/app/moduleConf/GetModuleConfForEdit',
                      method: 'post',
                      data: inputArrs
                    }).then((data)=>{
                            if(data.success){
                                let mConfigs=data.result.moduleConf;
                                this.moduleConf=JSON.parse(mConfigs.extensionOne,util.dealFunction);
                            }
                            else {
                                this.$message.error('失败！'+data.error.message);
                            }
                        }).catch((err)=>{this.$message.error('获取数据异常！'+data.error.message);});
         },
        async _printPage(params,type){
                let _this=this;
                const printConf=util.deepCopy(_this.moduleConf.outPutConf.printConf);
                //获取对象
                let  result= await  _this.asyncFunc({
                            url:_this.apiList.pTApiConf.getMainObjectForEdit,
                            method:'post',
                            data:{
                                queryConditionItem:[
                                                    {dataField:"OrgId",op:'EQ',dataValue:_this.getUserInfo().user.manageOrgId},
                                                    {dataField:"Id",op:'EQ',dataValue:params.id}
                                                ],
                            }
                        },'获取磅单对象信息');    
                printConf.content.dataModel=result; 
                let LODOP=getLodop();
                //渲染模板
                if(printConf.InterceptEvent.initTemplate!==undefined){
                                if(printConf.InterceptEvent.initTemplate.isOn){
                                    printConf.InterceptEvent.initTemplate.event(printConf.content,_this.moduleConf.outPutConf.displayModel,type);
                                }
                            }
                //替换字符
                if(printConf.InterceptEvent.beforePrint!==undefined){
                            if(printConf.InterceptEvent.beforePrint.isOn){
                                printConf.InterceptEvent.beforePrint.event(printConf.content,type);
                            }
                        }
                //打印
                if(printConf.eventConf!=undefined){
                                if(printConf.eventConf.isOn){
                                    printConf.eventConf.event(printConf.content,_this,LODOP,type);
                                }
                    }
               
                LODOP.PREVIEW();
         },
        _validatorFelids(type=1){ //1是进场2是出场
            //字段校验验证
            if(this.formModel.order.v_Col11==''){
                this.$message({ message: '请填写车牌信息！',type: 'warning'});
                return false;
            }
            if(this.formModel.order.v_Col12==''){
                this.$message({ message: '请填写供应单位！',type: 'warning'});
                return false;
            }
            if(this.formModel.order.infoName==''){
                this.$message({ message: '请填写材料信息！',type: 'warning'});
                return false;
            }
            if(type===1){
                if(this.formModel.order.d_Col36<=0){
                    this.$message({ message: '毛重必须大于0！',type: 'warning'});
                    return false;
                }
            }
            if(type===2){
                if(this.formModel.order.d_Col37<=0){
                    this.$message({ message: '皮重必须大于0！',type: 'warning'});
                    return false;
                }
            }
            return true;
         },
        _weightMZ(){
                //称毛重
                this.$emit('getDbData');
                this.formModel.order.d_Col36=this.dbData.Num.getToFixed(this.gbGlobConf.commonConf.gbFloatLength.jzl);
            },
        _weightPZ(){
            //称皮重
            this.$emit('getDbData');
            this.formModel.order.d_Col37=this.dbData.Num.getToFixed(this.gbGlobConf.commonConf.gbFloatLength.jzl);
            },
        _getcameraImg(orderid=""){
            this.$emit('getcameraListImg');
                //给formModel明细给值
                this.cameraList.list.map((item)=>{
                    let i={};
                    i.iV_Col6=item.Base64;
                    i.Orgid=this.getUserInfo().user.manageOrgId;
                    if(item.info!=undefined){
                        i.itemDataId=item.info.id;
                        i.iV_Col5=item.info.v_Col7;
                        i.iV_Col3=item.info.v_Col8;
                    }
                    if(orderid!==""){
                        i.orderId=orderid;   
                        i.iV_Col4='出场'; 
                    }else{
                        i.iV_Col4='入场';
                    }
                    this.formModel.items.push(i);
                })
            },
        _uploadData(dataModel){ 
            let _this=this;
                //请求前拦截
                let gbrow = util.deepCopy(dataModel);
                let updateRow=util.deepCopy(dataModel);
                let ptBeforeEvent=_this.gbGlobConf.ioConf.InterceptEventEvent.ptBeforeUplodEvent;
                let ptAfterEvent=_this.gbGlobConf.ioConf.InterceptEventEvent.ptAfterUplodEvent;
                if(ptBeforeEvent.isOn){
                let params=ptBeforeEvent.event(gbrow,_this);
                fetch(params.apiData,params.token).then(function(data) {
                            if(ptAfterEvent.isOn){
                                let result=ptAfterEvent.event(data,_this);
                                    if(result){
                                        let info = updateRow;
                                        info.order.b_Col30 = 1;
                                        info.config={
                                            isGenerateCode:false
                                            };
                                    fetch({
                                        url: '/api/services/app/table31Order/createOrUpdateMainObject',
                                        method: 'post',
                                        data: info
                                    }).then(function(data) {
                                    if(data.result){ console.log('更新状态成功！');}
                                    }).catch((err)=>{});
                                }else{
                                    console.log('上传数据失败！');
                                }
                            }
                        }).catch((err)=>{console.log('上传数据异常！'+err);})
                }
            
        },   
        _resetFormModel(){
                let  model=this.formModel.order;
                for(let item in model)
                { 
                        if(typeof model[item]==="string"){
                            model[item]="";
                        }else if(typeof model[item]==="number"){
                            model[item]=0;
                        }else if(typeof model[item]==="boolean"){
                            model[item]=false;
                        }else{
                        }
                }
                //处理items
                if(this.formModel.items){
                    this.formModel.items=[];
                }
                //给所有控件赋初始值
                this._initCompoentData();
            // this._btnState();
            },
        _resetFunc(){
                this._resetFormModel();
                this.selectRows=[];
                this._reload();
            }, 
        _kouDunBlur(){
                this.formModel.order.d_Col39=0;
            },
        _kouRate(){
                if(this.formModel.order.d_Col40>0){
                    this.formModel.order.d_Col39=0;
                }
             },
        handleIconClick(){
            this.$emit('getDbData');
             let kd=this.formModel.order.d_Col40;
             
             if(this.formModel.order.id===''){
                 if(kd===0){
                        kd=Math.abs(this.dbData.Num)*this.formModel.order.d_Col39/100
                    }
                 this.jinZ=this.dbData.Num-kd;
             }else{
                  if(kd===0){
                        kd=Math.abs(this.formModel.order.d_Col36-this.dbData.Num)*this.formModel.order.d_Col39/100
                    }
                  this.jinZ=Math.abs(this.formModel.order.d_Col36-this.dbData.Num)-kd;
             }
             if(this.formModel.order.b_Col26){
                           this.jinZ=0-this.jinZ;
             }
             this.jinZ=this.jinZ.getToFixed(this.gbGlobConf.commonConf.gbFloatLength.jzl);
        },
        _currentChange(val){
                    //单选时的方法
                    if(val!=null){
                        this.selectRows=[];
                        this.selectRows.push(val);
                        //赋值当前数据
                        let dataModel={};
                        dataModel.order=val;
                        if(!dataModel.order.b_Col27){
                            this._assignmentModel(dataModel);
                        }
                    }
             },
        _btnState(){
                this.cancelBtnState=true;
                this.saveBtnState=false;
                    if(this.selectRows.length>0){
                        if(!this.selectRows[0].b_Col27){
                            //未出场
                            this.cancelBtnState=false;
                            this.saveBtnState=true;
                        }else{
                            this.cancelBtnState=true;
                            this.saveBtnState=false;
                        }
                    }
                    else{
                        if(!this.formModel.order.b_Col27&&this.formModel.order.id!==''){
                            //未出场
                            this.cancelBtnState=false;
                            this.saveBtnState=true;
                        }else{
                            this.cancelBtnState=true;
                            this.saveBtnState=false;
                        }
                    }
             },
        _reload(){
                this.selectRows=[];
                this._getDataPageList();
                this._btnState();
             },
        _initCompoentData(){
                this.carNumConf=util.deepCopy(this.bakUpData.carNumConf);
                this.supplierConf=util.deepCopy(this.bakUpData.supplierConf);
                this.materialConf=util.deepCopy(this.bakUpData.materialConf);
                this.LcConf=util.deepCopy(this.bakUpData.LcConf);
            },
        _backOrder(){
                //退料事件
                //数据初始化
                if(this.formModel.order.b_Col26){
                    this._resetFunc();
                    this.formModel.order.b_Col26=true;
                }else{
                    this._resetFunc();
                }
            
             },
        async  _assignmentModel(model){
                //给表单赋值
                //重置表单
                this._resetFormModel();
                let dataModel=util.deepCopy(model);
                if(dataModel.order.id===''){
                    //IC卡赋值
                    let  result= await  this.asyncFunc({
                                                url:this.apiList.pTApiConf.getMainObjectForEdit,
                                                method:'post',
                                                data:{
                                                    queryConditionItem:[
                                                                        {dataField:"OrgId",op:'EQ',dataValue:this.getUserInfo().user.manageOrgId},
                                                                        {dataField:"V_Col11",op:'EQ',dataValue:dataModel.order.v_Col11}
                                                                    ],
                                                    sorting:'V_Col16 desc'
                                                }
                                            },'获取磅单对象信息');                                             
                    if(result.order!=null){
                        if(result.order.b_Col27){
                            //已出场 加载IC卡数据
                            this.formModel.order=Object.assign(this.formModel.order,dataModel.order) ;
                        }else{
                            //已进场未出场   加载选中数据
                            this.formModel.order=Object.assign(this.formModel.order,result.order) ;
                        }   
                    }else{
                            //没有当前车辆信息 加载IC卡信息
                            this.formModel.order=Object.assign(this.formModel.order,dataModel.order) ;
                    } 
                    //判断是否自动过磅                             
                    if(this.icCardData.order.b_Col18){
                        if(this.formModel.order.id===''){
                            this._importWight(); //进场过磅
                        }else{
                            this._exportWight(); //出场过磅
                        }
                    }
                }else{
                        //行选中或者车号过滤赋值
                    if(dataModel.order.b_Col27){
                        //已出场 选中当前行数据为默认项
                        //处理数据
                        dataModel.order.id="";
                        dataModel.order.b_Col27=false;
                        dataModel.order.b_Col26=false;
                        dataModel.order.d_Col36=0;
                        dataModel.order.d_Col37=0;
                        dataModel.order.d_Col39=0;
                        dataModel.order.d_Col40=0;
                        dataModel.order.d_Col42=0;
                        dataModel.order.v_Col16='';
                        dataModel.order.v_Col17='';
                        dataModel.order.orderDate='';
                        dataModel.order.orderCode='';
                        dataModel.order.orderRemark='';
                        delete dataModel.order.creationTime;
                        delete dataModel.order.creatorUserId;
                        delete dataModel.order.creatorUserName;
                    }
                        //已进场未出场 进行出场过磅
                        this.formModel.order=Object.assign(this.formModel.order,dataModel.order) ;
                }
                this._btnState();
            },
        async _getDataPageList(){
             let _this=this;
            //获取磅单列表信息
            _this.mainTableLoading=true;
             let inputArr=[{key:"OrgId",op:'EQ',value:_this.getUserInfo().user.manageOrgId},
                           {key:"OrderDataType",op:'EQ',value:0},
                           {key:"B_Col29",op:'EQ',value:0}];
             this.mainInput.addqueryConditionItem(inputArr);
             this.mainInput.inputModel.sorting="V_Col18 desc";
             let  result= await  _this.asyncFunc({
                            url:_this.apiList.pTApiConf.getMainPageList,
                            method:'post',
                            data:this.mainInput.inputModel
                        },'获取磅单列表信息');
              _this.tableData=result; 
              _this.mainTableLoading=false;                            
         },
        async  _importWight(){
            //进场称重
            let _this=this;
             //称重
            _this._weightMZ();
            if(_this._validatorFelids(1)){
            _this.importLoading=true;
            //抓拍
            this._getcameraImg();
            //处理数据
            _this.formModel.config.isGenerateCode=false;
            _this.formModel.order.orgId=_this.getUserInfo().user.manageOrgId;
            _this.formModel.order.orderDataType='0';
            _this.formModel.order.isAudit=1;
            _this.formModel.order.b_Col29=0;
            _this.formModel.order.b_Col30=0;
            _this.formModel.order.v_Col16=this.formatDate(new Date(),"YYYY-MM-DD HH:mm:ss");
            _this.formModel.order.v_Col18=this.formatDate(new Date(),"YYYY-MM-DD HH:mm:ss");
            _this.formModel.order.b_Col27=false;
            _this.formModel.order.orderDate=this.formatDate(new Date(),"YYYY-MM-DD");
            _this.formModel.order.d_Col42=0;
            _this.formModel.order.d_Col43=0; 
             //保存数据
             let  result= await  _this.asyncFunc({
                                                    url:_this.apiList.pTApiConf.createOrUpdateMainObject,
                                                    method:'post',
                                                    data:this.formModel
                                                },'保存磅单信息');
             if(result===null){
                _this._resetFormModel();
                _this._reload()
                _this.$notify({
                        title: '成功',
                        message: '进场称重成功！',
                        type: 'success'
                        });
             }
            _this.importLoading=false;
            }
         },
       
        async _exportWight(){
            //出场称重
            let _this=this;
             _this._weightPZ();
            if(_this._validatorFelids(2)){
            _this.exportLoading=true;
            //抓拍
            this._getcameraImg(_this.formModel.order.id);
            //处理数据
            _this.formModel.config.isGenerateCode=true;
            _this.formModel.order.v_Col17=_this.formatDate(new Date(),"YYYY-MM-DD HH:mm:ss");
            _this.formModel.order.v_Col18=this.formatDate(new Date(),"YYYY-MM-DD HH:mm:ss");
            _this.formModel.order.b_Col27=true;
            _this.formModel.order.d_Col40=_this.computedKoudun;
            _this.formModel.order.d_Col42=_this.computedjingWeight;
            _this.formModel.order.d_Col43=_this.computedjingWeight2;
            _this.formModel.order.b_Col31=this.isComputations;
            _this.formModel.order.orgName=this.getUserInfo().user.manageOrgName;
            //保存数据
             let  result= await  _this.asyncFunc({
                                                    url:_this.apiList.pTApiConf.createOrUpdateMainObject,
                                                    method:'post',
                                                    data:this.formModel
                                                },'保存磅单信息');
             if(result===null){
                  _this.$notify({
                        title: '成功',
                        message: '出场称重成功！',
                        type: 'success'
                    });
                  //上传数据
                if(_this.gbGlobConf.commonConf!=undefined){
                    if(_this.gbGlobConf.commonConf.upload.realTime){
                           //先获去数据
                         let  orderModel= await  _this.asyncFunc({
                                                    url:_this.apiList.pTApiConf.getMainObjectForEdit,
                                                    method:'post',
                                                    data:{
                                                        queryConditionItem: [{
                                                            dataField: 'Id',
                                                            op: 'EQ',
                                                            dataValue: _this.formModel.order.id
                                                        }],
                                                        sorting: ''
                                                    }
                                                },'获取磅单信息');
                          //实时上传
                          _this._uploadData(orderModel);
                    }
                }  
              

                if(_this.gbGlobConf.commonConf===undefined){
                    _this._printPage(_this.formModel.order,0);
                }
                else{
                    if(_this.gbGlobConf.commonConf.print.isPrint){
                        //打印提示
                        if(_this.gbGlobConf.commonConf.print.isPrintView){
                            //预览
                                _this._printPage(_this.formModel.order,_this.gbGlobConf.commonConf.print.type);
                               
                        }else{
                            //直接打印
                             _this._printPage(_this.formModel.order,_this.gbGlobConf.commonConf.print.type);
                            
                        }
                    }
                }
               _this._resetFormModel();
               _this._reload(); 
           }
            _this.exportLoading=false;
          }

         },
        async _canelImportWight(){
            //取消入场
            if(this.formModel.order.id!==''&&!this.formModel.order.b_Col27){
                //删除磅单
                this.$confirm('确认要取消单号为：【'+this.formModel.order.orderCode+'】的磅单进场吗?', '提示', {
                type: 'warning'
                }).then(async() => {
                 let  result= await  this.asyncFunc({
                                                    url:this.apiList.pTApiConf.deleteMainObject,
                                                    method:'post',
                                                    data:{id:this.formModel.order.id}
                                                },'取消常规磅单');
                                             
                    if(result===null){
                            this._resetFormModel();
                            this._reload();
                            this.$notify({
                                    title: '成功',
                                    message: '取消磅单进场成功！',
                                    type: 'success'
                                    });
                        }
                }).catch(()=>{});;
            }
           
         },
        
        _getLCChange(node){
            //料仓获取事件
            if(node[0]!=undefined){
                this.formModel.order.v_Col13=node[0].v_Col10;
                this.formModel.order.v_Col14=node[0].v_Col6;
            }
         },
        _materialChange(node){
            //材料信息选择(区分过滤和未过滤)
            if(node[0]!=undefined){
                let Obj={};
                Obj=node;
                this.formModel.order.infoCode=Obj[0].infoCode;
                this.formModel.order.infoModel=Obj[0].infoModel;
                this.formModel.order.infoName=Obj[0].infoName;
                this.formModel.order.v_Col15=Obj[0].infoSecUnit;
                this.formModel.order.infoUnit=Obj[0].infoUnit;
                this.formModel.order.cId=Obj[0].cId;
                this.formModel.order.classNodeBh=Obj[0].classNodeBh;
                this.formModel.order.d_Col38=Obj[0].infoSecUnitPreci;
                this.formModel.order.o_Col38=Obj[0].sO_Col15;
                //根据材料信息加载料仓
                let newLcList=[],dataSource=util.deepCopy(this.bakUpData.LcConf.dataList);
                newLcList=dataSource.filter(i=>{
                    return i.o_Col28===Obj[0].id;
                });
                if(newLcList.length>0){
                    this.LcConf.dataList=newLcList;
                    if(newLcList.length===1){
                        this.formModel.order.v_Col13=newLcList[0].v_Col10;
                        this.formModel.order.v_Col14=newLcList[0].v_Col6;
                        this.formModel.order.o_Col37=newLcList[0].id;
                    }
                }else{
                    //加载全部
                    this.LcConf=util.deepCopy(this.bakUpData.LcConf);
                }
            }
         },
       async _supplierChange(node){ 
            //改变供应商的值
            let _this=this;
             if(node[0]!=undefined){
                _this.formModel.order.v_Col12=node[0].supplierName;
              }
             if(!this.formModel.order.b_Col26){ //非退料情况
                    //根据供应商加载材料信息
                    let bindingData=await  _this.asyncFunc({
                                    url:_this.apiList.bindInfo.getMainAllList,
                                    method:'post',
                                    data:{
                                        queryConditionItem:[ //根据供应商加载材料
                                                            {dataField:"OrgId",op:'EQ',dataValue:_this.getUserInfo().user.manageOrgId},
                                                            {dataField:'O_Col27',op:'EQ',dataValue:_this.formModel.order.o_Col36},
                                                            {dataField:'I_Col1',op:'EQ',dataValue:1},
                                                        ],
                                        sorting:''
                                    }
                                },'获取绑定材料信息');
                        if(bindingData.length>0){
                                //过滤材料信息列表  
                                let newList=util.filterArr(_this.bakUpData.materialConf.dataList,'id',bindingData,'o_Col28');
                                _this.materialConf.dataList=newList;
                            }
                            else{
                                //赋给初始数据
                                _this.materialConf=util.deepCopy(_this.bakUpData.materialConf);
                            }    
              }         
        },
       _displayKeyboard(){
          // alert('此处显示车牌输入组件')
          console.log($('#keyboard'));
          $('#keyboard').keyboard();
        },
       async _carNumDell(){
                    let _this=this;
                    //选择车牌后的逻辑事件
                    let  dataModel= await  _this.asyncFunc({
                                                    url:_this.apiList.pTApiConf.getMainObjectForEdit,
                                                    method:'post',
                                                    data:{
                                                        queryConditionItem:[
                                                                            {dataField:"OrgId",op:'EQ',dataValue:_this.getUserInfo().user.manageOrgId},
                                                                            {dataField:"V_Col11",op:'EQ',dataValue:_this.formModel.order.v_Col11}
                                                                        ],
                                                        sorting:'V_Col18 desc'
                                                    }
                                                },'获取磅单对象信息');  
                    if(!this.formModel.order.b_Col26){ //非退料情况
                     //根据车牌获取车牌最近一条过磅数据
                        if(dataModel.order===null){
                            //直接筛选供应商信息
                                let bindingData=await  _this.asyncFunc({
                                                url:_this.apiList.bindInfo.getMainAllList,
                                                method:'post',
                                                    data:{
                                                        queryConditionItem:[ //根据车牌选供应商
                                                                            {dataField:"OrgId",op:'EQ',dataValue:_this.getUserInfo().user.manageOrgId},
                                                                            {dataField:'V_Col6',op:'EQ',dataValue:_this.formModel.order.v_Col11},
                                                                            {dataField:'I_Col1',op:'EQ',dataValue:0},
                                                                        ],
                                                        sorting:''
                                                    }
                                                },'获取绑定供应商信息');
                                if(bindingData.length>0){
                                        //过滤供应商信息列表  
                                        let newList=util.filterArr(_this.bakUpData.supplierConf.dataList,'id',bindingData,'o_Col27');
                                        _this.supplierConf.dataList=newList;
                                }
                                else{
                                    //赋给初始数据
                                    _this.supplierConf=util.deepCopy(_this.bakUpData.supplierConf);
                                }
                        }
                        else{ 
                                    //给表单赋值
                            this._assignmentModel(dataModel);
                        } 
                     }else{
                        //退料情况
                        if(dataModel.order!==null){
                            if(!dataModel.order.b_Col27){
                                 this.formModel.order=Object.assign(this.formModel.order,dataModel.order) ;
                                 this._btnState();
                            }   
                        }
                        
                    }
        },
       _carNumSel(){
           //车牌选择事件
           this._carNumDell();
        },
       _carNumChange(){
           //车牌失去焦点事件
           this._carNumDell();
           //判断是否加载车牌号
           this._autoAddCarNum();
        },
       async _autoAddCarNum(){
            if(this.formModel.order.v_Col11.length===7){
                       //查询是否有该车牌
                      let _this=this;
                     //选择车牌后的逻辑事件
                      let  dataModel= await  _this.asyncFunc({
                                                    url:_this.apiList.carNumApiConf.getMainObjectForEdit,
                                                    method:'post',
                                                    data:{
                                                        queryConditionItem:[
                                                                            {dataField:"OrgId",op:'EQ',dataValue:_this.getUserInfo().user.manageOrgId},
                                                                            {dataField:"V_Col6",op:'EQ',dataValue:_this.formModel.order.v_Col11}
                                                                        ],
                                                        sorting:''
                                                    }
                                                },'获取车牌信息');  
                    if(dataModel.order===null){
                             //是否要加入车牌维护列表
                          let  result= await  this.asyncFunc({
                                                                url:this.apiList.carNumApiConf.createOrUpdateMainObject,
                                                                method:'post',
                                                                data:{
                                                                    order:{
                                                                    orgId:_this.getUserInfo().user.manageOrgId,
                                                                    v_Col6:_this.formModel.order.v_Col11,
                                                                    b_Col17:1,
                                                                }}
                                                            },'添加车牌信息');
                                                        

                                //更新车牌列表
                                _this.carNumConf.dataList= await  _this.asyncFunc({
                                                                        url:_this.apiList.carNumParams,
                                                                        method:'post',
                                                                        data:{
                                                                            queryConditionItem:[
                                                                                                {dataField:"OrgId",op:'EQ',dataValue:_this.getUserInfo().user.manageOrgId,DataFieldTwo:"",TwoFieldRelation:""}
                                                                                            ],
                                                                            sorting:''
                                                                        }   
                                                                    },'获取车牌号列表信息');
                                _this.bakUpData.carNumConf=util.deepCopy(_this.carNumConf);   
                        
                    }                            

           }
        },
       _carNumSearch(queryString,cb){
           //车牌查询
            var restaurants =this.carNumConf.dataList;
            var results = queryString ? restaurants.filter(
                (restaurant) => {
                    return (restaurant.v_Col6.indexOf(queryString) >= 0);
                 }) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
       async loadComponentData(){
            //初始化控件数据
            let _this=this;
             //获取车牌号列表
              _this.carNumConf.dataList= await  _this.asyncFunc({
                                                    url:_this.apiList.carNumParams,
                                                    method:'post',
                                                    data:{
                                                        queryConditionItem:[
                                                                            {dataField:"OrgId",op:'EQ',dataValue:_this.getUserInfo().user.manageOrgId,DataFieldTwo:"",TwoFieldRelation:""}
                                                                        ],
                                                        sorting:''
                                                    }   
                                                },'获取车牌号列表信息');
            _this.bakUpData.carNumConf=util.deepCopy(_this.carNumConf);    
            //获取供应商列表信息
             _this.supplierConf.dataList= await  _this.asyncFunc({
                                                    url:_this.apiList.commonSupplierParams,
                                                    method:'post',
                                                    data:{
                                                        queryConditionItem:[
                                                                            {dataField:"OrgId",op:'EQ',dataValue:_this.getUserInfo().user.manageOrgId,DataFieldTwo:"",TwoFieldRelation:""}
                                                                        ],
                                                        sorting:'SortCode desc'
                                                    }
                                                },'获取供应商列表信息');  
            _this.bakUpData.supplierConf=util.deepCopy(_this.supplierConf); 
             //获取材料列表信息
             _this.materialConf.dataList= await  _this.asyncFunc({
                                                            url:_this.apiList.commonMaterialParams,
                                                            method:'post',
                                                            data:{
                                                                queryConditionItem:[
                                                                                    {dataField:"OrgId",op:'EQ',dataValue:_this.getUserInfo().user.manageOrgId,DataFieldTwo:"",TwoFieldRelation:""}
                                                                                ],
                                                                sorting:'SortCode desc'
                                                            }
                                                },'获取常用材料列表信息');
            _this.bakUpData.materialConf=util.deepCopy(_this.materialConf);
            //加载料仓末级节点
             _this.LcConf.dataList= await  _this.asyncFunc({
                                                            url:_this.apiList.lCParams,
                                                            method:'post',
                                                            data:{
                                                                queryConditionItem:[
                                                                                    {dataField:"OrgId",op:'EQ',dataValue:_this.getUserInfo().user.manageOrgId},
                                                                                    {dataField:"B_Col17",op:'EQ',dataValue:true}
                                                                                ],
                                                                sorting:''
                                                            }
                                                },'获取料仓末级信息');
            _this.bakUpData.LcConf=util.deepCopy(_this.LcConf);
        },
        initModel(){
             if(this.formModel.order.v_Col11!==""){
                   //目前正在作业，请稍后刷卡！
                    this.$message.warning('目前正在作业，请稍后刷卡！');
                   
               }else{
                   //空闲状态 填充数据
                     //构造formModel
                     if(this.currentView==='commonGb_PT'){
                        let model={order:{}};
                            model.order.id='';
                            model.order.orgId=this.getUserInfo().user.manageOrgId;
                            model.order.v_Col12=this.icCardData.order.v_Col6;
                            model.order.infoName=this.icCardData.order.v_Col8;
                            model.order.infoModel=this.icCardData.order.v_Col9;
                            model.order.infoUnit=this.icCardData.order.v_Col10;
                            model.order.v_Col11=this.icCardData.order.v_Col7;
                            model.order.v_Col12=this.icCardData.order.v_Col6;
                            model.order.v_Col13=this.icCardData.order.v_Co11;
                            model.order.v_Col14=this.icCardData.order.v_Co14;
                            model.order.v_Col15=this.icCardData.order.v_Co15;
                            model.order.d_Col38=this.icCardData.order.d_Col20;
                            model.order.d_Col39=this.icCardData.order.d_Col21;
                            model.order.d_Col40=this.icCardData.order.d_Col22;
                            model.order.b_Col26=false;
                            model.order.b_Col27=false;
                            model.order.infoNM=this.icCardData.order.o_Col28;
                            model.order.o_Col36=this.icCardData.order.o_Col26;
                            model.order.o_Col37=this.icCardData.order.o_Col29;
                            model.order.cId=this.icCardData.order.o_Col30;
                            this._assignmentModel(model);
                        }
               }
               this.$emit('changeFlag');
        }
   },
   mounted(){
       console.log(this.gbGlobConf)
       //加载配置
       this._getModuleConf();
       //加载控件准备数据
       this.loadComponentData();
       //获取磅单表信息
       this._getDataPageList();
     
   },
   activated(){
       if(this.isValue){
            this.initModel();
       }
   },
   watch:{
       isValue:function(n,o){
           if(n){
                this.initModel();
           }
       },

   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" rel="stylesheet/css" scoped>
.gbpt .editor{height:120px}
.gbpt .editor .formStyle{margin:5px 10px 0px 0px}
.gbpt .formStyle .el-row .el-form-item{margin-bottom:3px}
.toolbar{box-sizing: border-box;border:1px #ddd solid;}
</style>
