import Vue from 'vue';
import Router from 'vue-router';
import util from 'common/js/util';
//业务组件
const Login = resolve => require(['./pages/Login.vue'], resolve);
const RoleList = resolve => require(['./pages/RoleList.vue'], resolve);
const Main = resolve => require(['./pages/Main.vue'], resolve);
const Home = resolve => require(['./pages/config/homepage/Home.vue'], resolve);
const Page404 = resolve => require(['./pages/Page404.vue'], resolve);
const ComDemo = resolve => require(['./pages/ComDemo.vue'], resolve);
const jsObjTurn = resolve => require(['./pages/jsObjTurn.vue'], resolve);
const MenuItem = resolve => require(['./pages/operation/systeminfo/menuitem/MenuItem.vue'], resolve);
const MenuApp = resolve => require(['./pages/operation/systeminfo/menuapp/MenuApp.vue'], resolve);
const Functions = resolve => require(['./pages/operation/systeminfo/function/Function.vue'], resolve);
const RoleApproveState = resolve => require(['./pages/operation/systeminfo/roleapprovestate/RoleApproveState.vue'], resolve);
const InformationPublish = resolve => require(['./pages/operation/systeminfo/informationpublish/InformationPublish.vue'], resolve);
const DataDictionaryDetail = resolve => require(['./pages/operation/systeminfo/datadictionary/DataDictionaryDetail.vue'], resolve);
const ProvinceCity = resolve => require(['./pages/operation/systeminfo/provincecity/ProvinceCity.vue'], resolve);
const Role = resolve => require(['./pages/operation/systeminfo/role/Role.vue'], resolve);
const AuditConfig = resolve => require(['./pages/operation/systeminfo/auditconfig/AuditConfig.vue'], resolve);
const Parameters = resolve => require(['./pages/operation/basic/parameters/Parameters.vue'], resolve);
const Organize = resolve => require(['./pages/operation/basic/organize/Organize.vue'], resolve);
const User = resolve => require(['./pages/operation/basic/user/User.vue'], resolve);
const ApiTest = resolve => require(['./pages/ApiTest.vue'], resolve);
const AttachMent = resolve => require(['./pages/operation/basic/attachment/AttachMent.vue'], resolve);
const StandardGH = resolve => require(['./pages/operation/basic/standardgh/StandardGH.vue'], resolve);
const TemplateGH = resolve => require(['./pages/operation/basic/templategh/TemplateGH.vue'], resolve);
const GH = resolve => require(['./pages/operation/basic/gh/GH.vue'], resolve);
const Project = resolve => require(['./pages/operation/basic/project/Project.vue'], resolve);
const CodeRule = resolve => require(['./pages/operation/systeminfo/coderule/CodeRule.vue'], resolve);
const ModuleConf = resolve => require(['./pages/operation/systeminfo/moduleconf/ModuleConf.vue'], resolve);
const SelectModuleConf = resolve => require(['./pages/operation/systeminfo/selectmoduleconf/SelectModuleConf.vue'], resolve);
const GlobConfig = resolve => require(['./pages/operation/systeminfo/globconfig/GlobConfig.vue'], resolve);
const CommonDataDictionary = resolve => require(['./pages/operation/basic/commondatadictionary/CommonDataDictionary.vue'], resolve);
const ModuleColConfig = resolve => require(['./pages/operation/systeminfo/modulecolconfig/ModuleColConfig.vue'], resolve);
const ReportConf = resolve => require(['./pages/operation/systeminfo/reportconf/reportConf.vue'], resolve);
const MainPage = resolve => require(['./pages/weight/MainPage.vue'], resolve);
const SqlState = resolve => require(['./pages/operation/systeminfo/sqlstatementconf/SqlState.vue'], resolve);
const supperModule = resolve => require(['./pages/config/dynamicmodule/SupperModule.vue'], resolve);
const supperReport = resolve => require(['./pages/config/dynamicreport/supperReport.vue'], resolve);
const SecurityApiOrder = resolve => require(['./pages/operation/systeminfo/securityapiorder/SecurityApiOrder.vue'], resolve);
const DeliveryMain = resolve => require(['./pages/quality/Delivery_Main.vue'], resolve);
const ICCard = resolve => require(['./pages/weight/iccard/ICCard.vue'], resolve);
const previewPhone = resolve => require(['./pages/config/previewPhone/previewPhone.vue'], resolve);
const BaseConfig = resolve => require(['./pages/operation/systeminfo/baseconfig/BaseConfig.vue'], resolve);
const SupperReportAssemble = resolve => require(['./pages/config/reportassemble/SupperReportAssemble.vue'], resolve);
const HomePageConf = resolve => require(['./pages/operation/systeminfo/homepageconf/HomePageConf.vue'], resolve);
const DefultHomePage = resolve => require(['./pages/config/homepage/DefultHomePage.vue'], resolve);
const ModuleConfData = resolve => require(['./pages/operation/systeminfo/moduleconfdata/ModuleConfData.vue'], resolve);


Vue.use(Router);
export default new Router({
routes:[
   {path: '/Login', component: Login },
   {path: '/rolelist', component: RoleList },
   {
    path: '/',
    component: Main,
    redirect: 'home',
    name: '',
    children: [
      { path: '/home', component: Home, name: '首页'  },
      { path: '/defaulthome', component: DefultHomePage, name: '默认首页'  },
      
    ]
  },
  {
    path: '/',
    component: Main,
    name: '易龙快速开发平台',
    children: [
         { path: 'comdemo', component: ComDemo, name: '组件测试页面' },
          { path: 'apitest', component: ApiTest,name: 'api测试页面'  },
          { path: 'jsobjturn', component: jsObjTurn,name: 'js转化json'  },
          { path: 'menuItem', component: MenuItem, name: '菜单管理' },
          { path: 'menuApp', component: MenuApp, name: '应用系统' },
          { path: 'function', component: Functions, name: '功能管理' },
          { path: 'role', component: Role, name: '角色管理' },
          { path: 'roleapprovestate', component: RoleApproveState, name: '审批管理' },
          { path: 'modulecolconfig', component: ModuleColConfig, name: '模块表对应信息' },
          { path: 'reportconf', component: ReportConf, name: '报表配置' },
          { path: 'datadictionarydetail', component: DataDictionaryDetail, name: '数据字典' },
          { path: 'infoPublish', component: InformationPublish, name: '系统文档管理' },
          { path: 'parameters', component: Parameters, name: '组织属性' },
          { path: 'organize', component: Organize, name: '组织机构管理' },
          { path: 'provinceCity', component: ProvinceCity, name: '省市管理' },
          { path: 'user', component: User, name: '用户管理' },     
          { path: 'attachment', component: AttachMent, name: '文件上传' },
          { path: 'standardgh', component: StandardGH, name: '工号标准库' },
          { path: 'templategh', component: TemplateGH, name: '工号模板' },
          { path: 'gh', component: GH, name: '工号管理' },
          { path: 'project', component: Project, name: '项目信息维护' },
          { path: 'coderule', component: CodeRule, name: '编码管理' },
          { path: 'commondatadictionary', component: CommonDataDictionary, name: '单位字典库' },
          { path: 'globconfig', component: GlobConfig, name: '全局配置' },
          { path: 'moduleconf', component: ModuleConf, name: '模块配置' },
          { path: 'auditconfig', component: AuditConfig, name: '模块审批配置' },
          { path: 'sqlstate', component: SqlState, name: 'SQL语句配置' },
          { path: 'securityapiorder', component: SecurityApiOrder, name: 'API授权管理' },
          { path: 'selectmoduleconf', component: SelectModuleConf, name: '数据选择框' },
          { path: 'iccard', component: ICCard, name: 'IC卡管理'},
          { path: 'mainPage', component: MainPage, name: '过磅主界面'}, 
          { path: 'delivery_main', component: DeliveryMain, name: '验收单'},
          { path: 'baseconfig', component: BaseConfig, name: '过磅基础信息设置'},
          { path: 'homePageConf', component: HomePageConf, name: '门户配置'},
          { path: 'moduleconfdata', component: ModuleConfData, name: '配置数据管理'},
          { path: 'suppermodule/:systemName/:tableName', component: supperModule, name: '模块容器'},
          { path: 'supperreport/:systemName/:tableName', component: supperReport, name: '报表容器'},
          { path: 'reportassemble/:systemName/:tableName', component: SupperReportAssemble, name: '报表集容器'},
          {path: '*',component: Page404} 
    ]
  },
   {path: '/previewPhone/:menuCode/:id',component: previewPhone}, 
   {path: '*',component: Page404} 
  ]
});


