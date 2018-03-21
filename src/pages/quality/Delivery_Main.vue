<template>
<yl-panelpage :titleName="'物资验收'" 
    :treeLoading="printLoading"
    :fullscreenisShow="true" 
    :icon="'icon-library'">
    <div slot="content">
        <yl-layout>
            <div slot="fristbox" style="height:34px">
                 <yl-toolbar>
                    <el-form  :inline="true"  >
                            <el-button-group>
                                <el-button 
                                type="primary" 
                                class="icon-user-plus" 
                                size="small"   
                                :disabled="btnState.y"
                                @click="_openSigin">签收
                                </el-button>
                                <el-button 
                                type="primary" 
                                class="icon-user-minus"  
                                size="small"  
                                :disabled="btnState.n"
                                :loading="uncheckLoading"
                                @click="_unblackList">撤销签收
                                </el-button>
                            </el-button-group>
                            <el-form-item class="form-content-vertical">
                                <el-input  placeholder="请扫描发货单上的二维码" 
                                    :autofocus=true
                                    size="small" 
                                    v-model="searchModel.s_DELIVERY_ID" 
                                    @keyup.13.native="_reload">
                                </el-input>
                            </el-form-item>
                                <el-form-item class="form-content-vertical">
                                    <el-input  placeholder="请输入发货单号" size="small" v-model="searchModel.s_DELIVERY_NO"></el-input>
                                </el-form-item>
                                <el-form-item class="form-content-vertical">
                                    <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                </el-form-item>
                                 <el-form-item class="form-content-vertical">
                                    <el-button type="primary" 
                                    element-loading-text="数据加载中..." 
                                    :disabled="resultCount<=0" 
                                    size="small"  
                                    @click="_printPreview" 
                                    :loading="printLoading"><i class="icon-printer"></i>打印预览</el-button>
                                </el-form-item>
                        </el-form>
                 </yl-toolbar>
             </div> 
            <div slot="secondbox" class="flexbox">   
                <yl-layout>
                    <div slot="fristbox" style="height:85px">
                        <el-form class="yl-clearV" :model="formModel" label-width="100px"  style="padding:5px;">
                                <el-row >
                                    <el-col :span="8">
                                        <el-form-item  label="发货单号" prop="s_DELIVERY_NO">
                                            <span v-text="formModel.s_DELIVERY_NO" ></span>  
                                        </el-form-item>
                                        </el-col>
                                    <el-col :span="8" >
                                        <el-form-item label="采购订购单号" prop="s_SPD_CODE">
                                        <span v-text="formModel.s_SPD_CODE"></span> 
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="发货时间" prop="d_DELIVER_DATE">
                                            <span v-text="formModel.d_DELIVER_DATE"></span> 
                                        </el-form-item>
                                     </el-col>
                                    </el-row>
                                    <el-row  >
                                        <el-col :span="8" >
                                            <el-form-item label="运输方式" prop="s_TRANS_MODE">
                                            <span v-text="formModel.s_TRANS_MODE"></span> 
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="物流公司" prop="s_TRANS_COMPANY">
                                                <span v-text="formModel.s_TRANS_COMPANY"></span> 
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                            </el-form>
                    </div> 
                    <div slot="secondbox" class="flexbox"  >      
                        <yl-table ref="GbTable" 
                            @current-change="_currentChange"
                            :configs="tableConfig" 
                            :input="mainInput.inputModel"
                            :tableloading="mainTableLoading" 
                            >
                               <template slot="view" scope="scope"> 
                                    <div class="yl-table-icon">  
                                        <i class="icon-eye3 yl-text-color"  @click="_viewItem(scope.row.v_COL1)" ></i>
                                    </div>
                               </template>  
                              <template slot="s_MATL_FLAG" scope="scope"> 
                                   <el-tag type="primary" v-if="scope.row.s_MATL_FLAG==='0'">普</el-tag>
                                   <el-tag type="success" v-else>重</el-tag>
                               </template>        
                               <template slot="d_DELIVER_FLAG" scope="scope"> 
                                   <el-tag type="success" v-if="scope.row.d_DELIVER_FLAG==='已签收'">已签收</el-tag>
                                   <el-tag type="danger" v-else>未签收</el-tag>
                               </template> 
                                 <template slot="view1" scope="scope">
                                    <el-tooltip placement="right" content="预览明细" :visible-arrow="false" :effect="'light'">
                                        <div class="yl-table-icon">
                                            <i class="icon-eye3 yl-text-color" @click="_viewItemrow(scope.row.v_COL1)"></i>
                                        </div>
                                    </el-tooltip>
                                </template>
                 
                        </yl-table>
                     </div> 
                 </yl-layout>
             </div>
        </yl-layout>
           <!-- 查看实体明细 -->
         <el-dialog 
                    ref="mainDialog" 
                    title="实体明细表信息" 
                    v-model="viewVisible" 
                    size="title" 
                    top="10%" 
                    :lock-scroll="true" 
                    :modal-append-to-body="false" 
                    :close-on-click-modal="false"
                    >
                <yl-columnlay :border="true"  size="title">
                    <div slot="right">
                        <yl-layout>
                            <div slot="secondbox" class="flexbox">
                                <!--表显示区域-->
                                <yl-table ref="mainTable" @reload="_reloadItems" :configs="tableInfoConf" :input="itemInput.inputModel" :tableloading="itemTableLoading">
                                </yl-table>
                            </div>
                        </yl-layout>
                    </div>
                </yl-columnlay>
            </el-dialog>
         <el-dialog ref="mainDialogS" 
                 title="编辑" 
                 v-model="isVisibleS" 
                 size="small"  
                 top="8%" 
                 :lock-scroll="true"
                 :close-on-press-escape="false"
                 :modal-append-to-body="false" 
                 :close-on-click-modal="false"  >
                <div id="pic_list">
                    <ul style="font-size: 16px;background-color:#ddd;font-weight:500px" >
                        <li>
                            <span>订单号</span> 
                        </li>
                        <li>
                            <p>发货时间</p>
                        </li>
                        <li>
                            <p>物流公司</p>
                        </li>
                         <li>
                            <p>操作</p>
                        </li>
                    </ul>
                     <ul v-for="(item,index) in tableDatas" :key="index" style="font-size:14px;">
                       <li> <span>{{item.s_SPD_CODE}}</span>  </li>
                        <li><span>{{item.d_DELIVER_DATE}}</span>  </li>
                        <li><span>{{item.s_TRANS_COMPANY}}</span>  </li>
                        <li><el-button 
                                type="primary" 
                                icon="edit" 
                                size="small"
                                @click="_selectModel(item)">选择
                                </el-button> </li>
                    </ul>
                 </div>
        </yl-querycontainer>
        </el-dialog>
        <el-dialog ref="DialogEdit" title="签收单信息" v-model="addFormVisible" size="small"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                   <el-form v-if="addFormVisible"  :model="siginForm"  :rules="rules"  ref="siginForm" label-width="100px" >
                         <el-row>
                                <el-form-item label="签收单位" prop="d_DELIVER_DEPNAME">
                                    <el-input v-model="siginForm.d_DELIVER_DEPNAME" :readonly="true"></el-input>
                                </el-form-item>  
                          </el-row>
                          <el-row>
                                <el-form-item label="签收数量" prop="d_RNUM">
                                    <el-input v-model.Number="siginForm.d_RNUM" type="Number"
                                    @change="confimdliverNum"></el-input>
                                </el-form-item>  
                          </el-row>
                          <el-row>
                                <el-form-item label="签收人" prop="d_DELIVER_USER" >
                                    <el-input v-model="siginForm.d_DELIVER_USER" :readonly="true"></el-input>
                                </el-form-item>
                          </el-row>
                          <el-row>
                                <el-form-item label="签收时间" prop="d_DELIVER_TIME">
                                    <el-date-picker 
                                        v-model="siginForm.d_DELIVER_TIME" >
                                    </el-date-picker>
                                </el-form-item>
                          </el-row>
                          <el-row>
                                <el-form-item label="说明" prop="d_HGZ">
                                     <el-input v-model="siginForm.d_HGZ" row="5" type="textarea" style="100%"></el-input>
                                </el-form-item> 
                          </el-row>
                          <el-row>
                                <el-form-item style="text-align:right;" >
                                    <el-button @click="addFormVisible=false">取消</el-button>
                                    <el-button type="primary" @click="_blackList" :loading="checkLoading">确认</el-button>
                                </el-form-item>
                          </el-row>
               </el-form>              
        </el-dialog>
    </div>
</yl-panelpage>
</template>
<script type="text/babel">
function getBackingStorePixelRatio(ctx) {
  return (
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1
  );
}
import { inputModel } from "api/inputmodel";
import { requestgetMainPageList } from "./delivery_main.js";
import { requestgetMainPageListC,requestcreateOrUpdateMainObjectC } from "./delivery_detail.js";
import { requestgetMainPageListT,requestgetMainAllListT } from "./tp_entity.js";
import fetch from "api/fetch";
import { getLodop } from "common/print/lodop/LodopFuncs";
//import QRCodeImpl from "qr.js/lib/QRCode";
//import ErrorCorrectLevel from "qr.js/lib/ErrorCorrectLevel";
var LODOP; //声明为全局变量
export default {
  data() {
    return {
      viewVisible: false,
      itemTableLoading: false,
      printLoading:false,
      size: 81,
      itemsDate: [],
      resultCount: 0,
      tableData: {},
      tableDatas: [],
      selectRows: {},
      mainTableLoading: false,
      searchModel: {
        s_DELIVERY_NO: "",
        s_DELIVERY_ID: ""
      },
      searchItem: {
                s_ODD_ID: ''
               },
      addFormVisible: false,
      isVisible: false,
      isVisibleS: false,
      btnState: {
        y: true,
        n: true
      },
      mainInput: new inputModel(),
      itemInput: new inputModel(),
      formModel: {
        s_DELIVERY_ID: "",
        s_DELIVERY_NO: "",
        s_PDM_ID: "",
        s_SPD_CODE: "",
        d_DELIVER_DATE: "",
        s_TRANS_COMPANY: "",
        s_TRANS_MODE: "",
        d_CREATE_DATE: "",
        d_MODIFY_DATE: "",
        aCRUAL_DELIVERY_DATE: "",
        aCRUALl_DELIVERY_USER: "",
        aCRUAL_RECEIVE_COMPANY_CODE: "",
        aCRUAL_RECEIVE_COMPANY_NAME: "",
        oRIGIN_TYPE: ""
      },
       baseInfoConf: {
        dialogConf: { style: "height:850px" },
        layout: {
          columnlay: {
            hiddenLeft: true,
            upToolFilter: { visiable: false },
            downToolFilter: { visiable: false },
            toolFunction: { visiable: false }
          }
        }
      },
      siginForm: {},
      checkLoading: false,
      uncheckLoading: false,
      content: {
          title:
            '<table width="1024" id="title"><tr><td align="center"  height="40" nowrap><span style="font-size: 20px;color:blue;"><b><u>发货单</u></b></span></td></tr><tr><td height="40"></td></tr></table>',
          order:
            '<table  class="print-tablecss" width="1024" id="order"><tr><td colspan="1" ><div align="right">发货单号：</div></td><td nowrap colspan="3">#s_DELIVERY_NO#</td><td  colspan="1" nowrap><div align="right">采购订购单号：</div></td><td colspan="3" nowrap>#s_SPD_CODE#</td><td colspan="2" nowrap><div align="right">发货时间：</div></td><td colspan="2" nowrap>#d_DELIVER_DATE#</td</tr><tr><td colspan="1" nowrap><div align="right">运输方式：</div></td><td colspan="3" nowrap>#s_TRANS_MODE#</td><td colspan="1" nowrap><div align="right">物流公司：</div></td><td colspan="2" nowrap>#s_TRANS_COMPANY#</td></tr></table>',
          item: {
            thead:
              '<table class="print-MaterialTable" width="1024" id="item"><thead><tr><td class="print-tdcss" rowspan="2" width="10%"><div align="center">物资编码</div></td><td class="print-tdcss" rowspan="2" width="10%"><div align="center">物资名称</div></td><td class="print-tdcss" rowspan="2" width="15%"><div align="center">规格型号</div></td><td class="print-tdcss" rowspan="2" width="6%"><div align="center">单位</div></td><td class="print-tdcss" rowspan="2" width="13%"><div align="center">物资图号</div></td><td class="print-tdcss" rowspan="2" width="13%"><div align="center">采购单价</div></td><td class="print-tdcss" width="13%"><div align="center" >计划采购数量</div></td><td class="print-tdcss" width="12%"><div align="center">发货数量</div></td><td  width="10%" class="print-tdcss"><div align="center">签收数量</div></td></tr></thead>',
            tbody:
              '<tr><td class="print-tdcss" height="25">#s_MATL_CODE#</td><td class="print-tdcss1">#s_MATL_NAME#</td><td class="print-tdcss"><div style="text-align: center;">#s_MATL_TYPE#</div></td><td class="print-tdcss"><div style="text-align: right;">#s_MATL_UNIT#</div></td><td class="print-tdcss"><div style="text-align: right;">#n_CONT_PRICE#</div></td><td class="print-tdcss"><div align="right">#s_MALTP_CODE#</div></td><td class="print-tdcss"><div align="right">#n_PUR_NUM#</div></td><td class="print-tdcss"><div align="right">#n_DELIVER_NUM#</div></td><td class="print-tdcss"><div align="right">#d_RNUM#</div></td></tr>',
            qrCodeHTML:
              "<canvas style=\"height:81px;width:81px;\" height='81' width='81'></canvas><img style=\"width:81px;height:81px;margin:3px 0px 5px 4px !important;\" src=\"#seriaL_CODE#\"><p style='display:inline;text-overflow:ellipsis;white-space: nowrap;'>#seriaL_CODES#</p>",
            tfoot: "</tbody><tfoot></tfoot></table>"
          }
    },
      rules: {}
    };
  },
  computed: {
      tableInfoConf: {
            get() {
                return {
                    table: {
                        attr: {
                            data: {},
                            highlightCurrent: false,
                            style: { width: '100%', height: '400px' },
                        }
                    },
                    columns: [
                        {attr: {type: "index",label: "序号",width: 60,align: "center",headerAlign: "center"}},
                        { attr: { prop: 'seriaL_CODE', label: '序列号', width: 180, } },
                        { attr: { prop: 's_MATL_CODE', label: '物资编码', width: 130, } },
                        { attr: { prop: 's_MATL_NAME', label: '物资名称', width: 120, } },
                        { attr: { prop: 's_SPD_CODE', label: '采购订单号', width: 170, } },
                        { attr: { prop: 's_SPD_SEQ', label: '采购订单明细号', width: 170, } },
                        { attr: { prop: 'pRODUCT_CODE', label: '品牌与产地', width: 120, } },
                        { attr: { prop: 'oRG_CODE', label: '组织机构代码', width: 140,  } },
                        { attr: { prop: "num", label: "数量", width: 80 } },
                    ]
                }
            }
        },
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.tableData,
              highlightCurrent: true
            }
          },
          columns: [
            {attr: {prop: "v_COL1",label: "预览",width: 65,align: "center",scopedSlot: "view1",showOverflowTooltip: false}},
            {attr: {prop: "s_MATL_FLAG",label: "物资类型",width: 70,scopedSlot: "s_MATL_FLAG"}},
            {attr: {prop: "d_DELIVER_FLAG",label: "签收状态",width: 80,scopedSlot: "d_DELIVER_FLAG"}},
            { attr: { prop: "s_MATL_CODE", label: "物资编号", width: 135 } },
            { attr: { prop: "s_MATL_NAME", label: "物资名称", width: 140 } },
            { attr: { prop: "s_MATL_TYPE", label: "规格型号", width: 150 } },
            { attr: { prop: "n_DELIVER_NUM", label: "发货数量", width: 100 } },
            { attr: { prop: "d_RNUM", label: "签收数量", width: 80 } },
            { attr: { prop: "s_MATL_UNIT", label: "计量单位", width: 100 } },
            { attr: { prop: "s_SPD_CODE", label: "订单号", width: 150 } },
            { attr: { prop: "n_PUR_NUM", label: "计划采购数量", width: 120 } },
            { attr: { prop: "d_DELIVER_TIME", label: "签收时间", width: 100 } },
            { attr: { prop: "d_DELIVER_USER", label: "签收人", width: 100 } },
            { attr: { prop: "d_DELIVER_DEPNAME", label: "签收单位", width: 120 } },
            { attr: { prop: "s_MALTP_CODE", label: "物资图号", width: 100 } },
            { attr: { prop: "n_CONT_PRICE", label: "采购单价（合同价）", width: 160 } },
            {attr: { prop: "n_TAX_RATE", label: "税率", width: 100, width: 100 }},
            {attr: {prop: "s_TAX_FLAG",label: "是否含税",width: 150,width: 100}}
          ]
        };
      }
    }
  },
  methods: {
    _printPreview() {
      let _this = this;
      _this.printLoading=true;
      let dataModel = _this.formModel;
      let option = JSON.parse(JSON.stringify(_this.content));
      let inputArr = [{key: "S_DELIVERY_ID",op: "EQ",value: dataModel.id}];
      _this.itemInput.addqueryConditionItem(inputArr);
      _this.itemInput.inputModel.sorting = "SeriaL_CODE desc";
      requestgetMainAllListT(_this.itemInput.inputModel).then(data => {
        if (data.success) {
            _this.itemsDate=[];
          _this.itemsDate = data.result;
          for (let attr in dataModel) {
            option.order = option.order.replace("#" + attr + "#",dataModel[attr]);
          }
          if (option.item.tbody !== undefined) {
            let tbody = "",qrbody = "";
            _this.tableData.data.forEach(function(item, index) {
              let rowStr = option.item.tbody;
              for (let attr in item) {
                rowStr = rowStr.replace("#" + attr + "#", item[attr]);
              }
              if (item.s_MATL_FLAG === "1") {
                _this.itemsDate.filter(function(items) {
                    if (items.s_ODD_ID.indexOf(item.id) != -1) {
                      return items;
                    }
                  }).forEach(qrdata => {
                    const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel["L"]);
                    qrcode.addData(qrdata.seriaL_CODE);
                    let qrhtml = option.item.qrCodeHTML;
                    qrhtml = qrhtml.replace("#seriaL_CODES#",qrdata.seriaL_CODE);
                    qrcode.make();
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const cells = qrcode.modules;
                    const tileW = _this.size / cells.length;
                    const tileH = _this.size / cells.length;
                    const scale =(window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx);
                    canvas.height = canvas.width = _this.size * scale;
                    ctx.scale(scale, scale);
                    cells.forEach((row, rdx) => {
                      row.forEach((cell, cdx) => {
                        ctx.fillStyle = cell ? "#000000" : "#FFFFFF";
                        const w = Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW);
                        const h = Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH);
                        ctx.fillRect(Math.round(cdx * tileW),Math.round(rdx * tileH),w,h);
                      });
                    });
                    let imgData = canvas.toDataURL("image/png");
                    qrbody += qrhtml.replace("#seriaL_CODE#", imgData);
                  });
                rowStr +=
                  "<tr><td class=\"print-qrcss\" align='center' colspan='14'><div width=\"1024\">" +
                  qrbody +
                  "</div></td></tr>"; 
              }
              tbody += rowStr;
            });
            option.item.tbody = tbody;
          }
          let strBodyStyle ="<link type='text/css' rel='stylesheet' href='static/style/printTable.css'/>";
          LODOP = getLodop();
          LODOP.PRINT_INITA(0, 0, 1119, 743, "");
          LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
          LODOP.ADD_PRINT_TEXT(766, 532, 100, 25, "第#页/共&页");
          LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
          LODOP.SET_PRINT_STYLEA(0, "Horient", 2);
          LODOP.SET_PREVIEW_WINDOW(2, 2, 1, 1024, 768, "预览查看.开始打印");
          LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
          LODOP.ADD_PRINT_TABLE(39, 45, 1064, 111, option.title);
          LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
          LODOP.ADD_PRINT_TABLE(118,45,1064,72,strBodyStyle + "<body>" + option.order + "</body>");
          LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
          LODOP.ADD_PRINT_TABLE(175,45,1064,650,strBodyStyle +"<body>" +option.item.thead +"<tbody>" +option.item.tbody +option.item.tfoot +"</body>");
          LODOP.SET_PRINT_STYLEA(0, "TableHeightScope", 2);	
          LODOP.ADD_PRINT_BARCODE(45,987,72,79,"QRCode",dataModel.id);
          LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
          LODOP.ADD_PRINT_IMAGE(50,68,76,64,"<img style='z-index:5;position:absolute;left:0px;top:0px;border:0px;' src='static/img/zgztlogo.png'/>");
          LODOP.SET_PRINT_STYLEA(0, "Stretch", 2);
          LODOP.SET_PRINT_STYLEA(0, "TransColor", "#FFFFFF");
          LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
          LODOP.ADD_PRINT_TEXT(82,798,165,20,"NO." + dataModel.s_DELIVERY_NO);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_MODE('AUTO_CLOSE_PREWINDOW',1);
          LODOP.PREVIEW();
          _this.printLoading=false;                    
        }else{
            _this.printLoading=false; 
            this.$message.error('失败！' + data.error.message);
        }
      });
    },
   _reloadItems() {
            var _this = this;
            this.itemTableLoading = true; //开启加载
            var inputArr = [ 
                { key: "S_ODD_ID", op: "EQ", value: this.searchItem.s_ODD_ID }
            ];
            this.itemInput.addqueryConditionItem(inputArr);
            // this.itemInput.inputModel.draw = 1;
            // this.itemInput.inputModel.maxResultCount = 10;
            // this.itemInput.inputModel.skipCount = 0;
            // this.itemInput.inputModel.sorting = "SortCode desc";
            requestgetMainPageListT(this.itemInput.inputModel).then(data => {
                if (data.success) {
                    this.tableInfoConf.table.attr.data = data.result;
                }
                else {
                    this.$message.error('失败！' + data.error.message);
                }
                this.itemTableLoading = false;
            }).catch(function(error) {
                _this.itemTableLoading = false;
            });
        },  
  _viewItemrow(v_COL1) { //预览明细
            this.viewVisible = true;
            this.searchItem.s_ODD_ID = v_COL1;
            setTimeout(() => {
                this._reloadItems();
            }, 300)
        },

    _viewItem(id) {
      //实体明细显示
      this.orderId = id;
      this.isVisible = true;
    },
    _viewItemS() {
      //发货单明细显示
      this.isVisibleS = true;
    },
    _selectModel(mdoel) {
      //相同发货单列表
      this.formModel = mdoel;
      this._getItemPageList(this.formModel.v_COL1);
      this.isVisibleS = false;
    },
    _openSigin() {
      //打开签收表单
      this.addFormVisible = true;
      this.siginForm = this.selectRows;
      this.siginForm.d_DELIVER_DEPNAME = this.getUserInfo().user.manageOrgName;
      this.siginForm.d_DELIVER_DEPNODE = this.getUserInfo().user.manageOrgId;
      this.siginForm.d_DELIVER_TIME = this.formatDate(new Date(),'YYYY-MM-DD hh:mm:ss');
      this.siginForm.d_DELIVER_USER = this.getUserInfo().user.realName;
      this.siginForm.d_RNUM = this.selectRows.n_DELIVER_NUM;
    },
    confimdliverNum(val) {
      //验证输入数量大于0小于发货数量
      if (val < 0 || val > this.selectRows.n_DELIVER_NUM) {
        this.siginForm.d_RNUM = 0;
        this.$message.warning("请输入符合条件的发货数量" + this.selectRows.n_DELIVER_NUM);
      }
    },
    _blackList() {
      this.$refs.siginForm.validate(valid => {
        if (valid) {
          //签收单据
          this.checkLoading = true;
          let params = {
            procType: 1,
            firstKeys:
              "s_ODD_ID,d_DELIVER_DEPNODE,d_DELIVER_DEPNAME,d_DELIVER_TIME,d_DELIVER_USER,d_RNUM,d_HGZ",
            firstValues:
              "#" +
              this.siginForm.v_COL1 +
              "#,#" +
              this.siginForm.d_DELIVER_DEPNODE +
              "#,#" +
              this.siginForm.d_DELIVER_DEPNAME +
              "#,#" +
              this.siginForm.d_DELIVER_TIME +
              "#,#" +
              this.siginForm.d_DELIVER_USER +
              "#,#" +
              this.siginForm.d_RNUM +
              "#,#" +
              this.siginForm.d_HGZ +
              "#",
            secondKeys: "",
            secondOperates: "",
            secondValues: "",
            procName: "Pr_DeliveryAudit"
          };

          fetch({
            url: "api/services/app/dELIVERY_DETAIL/ExecuteSqlTwo",
            method: "post",
            data: params
          }).then(data => {
            if (data.success) {
              if (data.result.firstOutput == 1) {
                this.$message.success(data.result.secondOutput);
              } else {
                this.$message.warning(data.result.secondOutput);
              }
            } else {
              this.$message.error(data.error.message);
            }
            //刷新明细
            this.checkLoading = false;
            this.addFormVisible = false;
            this._getItemPageList(this.formModel.v_COL1);
          });
        } else {
          this.$message.warning("请按照条件填充表单！");
          return false;
        }
      });
    },
    _unblackList() {
      //撤销签收
      this.uncheckLoading = true;
      let params = {
        procType: 1,
        firstKeys: "s_ODD_ID",
        firstValues: "#" + this.selectRows.v_COL1 + "#",
        secondKeys: "",
        secondOperates: "",
        secondValues: "",
        procName: "Pr_DeliveryUnAudit"
      };

      fetch({
        url: "api/services/app/dELIVERY_DETAIL/ExecuteSqlThree",
        method: "post",
        data: params
      }).then(data => {
        if (data.success) {
          if (data.result.firstOutput == 1) {
            this.$message.success(data.result.secondOutput);
          } else {
            this.$message.warning(data.result.secondOutput);
          }
        } else {
          this.$message.error(data.error.message);
        }
        //刷新明细
        this.uncheckLoading = false;
        this.addFormVisible = false;
        this._getItemPageList(this.formModel.v_COL1);
      });
    },
    _getMainPageList() {
      //获取发货单主表信息
      this.selectRows = {};
      let inputArr = [];
      if (this.searchModel.s_DELIVERY_NO !== "") {
        inputArr.push({
          key: "S_DELIVERY_NO",
          op: "EQ",
          value: this.searchModel.s_DELIVERY_NO
        });
      }
      if (this.searchModel.s_DELIVERY_ID !== "") {
        inputArr.push({
          key: "Id",
          op: "EQ",
          value: this.searchModel.s_DELIVERY_ID
        });
      }
      if ( this.searchModel.s_DELIVERY_ID === "" && this.searchModel.s_DELIVERY_NO === "" ) {
        this.$message.warning("请键入查询条件！");
      } else {
        this.mainInput.addqueryConditionItem(inputArr);
        requestgetMainPageList(this.mainInput.inputModel).then(data => {
          if (data.success) {
            this.resultCount = data.result.recordsTotal;
            if (data.result.recordsTotal > 1) {
              //存在重复发货单号
              this.tableDatas = data.result.data;
              this.formModel = {};
              this.tableData = [];
              this._viewItemS();
            } else if (data.result.recordsTotal == 1) {
              //查询到唯一发货单号
              this.formModel = data.result.data[0];
              this._getItemPageList(this.formModel.v_COL1);
            } else {
              //未找到符合条件的发货单
              this.$message.warning("未找到符合条件的发货单！");
            }
            this.searchModel.s_DELIVERY_ID = "";
            this.searchModel.s_DELIVERY_NO = "";
          } else {
            this.$message.error("获取数据失败！" + data.error.message);
          }
        });
      }
    },
    _getItemPageList(id) {
      //获取发货单明细
      this.mainTableLoading = true; //开启加载
      let inputArr = [{ key: "S_DELIVERY_ID", op: "EQ", value: id }];
      this.mainInput.addqueryConditionItem(inputArr);
      requestgetMainPageListC(this.mainInput.inputModel)
        .then(data => {
          if (data.success) {
            this.tableData = data.result;
          } else {
            this.$message.error("获取数据失败！" + data.error.message);
          }
          this.mainTableLoading = false;
        })
        .catch(function(error) {
          this.mainTableLoading = false;
        });
    },
    _close() {
      this.addFormVisible = false;
    },
    _reload() {
      //根据发货单号或者主键查询发货单信息
      this._getMainPageList();
    },
    _currentChange(val) {
      //单选时的方法
      if (val != null) {
        this.selectRows = val;
        this._btnState(val);
      }
    },
    _btnState(row) {
      if (row.d_DELIVER_FLAG === "已签收") {
        this.btnState.y = true;
        this.btnState.n = false;
      } else {
        this.btnState.y = false;
        this.btnState.n = true;
      }
    }
  },
  components: {},
  mounted() {}
};
</script>
<style lang="css" rel="stylesheet/css" scoped>
#pic_list {
  display: block;
  width: 100%;
  color: #002;
  text-align: center;
  height: 550px;
}
#pic_list li {
  width: 23%;
  margin: 5px 0px;
  display: inline-block;
}
</style>
  