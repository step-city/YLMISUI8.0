import Vue from 'vue'


//通用工具组件
import lazyRender from './lazyrender/lazyRender'
import PanelPage  from   './panel/PanelPage';
import ToolBar  from   './toolbar/ToolBar';
import ColumnLay  from   './layout/ColumnLay';
import TreeSelect from './treeselect/TreeSelect';
import commonTree from './commontree/commonTree';
import commonAllTree from './commontree/commonAllTree';
import commontreeWithPanel from './commontreewithpanel/commontreeWithPanel';
import commonAlltreeWithPanel from './commontreewithpanel/commonAlltreeWithPanel';
import Layout from './layout/Layout';
import Table from './table/Table.js';
import TableR from './table/TableR.js';
import OnlyTable from './table/OnlyTable.js';
import tableEdit from './tableedit/tableEdit'
import loading from './loading/loading'
import error from './error/Error'
import jsonEditor from './editor/jsonEditor'
import mdEditor from './editor/mdEditor'
import wangEditor from './editor/wangEditor/wangEditor.vue'
import CommonSelect from './commonselect/CommonSelect'
import dynamicReport from './dynamicreport/dynamicReport'
import queryContainer from './container/queryContainer'
import queryContainerR from './container/queryContainerR'
import statisticsBlock from './container/statisticsBlock'
import selectContainer from './container/selectContainer'
import htmlContainer from './container/htmlContainer'
import queryChart from './container/queryChart'
import renderComs from './rendercoms/renderComs'
import renderSelComs from './rendercoms/renderSelComs'
import renderTableRowComs from './rendercoms/renderTableRowComs'
import tableSlotComs from './rendercoms/tableSlotComs'
import containerComs from './rendercoms/containerComs'
import dynamicForm from './dynamicmodule/dynamicForm'
import dynamicModule from './dynamicmodule/dynamicModule'
import reportAssemble from './reportAssemble/reportAssemble'
import singleUpload from './upload/singleUpload'
import multipleUpload from './upload/multipleUpload'
 

//注册全局组件
Vue.component('yl-lazyrender', lazyRender)
Vue.component('yl-panelpage', PanelPage)  
Vue.component('yl-toolbar', ToolBar) 
Vue.component('yl-columnlay', ColumnLay) 
Vue.component('yl-layout', Layout) 
Vue.component('yl-treeselect', TreeSelect)   
Vue.component('yl-commontree', commonTree)   
Vue.component('yl-commonalltree', commonAllTree) 
Vue.component('yl-commontreewithpanel', commontreeWithPanel)   
Vue.component('yl-commonalltreewithpanel', commonAlltreeWithPanel)   
Vue.component('yl-table', Table)
Vue.component('yl-tableR', TableR)
Vue.component('yl-onlytable', OnlyTable)
Vue.component('yl-tableedit', tableEdit)
Vue.component('yl-selectcontainer', selectContainer)
Vue.component('yl-querycontainer', queryContainer)
Vue.component('yl-querycontainerR', queryContainerR)
Vue.component('yl-rendercoms', renderComs)
Vue.component('yl-rendertablerowcoms', renderTableRowComs)
Vue.component('yl-renderselcoms', renderSelComs)
Vue.component('yl-containercoms', containerComs)
Vue.component('yl-tableSlotComs', tableSlotComs)
Vue.component('yl-dynamicform', dynamicForm)
Vue.component('yl-dynamicmodule', dynamicModule)
Vue.component('yl-dynamicreport', dynamicReport)
Vue.component('yl-queryChart', queryChart)
Vue.component('yl-htmlContainer', htmlContainer)
// Vue.component('yl-loading', loading)
// Vue.component('yl-error', error)
Vue.component('yl-commonselect', CommonSelect)
Vue.component('yl-reportassemble', reportAssemble)
Vue.component('yl-singleupload', singleUpload)
Vue.component('yl-multipleupload', multipleUpload)
Vue.component('yl-editor', wangEditor)
Vue.component('yl-mdeditor', mdEditor)
Vue.component('yl-jsoneditor', jsonEditor)
Vue.component('yl-statisticsBlock', statisticsBlock)