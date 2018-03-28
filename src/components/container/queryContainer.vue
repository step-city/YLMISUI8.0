<template>
     <yl-columnlay  
        :border="baseInfoConf.layout.border"
        :hiddenLeft="baseInfoConf.layout.columnlay.hiddenLeft">
              <div slot="left">
                <!--这里只能渲染带panel的树组件-->
                <yl-renderselcoms  
                    @getCurrentNodeWithPanel="_getCurrentNodeWithPanel"
                    @init="_initSelComs"
                    :option="filterConf.selfFilterConf.length>0?filterConf.selfFilterConf[0]:{}">
                </yl-renderselcoms>
              </div>
              <div slot="right" >
                    <yl-layout >
                        <div slot="fristbox" >
                              <el-form :inline="true" >
                                <yl-toolbar v-if="baseInfoConf.layout.columnlay.upToolFilter.visiable">
                                 <!--过滤器-->
                                        <el-form-item 
                                            class="form-content-vertical" 
                                            v-for="(item,index) in filterFormConf.up" :key="index">
                                                <yl-rendercoms  
                                                    :option="item"
                                                    :model="searchModel"
                                                    :refList="refList"
                                                    @change="_change"
                                                    @blur="_blur"
                                                    @init="_initComs"
                                                    @method1="_method1"
                                                    @method2="_method2">
                                                 </yl-rendercoms>
                                        </el-form-item>
                                        <el-form-item class="form-content-vertical" v-if="functionConf.searchBtn">
                                              <el-button 
                                                    v-show="functionConf.searchBtn.isShow"
                                                    :disabled="functionConf.searchBtn.disabled"  
                                                    :type="functionConf.searchBtn.type" 
                                                    :size="functionConf.searchBtn.size" 
                                                    @click="_functionClick(functionConf.searchBtn)"> 
                                                    <i :class="functionConf.searchBtn.icon"></i>
                                                    {{functionConf.searchBtn.text}}  
                                               </el-button>
                                         </el-form-item>
                                         <el-form-item class="form-content-vertical" v-if="functionConf.excelBtn">
                                              <el-button 
                                                    v-show="functionConf.excelBtn.isShow"
                                                    :disabled="functionConf.excelBtn.disabled"  
                                                    :type="functionConf.excelBtn.type" 
                                                    :size="functionConf.excelBtn.size" 
                                                    @click="_functionClick(functionConf.excelBtn)"> 
                                                    <i :class="functionConf.excelBtn.icon"></i>
                                                    {{functionConf.excelBtn.text}}  
                                               </el-button>
                                         </el-form-item>
                                </yl-toolbar>
                                <yl-toolbar v-if="baseInfoConf.layout.columnlay.downToolFilter.visiable">
                                 <!--过滤器-->
                                        <el-form-item class="form-content-vertical" v-for="(item,index) in filterFormConf.down" :key="index">
                                                <yl-rendercoms  
                                                :option="item" 
                                                :model="searchModel"
                                                :refList="refList"
                                                @change="_change"
                                                @blur="_blur"
                                                @init="_initComs"
                                                @method1="_method1"
                                                @method2="_method2">
                                                </yl-rendercoms>
                                        </el-form-item>
                                </yl-toolbar>
                             </el-form>

                             <yl-toolbar  v-if="baseInfoConf.layout.columnlay.toolFunction.visiable">
                              <!--功能-->
                               <el-button-group ref="funtoolbar">  
                                   <el-button v-for="(item,index) in funBtnConf" :key="index"
                                                :type="item.type" 
                                                :name="item.name" 
                                                :size="item.size" 
                                                :loading="item.loading"
                                                v-permissionSetting="item.permissionSetting"
                                                v-show="item.isShow"
                                                :disabled="item.disabled"  
                                                @click="_functionClick(item)" >
                                            <i :class="item.icon"></i>{{item.text}}</el-button>
                                </el-button-group>
                             </yl-toolbar>
                        </div>
                        <div slot="secondbox" class="flexbox">
                         <!--表显示区域-->
                             <yl-table ref="selecttable"
                                    @reload="_reload"
                                    @current-change="_currentChange" 
                                    @selection-change="_selectionChange"
                                    @row-click="toggleRowSelection"
                                    :configs="tableInfoConf" 
                                    :input="mainInput.inputModel"
                                    :tableloading="mainTableLoading" 
                                    :pagination="tableInfoConf.pagination" 
                                    >
                                    <template :slot="item.name" scope="scope" v-for="(item,index) in tableInfoConf.solSlotConf" > 
                                            <yl-tableSlotComs 
                                                :key="index"
                                                :option="item" 
                                                :row="scope.row" 
                                                :name="item.name"
                                                @tableSlotEvent="_tableSlotEvent"
                                                >
                                            </yl-tableSlotComs>
                                    </template>
                              </yl-table>
                        </div>
                    </yl-layout> 



                <!--编辑界面-->
                <el-dialog ref="mainDialog" 
                        v-model="addFormVisible" 
                        :size="formConfs.dialogConf.size"  
                        :top="formConfs.dialogConf.top"
                        :title="formConfs.dialogConf.title"
                        :modal="false"   
                        :modal-append-to-body="false" 
                        :close-on-click-modal="false"
                        >
                            <yl-dynamicform  
                                @close="_close" 
                                :formConf="formConfs"
                                :apiConf="apiConf"
                                :baseInfoConf="baseInfoConf"
                                :functionConf="functionConf"
                                :selectRow="currentRows"
                                :selectRows="selectRows"
                                :afterAddClose="formConfs.dialogConf.afterAddClose"
                                :tableName="tableName"
                                v-if="addFormVisible">
                            </yl-dynamicform>
                </el-dialog>

                <!--动态容器-->
                <el-dialog ref="dynamicDialog" 
                    v-model="itemFormVisible" 
                    :close-on-click-modal="true"
                    lock-scroll
                    :modal-append-to-body="false"
                    :title="itemConf.dialogConf.title" 
                    :size="itemConf.dialogConf.size"
                    :top="itemConf.dialogConf.top">
                     <yl-containercoms     
                            v-if="itemFormVisible"
                            :option="itemConf.option"
                            :outParams="itemConf.outParams"
                            @init="_initContainerComs"
                    >
                    </yl-containercoms> 
                </el-dialog>

               </div>
      </yl-columnlay>

</template>

<script type="text/babel">
import fetch from 'api/fetch';
import util from 'common/js/util';
import globalJS from 'common/js/globalJS';
import  {inputModel} from 'api/inputmodel';
import { mapGetters,mapActions } from 'vuex';
export default {
    data(){
        return {
                mainInput:new inputModel(),
                mainTableLoading:false,
                searchModel:{},
                selectRows:[],
                filterFormConf:{},
                currentRows:{},
                inputParams:[],
                refList:{},
                extensionObj:{},
                menuCode:'',
                tableName:'',
                addFormVisible:false,
                formConfs:{
                    dialogConf:{
                        title:'',
                        size:'',
                        top:'',
                        afterAddClose:true,
                        }, 
                        option:{}
                        },
                itemFormVisible:false,
                itemConf:{
                    dialogConf:{
                        title:'',
                        size:'',
                        top:'',
                        }, 
                        option:{}
                        },
                funBtnConf:{}
            }
                
    },
    props:{
            apiConf:{
                require:true,
                type:Object,
                default:function(){
                    return {};
                    }
            },
            baseInfoConf:{
                require:true,
                type:Object,
                default:function(){
                    return {};
                    }
            },
            filterConf:{
                require:true,
                type:Object,
                default:function(){
                    return {};
                    }
            },
            tableInfoConf:{
                require:true,
                type:Object,
                default:function(){
                    return {};
                    }
            },
            functionConf:{
                require:true,
                type:Object,
                default:function(){
                    return {};
                    }
            },
            formConf:{
                require:true,
                type:Object,
                default:function(){
                    return {};
                    }
            },
            outParams:{
                require:true,
                type:Object,
                default:function(){
                        return { }
                }
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
            globalFunObject:{
                get(){
                    return globalJS;
                }
            },
            ...mapGetters([ 'getGlobObject1','getGlobObject2','getGlobString1','getGlobString2','getGlobArray1' ]),
        },
    methods:{
        ...mapActions(['setGlobObject1','setGlobObject2','setGlobString1','setGlobString2','setGlobalArray1']),
        _reload(){
            this._loadData();
            this._funcState();
        },
        _replace(str){
            return str.replace(/\$/g,'').replace(/\#/g,'');
        },
        _loadData(){
            let _this=this;
            this.selectRows=[];
            this.mainTableLoading=true;
            let inputArr=[];
            //外来参数
            _this._formatOutParams(this.outParams);
            if(this.outParams.list!=undefined){
                inputArr.push(...this.outParams.list);
            }
            if(this.filterConf.selfFilterConf.length>0){
            inputArr.push({key:this.filterConf.selfFilterConf[0].name,  
                           op:this.filterConf.selfFilterConf[0].op,
                           DataFieldTwo:this.filterConf.selfFilterConf[0].DataFieldTwo,
                           TwoFieldRelation:this.filterConf.selfFilterConf[0].TwoFieldRelation,
                           value:this.searchModel[this.filterConf.selfFilterConf[0].name]});
            };                   
            this.filterConf.searchFilterConf.up.forEach((item,index)=>{
                 if(!(item.op==="EQ"&&this.searchModel[item.name]==="")){
                    let obj={};
                    obj.key=item.name;
                    obj.op=item.op;
                    obj.DataFieldTwo=item.DataFieldTwo;
                    obj.TwoFieldRelation=item.TwoFieldRelation;
                    obj.value=this.searchModel[item.name];
                    inputArr.push(obj)
                 }
            });
            this.filterConf.searchFilterConf.down.forEach((item,index)=>{
                if(!(item.op==="EQ"&&this.searchModel[item.name]==="")){
                    let obj={};
                    obj.key=item.name;
                    obj.op=item.op;
                    obj.DataFieldTwo=item.DataFieldTwo;
                    obj.TwoFieldRelation=item.TwoFieldRelation;
                    obj.value=this.searchModel[item.name];
                    inputArr.push(obj)
                }
            });
            
            inputArr.push(...this.inputParams);
            this.mainInput.addqueryConditionItem(inputArr);
            this.mainInput.inputModel.sorting=this.filterConf.sorting;
            let _apiconf=this.apiConf.getItemPageList;
            _apiconf.data=this.mainInput.inputModel;
            this._beforeLoad(_apiconf);
            fetch(_apiconf,_apiconf.configs).then(data=>{
                            if(data.success){
                                    this.extensionObj.table=data.result;
                                    this._afterLoad();
                                     this.tableInfoConf.table.attr.data=this.extensionObj.table;
                            }
                            else {
                                    this.$message.error('失败！'+data.error.message);
                            }
                            this.mainTableLoading=false;
                    }).catch(function(error){
                        _this.mainTableLoading=false;
                        _this.$message.error('获取数据失败！');
                    });
        },
         _currentChange(val){
                //单选时的方法
                if(this.tableInfoConf.columns[0].attr.type==="index"){
                    if(val!=null){
                        this.selectRows=[];
                        this.selectRows.push(val);
                    }
                    this._funcState();
                }
        },
       _selectionChange(val){
           //多选方法
            if(this.tableInfoConf.columns[0].attr.type==="selection"){
                if(val!=null){
                    this.selectRows=[];
                    this.selectRows=this.selectRows.concat(val);
                }
                this._funcState();
            }
       },
        _funcState(){
            let _this=this;
            if(this.functionConf.funState!=undefined){
                let eventConf=this.functionConf.funState.eventConf;
                if(eventConf!=undefined){
                    if(eventConf.isOn){
                        eventConf.click(this.selectRows,_this);
                    }
                }
            }
        },
        toggleRowSelection (row) {
            this.$refs.selecttable.toggleRowSelection(row);
            this._rowclick(row);
        },
        _functionClick(item){
            let _this=this;
            let eventConf=item.eventConf;
            if(eventConf!=undefined){
                if(eventConf.isOn){
                    eventConf.click(item.name,_this);
                }
            }
        },
        _exportExecl(fname){
             let fileName='';
            if(fname==undefined){
                if(this.baseInfoConf.panelpage==undefined){
                    fileName='报表名缺省';
                }else{
                    fileName=this.baseInfoConf.panelpage.titleName;
                }
            }else{
                fileName=fname;
            }
            this.exportCommonTemplate(this.tableInfoConf.columns,this.tableInfoConf.table.attr.data.data,fileName)
         },
        _add(){  
                this.addFormVisible=true;
                this.currentRows={};
                this.selectRows=[];
        },  
        _edit(){
                this.addFormVisible=true;
                this.currentRows=this.selectRows[0];
        },
        delete(id){
              let _this=this;
               _this.apiConf.deleteMainObject.data.id=id;
               return new Promise(function (resolve, reject){
                    fetch(_this.apiConf.deleteMainObject).then(data =>{
                            if(data.success){
                                    resolve(true);
                                }
                            else {
                                 reject(new Error('删除信息失败！'+err))
                            }
                    }).catch((err)=>{ reject(new Error('删除信息异常！'+err))});
               })
        },
       async _delete(){
                this.$confirm('确认要删除所选项目吗?', '提示', {
                type: 'warning',
                modal:false,
                }).then(async() => {
                        let resultCount=0,isflag=false;
                        if(this.tableInfoConf.columns[0].attr.type==="selection"){
                            //多选
                            for(let item of this.selectRows){
                                isflag=await this.delete(item.id);
                                if(isflag){ resultCount++; }
                            }
                        }else{
                            //单选
                             isflag=await this.delete(this.selectRows[0].id);
                             if(isflag){ resultCount=1;}
                            
                        }
                        this._reload();
                        this.$notify({
                                title: '成功',
                                message: '成功删除'+resultCount+'数据！',
                                type: 'success'
                            });
            }).catch(()=>{});
        },
         _close(bool){
            if(bool){
                this.addFormVisible=false;
            }
            this._reload();
          },
        //事件触发方法----
        _initComs(_coms){
           let _this=this,option=_coms.option;
           if(option.eventConf!=undefined){
            if(option.eventConf.isOn){
                if(option.eventConf.init!=undefined){
                     option.eventConf.init(_this,option);
                }
            }
           }
         },
         
         _change(node,_coms){
            let _this=this,option=_coms.option;
            let eventConf=option.eventConf;
            if(eventConf!=undefined){
                if(eventConf.isOn){
                    if(eventConf.change!=undefined){
                        eventConf.change(node,_this,option);
                    }
                }
            }  
        },
        _blur(node,_coms){
                let _this=this,option=_coms.option;
                let eventConf=option.eventConf;
                if(eventConf!=undefined){
                    if(eventConf.isOn){
                         if(eventConf.blur!=undefined){
                               eventConf.blur(node,_this,option);
                           }
                        }
                }
        },
         _method1(node,_coms){
            let _this=this,option=_coms.option;
            let eventConf=option.eventConf;
            if(eventConf!=undefined){
              if(eventConf.isOn){
                   if(eventConf.method1!=undefined){
                    eventConf.method1(node,_this,option);
                   }
              }
            }
        },
        _method2(node,_coms){
                let _this=this,option=_coms.option;
                let eventConf=option.eventConf;
                if(eventConf!=undefined){
                if(eventConf.isOn){
                    if(eventConf.method2!=undefined){
                        eventConf.method2(node,_this,option);
                    }
                }
                }
        },
        _getCurrentNodeWithPanel(node,option){
            //左边树筛选事件
            let _this=this;
            let eventConf=option.eventConf;
            if(eventConf!=undefined){
                if(eventConf.isOn){
                    eventConf.change(node,_this);
                    this._reload();
                }
            }
        },
        _initSelComs(_coms){
            let _this=this,option=_coms.option;
            if(option.eventConf!=undefined){
                if(option.eventConf.isOn){
                    if(option.eventConf.init!=undefined){
                            option.eventConf.init(_this,option);
                    }
                }  
            }
        },
        _initContainerComs(_coms){
            let _this=this,option=_coms.option;
            if(option.InterceptEvent!=undefined){
                let eventConf=option.InterceptEvent.init;
                 if(eventConf!=undefined){
                        if(eventConf.isOn){
                            eventConf.event(_this,option,_coms.outParams);
                        }
                    }
            }
        },
        _tableSlotEvent(row,item){
            let _this=this;
                    let eventConf=item.eventConf;
                    if(eventConf!=undefined){
                        if(eventConf.isOn){
                            if(eventConf.click!=undefined){
                                //对配置内容进行拦截处理
                               if(item.isContainer){
                                    let conf=_this.tableInfoConf.itemConf[item.name];
                                    eventConf.click(row,item.name,_this,conf);
                                    this.itemConf=conf;
                                    this.itemFormVisible=true;
                               }else{
                                   eventConf.click(row,item.name,_this);
                               }
                            }
                        }
                    }
        },
        _inputArrInit(){
            this.filterConf.inputArr.forEach(item=>{
                let _this=this;
                if(item.eventConf!=undefined){
                    if(item.eventConf.isOn){
                        if(item.eventConf.init!=undefined){
                            item.eventConf.init(item,_this);
                        }
                    }
                }
                if(!(item.op==="EQ"&&item.value==="")){
                    this.inputParams.push(item);
                }
            });
        },
        _formatOutParams(inputArr){
                let _this=this;
                if(this.filterConf.InterceptEvent!=undefined){
                    let eventConf=this.filterConf.InterceptEvent.formatOutParams;
                    if(eventConf!=undefined){
                        if(eventConf.isOn){
                            eventConf.event(_this,inputArr);
                        }
                    }
                }
        },
         _rowclick(currentrows){
                let _this=this;
                if(this.tableInfoConf.InterceptEvent!=undefined){
                    let eventConf=this.tableInfoConf.InterceptEvent.rowclick;
                    if(eventConf!=undefined){
                        if(eventConf.isOn){
                            eventConf.event(_this,currentrows);
                        }
                    }
                }
        },
         _beforeLoad(apiconf){
                let _this=this;
                if(this.filterConf.InterceptEvent!=undefined){
                    let eventConf=this.filterConf.InterceptEvent.beforeLoad;
                    if(eventConf!=undefined){
                        if(eventConf.isOn){
                            eventConf.event(_this,apiconf);
                        }
                    }
                }
        },
         _afterLoad(){
                let _this=this;
                if(this.filterConf.InterceptEvent!=undefined){
                    let eventConf=this.filterConf.InterceptEvent.afterLoad;
                    if(eventConf!=undefined){
                        if(eventConf.isOn){
                            eventConf.event(_this);
                        }
                    }
                }
        },
         _mounted(){
                 let _this=this;
                let eventConf=this.baseInfoConf.InterceptEvent;
                if(eventConf!=undefined){
                    if(eventConf.mounted.isOn){
                        eventConf.mounted.event(_this);
                    }
                }
        },
        //---------------
        init(){
            this.menuCode=this.$route.params.tableName;
            this._inputArrInit();
            //初始化拦截
            this._mounted();
            //一些初始化逻辑
            this._loadData();
        },
    },
    components:{
        },
    created(){
        this.searchModel=this.filterConf.searchModel;
        this.filterFormConf=this.filterConf.searchFilterConf;
        this.funBtnConf=this.functionConf.funBtn;
        if(this.formConf.dialogConf!=undefined){
            this.formConfs=this.formConf;
        }
    },
    mounted(){
        this.init();
    },
    watch:{
        outParams:function(n,o){
            this._reload();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

