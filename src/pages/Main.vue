<template>
<div class="main" ref="main" :style="{'width': bodyStyle.width, 'height': bodyStyle.height }">
	<div class="header" >
		<div class="left">
			<div class="logowrapper">
					<img class="logo" src="../common/image/zgztlogo.png"  />
				</div>
				<div class="title">{{systemTitleName}}</div>
		</div>
		<div class="right">
			<ul>
				<!-- <li v-for="(item,key) in menuAppList" 
						:class="{'appIsOn':item.appCode===appObj.appCode}" 
						:key="key"  
						@click="_turnSystem(item)">  
						<i class="icon-device-desktop icon"></i>
						<span>{{item.appName}}</span>
				</li> -->
				<!-- <li @click="_goEveryWhere"><i class="icon-circle icon"></i><span>系统漫游</span></li>
				<li @click="_turnRole"><i class="icon-users icon"></i></a><span>角色转化</span></li> -->
				<li @click="_loginCenter"><i class="icon-users icon"></i></a><span>用户中心</span></li>
			    <li @click="_loginout"><i class="icon-switch2  icon"></i></a><span>注销登录</span></li>
				<!-- <li @click="_loginout"><i class="icon-switch2 icon"></i><span>注销</span></li> -->
				<!-- <li class="head_menu"  @click="_menuClick">
					<img width="45"  src="../common/image/lock_user.png" :alt="userInfo.user.realName">
					<ul class="menu_content" :class="{'head_menu1':menudDisplay}">
						<li class="menu_li" @click="isChangePwa=true"><i class="icon-key3"></i><span style="padding-top:10px">修改密码</span></li>
						<li class="menu_li"><i class="icon-envelope"></i><span>通知消息</span></li>
						<li class="menu_li" @click="_loginout"><i class="icon-switch2"></i><span>注销登录</span></li>
					</ul>
				</li>  -->
			</ul>
			
		</div> 
	</div>
  	<div class="content" >
			<div class="left-wrapper" :class="{  'left-wrapper-close':isClose}"  >
			   <el-menu default-active="/home"  class="el-menu-vertical" v-loading="menuLoading" element-loading-text="菜单加载中..."   @open="_handleOpen" @close="_handleClose" unique-opened :router="true">
					<el-menu-item index="/home" class="single"><i class="icon-home"></i>系统门户</el-menu-item>
						<el-submenu :index="fristmenulist.name" class="el-submenu-main"   v-for="(fristmenulist,index) in menuList" :key="index"> 
							<template slot="title" ><i :class="fristmenulist.icon"></i>{{fristmenulist.displayName}}</template>
									<el-submenu :index="secondmenulist.name" class="el-submenu-item" v-for="(secondmenulist,index) in fristmenulist.items" :key="index">
										<template slot="title"><i :class="secondmenulist.icon"></i>{{secondmenulist.displayName}}</template>
											<el-menu-item :index="thirdmenulist.url" v-for="(thirdmenulist,index) in secondmenulist.items" :key="index">{{thirdmenulist.displayName}}</el-menu-item>
									</el-submenu>
					  </el-submenu>
					   <el-menu-item index="/pages/apitest" class="single"><i class="icon-home"></i>API测试界面</el-menu-item>
					 <!-- <el-menu-item index="/pages/comdemo" class="single"><i class="icon-home"></i>业务组件用例</el-menu-item>
					 
					  <el-menu-item index="/pages/test" class="single"><i class="icon-home"></i>测试界面</el-menu-item> -->
					   <el-menu-item index="/pages/jsobjturn" class="single"><i class="icon-home"></i>js转化json</el-menu-item>
					
				</el-menu>
			</div>
			<div class="main-wrapper" :class="{'main-wrapper-expend':isClose}">
				 <div class="shrinkage" @click="_showMenu"></div>
				 <div class="dynamicmodel">
						<transition name="fade" >
							<!-- <keep-alive :include="includedComponents"> -->
								<router-view></router-view>
							<!-- </keep-alive> -->
						</transition>
					</div>
			</div>
	</div>
	<div class="foot">
		<div class="systeminfo">
			<span ><i class="icon-info2 icon"></i> {{appObj.appDescription}}</span>
			<span >({{globalConf.versionNum}}) </span>
		</div>
		<div class="userinfo">
			<span ><i class="icon-user-tie icon"></i> {{userInfo.user.realName}}</span>
			<span > | <i class="icon-office icon"></i> {{userInfo.user.manageOrgName}}</span>
			<span > | <i class="icon-users icon"></i> {{userInfo.user.roleName}}</span>
			<span > |
				<el-tooltip effect="dark" :hide-after="0"	content="客服建议" placement="bottom-start" > 
					<i class="icon-smile icon"></i>
				</el-tooltip>
			</span>
			<span > |
				<el-tooltip effect="dark" :hide-after="0"	content="锁屏" placement="bottom-start" > 
					 <i class="icon-locked icon" @click="_lockScreen"></i> 
				</el-tooltip>
			</span>
			<span > |
				<el-tooltip effect="dark" :hide-after="0"	content="修改密码" placement="bottom-start" > 
						<i class="icon-keyboard icon" @click="isChangePwa=true"></i>
				</el-tooltip>
			</span>
			<span > |
				<el-tooltip effect="dark" :hide-after="0"	content="全屏显示" placement="bottom-start" > 
						<i class="icon-enlarge icon" @click="_fullScreen"></i> 
				</el-tooltip>
			</span>
		</div>
	</div>
	<div class="lock" v-if="isLock">
		<div class="lockmain">
			<div class="userimage">
			</div>
			<div class="locktexet" >
				{{userInfo.user.realName}}
			</div>
			<div class="loginform">
					<el-form  :inline="true" >
						<el-form-item style="margin-right:0px">
							<input style="display:none">
							<el-input  placeholder="请输入密码解锁"  style="width:180px" type="password" autoComplete="off"  v-model="lockPassWord" @keyup.enter.native="_resetLogin">
								<el-button slot="append"  @click="_resetLogin"><i class="icon-unlocked2"/></el-button>
							</el-input>
							</el-form-item>
					</el-form>
			</div>
		</div>
	</div>
	<el-dialog ref="mainDialog" title="转化角色" v-model="roleFormVisible" size="tiny" top="15%" 
				:modal-append-to-body="false" :close-on-click-modal="false"  >
				<TurnRole  @close="_close"  v-if="roleFormVisible"></TurnRole>
	</el-dialog>

	<el-dialog ref="mainDialog" title="系统漫游" v-model="goEveryWhereFormVisible" size="tiny" top="15%" 
				:modal-append-to-body="false" :close-on-click-modal="false"  >
				<GoEveryWhere  @close="_closeM"  v-if="goEveryWhereFormVisible"></GoEveryWhere>
	</el-dialog>

	<el-dialog ref="mainDialog" title="修改密码" v-model="isChangePwa" size="tiny" top="15%" 
				:modal-append-to-body="false" :close-on-click-modal="false"  >
				<el-form   label-width="80px" >
					<el-form-item label="原密码" >
						<el-input  
						v-model="pwaForm.oldpwa" 
						type="password" 
						autoComplete="off" 
						:placeholder="'请输入原密码'" 
						@blur="_checkOldPwa"  >
						</el-input>
					 </el-form-item> 
					<el-form-item label="新密码" >
						<el-input  v-model="pwaForm.newpwa" type="password" autoComplete="off" :placeholder="'请输入新密码'"  >
						</el-input>
						</el-form-item> 
					<el-form-item label="新密码确认" >
						<el-input   v-model="pwaForm.conformpwa" type="password" autoComplete="off" :placeholder="'再次输入新密码'"  >
						</el-input>
					</el-form-item>  
					<el-form-item style="text-align:right;" >
						<el-button @click="_clearpwa">重置</el-button>
						<el-button type="primary" @click="_changePwa" >确定</el-button>
					</el-form-item>
				</el-form>
	</el-dialog>

   <el-dialog  title="解锁模块" v-model="moduleAccessFlag" size="tiny" top="30%" 
				:modal-append-to-body="false" 
				:close-on-click-modal="false" 
				:show-close="false" 
				:close-on-press-escape="false">
					<el-form   label-width="80px" >
							<el-form-item label="解锁密码" >
								<el-input  v-model="accessFlag" type="password" autoComplete="off" :placeholder="'请输入解锁密码'" @keyup.enter.native="_onSubmit"  >
							    </el-input>
							</el-form-item>  
						<el-form-item style="text-align:right;" >
							<el-button @click="_complete">回到主页</el-button>
							<el-button type="primary" @click="_onSubmit" >确定</el-button>
						</el-form-item>
				</el-form>
	</el-dialog>

  	<el-dialog ref="selDialog" 
	  			:modal="false"
				:lock-scroll="true"
				:close-on-press-escape="false"
	  			v-if="selMaterialrender"
	  			v-model="selMaterialVisible" 
	  			:title="getBaseinfoConf.dialogConf.title"
				:top="getBaseinfoConf.dialogConf.top" 
				:size="getBaseinfoConf.dialogConf.size"
				:modal-append-to-body="getBaseinfoConf.dialogConf.modalAppendToBody" 
				:close-on-click-modal="getBaseinfoConf.dialogConf.closeOnClickModal"
				@close="_selClose">
				<yl-selectcontainer v-if="selMaterialVisible" @close="_selClose"></yl-selectcontainer>					
	</el-dialog>
	
 </div>

</template>

<script type="text/babel">
import { requestGetUserMenu,
		 requestGetCurrentLoginInformations,
		 requestGetMenuAppList, 
		} from 'api/login';
import { mapGetters, mapActions} from 'vuex';
import fetch from 'api/fetch';
import util from 'common/js/util';
import TurnRole from 'pages/config/TurnRole';
import GoEveryWhere from 'pages/config/GoEveryWhere';
import screenfull from 'screenfull';
export default {
		data(){
			return{
					isClose:false,
					isLock:false,
					lockPassWord:'',
					menuList:{},
					bodyStyle:{},
					menuLoading:false,
					appObj:{},
					roleFormVisible:false,
					goEveryWhereFormVisible:false,
					selMaterialVisible:false,
					selMaterialrender:false,
					menuAppList:[],
					moduleAccessFlag:false,
					accessFlag:'',
					accessFlagText:'text',
					systemTitleName:window.getClientObj().sysConf.titleName,
					includedComponents:[],
					menudDisplay:true,
					isChangePwa:false,
					pwaForm:{ 
						oldpwa:'',
						newpwa:'',
						conformpwa:''
					}
			};
		},
		computed:{
			...mapGetters(['getIsVisible','getBaseinfoConf']),
			globalConf:{
				get(){
					return util.getLocalStorage('SysGlobConf');
				}
			},
			userInfo:{
				get(){
					return this.getUserInfo();
				}
			}
		},
		methods: {
			_menuClick(){
				this.menudDisplay=!this.menudDisplay
			},
		    _handleOpen(key, keyPath) {
				//展开菜单
		    },
		    _handleClose(key, keyPath) {
				//关闭菜单
		    },
		  //隐藏menu
	      _showMenu(){
                this.isClose=!this.isClose;
		  },
		   //锁屏
			_lockScreen:function(){
					this.isLock=true;
					util.setCookie('systemLock','on',1);
			},
		  _resetLogin(){
			  	if(this.lockPassWord==''){
					  this.$message({ message: '请填写解锁密码！',type: 'warning'});
					  return;
				  }
				if(util.jsEncrypt(this.lockPassWord)===localStorage.getItem('access')){
						this.isLock=false;
						util.setCookie('systemLock','off',1);
				}else{
					this.$message({ message: '解锁密码输入有误！',type: 'warning'});
					  return;
				}
                
		  },
		  _initLock(){
			  if(util.getCookieValue('systemLock')=='on'){
				  this.isLock=true;
			  }
		  },
		  //注销登录
		  _loginout(){
		        this.$confirm('确认退出系统吗?', '提示', {
		          type: 'warning'
		        }).then(() => {
					//清空 localstorage、cookie
					util.clearAllCookie();
					util.clearLocalStorage();
		          this.$router.replace('/login');
		        }).catch(() => {
		        });
		  },
		  _loginCenter(){
			  this.$router.replace('/roleList');
		  },
		  _complete(){
			   //关闭窗口
			   this.moduleAccessFlag=false;
			   this.$router.replace('/home');
		  },
		  _onSubmit(){
			  //提交确认密码
			  if(util.jsEncrypt(this.accessFlag)===this.accessWords()){
				  util.setCookie('AccessFlag',this.accessWords(),0.1)
				  this.moduleAccessFlag=false;
			  }else{
				  this.$message({ message: '解锁密码输入有误！',type: 'warning'});
				  this.accessFlag='';
				  return 
			  }
		  },
		  checkModule(name){
			    let moduleArr=['模块配置','全局配置','报表配置','门户配置','数据选择框','模块审批配置','模块表对应信息','SQL语句配置','API授权管理'];
				let currentModule=moduleArr.filter(i=>{
					return name===i
				})
				if(currentModule.length>0){
					//检测是否有缓存
					let pwd=util.getCookieValue('AccessFlag');
					if(pwd!=this.accessWords()){
						this.moduleAccessFlag=true;
					}
				}
		  },
		  //获取菜单列表
		  _getMenu(){
			  this.menuLoading=true;
			  let params={};
			  this.appObj=JSON.parse(util.getCookie('appCode'));
			  document.title=this.appObj.appName;
			  params.appCode=this.appObj.appCode;
			  if(params.appCode===""){
				   this.$router.replace('/login');
			  }
			  var _this=this;
		 requestGetUserMenu(params).then(
				  data => {
						if(data.success){
							this.menuList=data.result.userMenu.items;
						} else {
						   //	
						}
						 this.menuLoading=false;
					}).catch(function (error) {
							 _this.menuLoading=false;
					});
		  },
		//    _requestGetMenuAppList(){
		// 			requestGetMenuAppList().then(data => {
		// 				//console.log(data.result)
		// 				let Arr=data.result;
		// 				 Arr.map(items=>{
		// 					 if(items.isDisplay){
		// 						this.menuAppList.push(items)
		// 					 };
		// 				 });
		// 			})
		// 	},
			_turnSystem(obj){
				util.setCookie('appCode',JSON.stringify(obj),1);
				this.$router.push({ path:'/home'});
				setTimeout(function() {
					window.location.reload();
				}, 100);
			},
			_turnRole(){
				//角色转化
				this.roleFormVisible=true;
			},
			_goEveryWhere(){
				//系统漫游
				this.goEveryWhereFormVisible=true;
			},
			_close(){
				this.roleFormVisible=false;
			},
			_closeM(){
				this.goEveryWhereFormVisible=false;
			},
			_selClose(){
				this.setIsVisible(false);
			},
			_fullScreen(){
				 if (!screenfull.enabled) {
						this.$message({
						message: 'you browser can not work',
						type: 'warning'
						})
						return false
					}
					screenfull.toggle()
							
			},
			_checkOldPwa(){
				if(this.pwaForm.oldpwa!=''){
					if(util.jsEncrypt(this.pwaForm.oldpwa)!==localStorage.getItem('access')){
						this.$message.warning('旧密码输入有误！');
					}
				}
			},
			_clearpwa(){
				this.pwaForm={
						oldpwa:'',
						newpwa:'',
						conformpwa:''
					}
			},
			_changePwa(){	
				if(this.pwaForm.oldpwa==''){
					this.$message.warning('原始密码不能为空！');
					return false
				}
				if(this.pwaForm.newpwa==''){
					this.$message.warning('新密码不能为空！');
					return false
				}
				if(this.pwaForm.newpwa!=''){
					if(this.pwaForm.newpwa!==this.pwaForm.conformpwa){
						this.$message.warning('密码确认不一样！请重新输入！');
						return false
					}
				}
				//判断原始密码
				let op=util.jsEncrypt(this.pwaForm.oldpwa);
				if(localStorage.getItem('access')!==op){
						this.$message.warning('输入原始密码有误，请重新输入！');
						this.pwaForm.oldpwa=''
						return false
				}
				let params={};
				params.id=this.getUserInfo().user.id;
				fetch({
					url:'api/services/app/user/GetUserForEdit',
					method:'post',
					data:params
				}).then(data=>{
					let para=data.result;
					para.user.password=util.jsEncrypt(this.pwaForm.newpwa)
					fetch({
						url:'api/services/app/user/CreateOrUpdateUser',
						method:'post',
						data:para
						}).then(data1=>{
							if(data1.success){
								this.$notify({
										title: '成功',
										message: '修改密码成功！',
										type: 'success'
										});
								//写入LocalStorage
								localStorage.setItem('access',util.jsEncrypt(this.pwaForm.newpwa));	
								this.isChangePwa=false;	
								
							}else{
								this.$notify.error({
										title: '错误',
										message: '修改密码失败！',
										});
							}
							this._clearpwa();
					})
				})
			},
			 ...mapActions(['setIsVisible',]),
      },
	  components:{
            TurnRole,
			GoEveryWhere,
			screenfull
        },
	mounted() {
		this._getMenu();
		//this._requestGetMenuAppList();
		this._initLock();
		this.checkModule(this.$route.name);
	},
	watch: {
		getIsVisible:function(val, oldVal){
          if(val){
            //处理
            this.selMaterialVisible=true;
			if(!this.selMaterialrender){this.selMaterialrender=true;}
          }else{
			  this.selMaterialVisible=false; 
		  }
		},
		$route:function(n,o){
			this.checkModule(n.name);
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.main
	background-color:#1F2D3D
	overflow:auto
	height:100%
	width:100%
	display:flex
	flex-direction:column
	.header
		height 55px
		width 100%
		display flex
		flex-direction row
		background-color #1f2d3d
		.left
			width 70%
			display flex
			flex-direction row
			padding-top 5px
			padding-left 20px
			display flex
			flex-direction row
			.logo
				height 45px
			.title
				font-size:22px
				font-family:SimSun
				color:#fdf5f5
				font-weight 500
				height:45px
				line-height :45px
				padding-left:10px
				text-shadow: 1px 1px 2px #eee;
		.right
			flex 1
			padding-right 10px
			ul	
				list-style:none
				display inline-block
				height  55px
				width 100%
				text-align right
				li 
					width:60px
					height:50px
					display: inline-block
					color: #B2B2B2
					text-align:center
					padding-top:5px
					.icon 
						font-size:22px
						line-height:25px
					span 
						display: block
						height: 15px
						padding-top:5px
						font-size:12px
				li:hover
					cursor:pointer
					color:#b6d06c
					background-color:#475669
	.content
		height:auto
		flex:1
		.left-wrapper
			position:absolute
			z-index:0
			top:55px
			left:0
			bottom:20px
			width:218px
			overflow:auto
			overflow-x: hidden;
			margin-left:8px
			background-color:#324057
			border:1px solid #525252
			border-radius:4px
			.el-menu-vertical
				height:100%
		.left-wrapper-close
			left:-220px
		.main-wrapper
			position:absolute
			z-index:0
			top:55px
			left:236px
			bottom:20px	
			right:12px
			background-color:#324057
			border:1px solid #525252
			border-radius:4px
			padding:8px
			.shrinkage
					position:absolute
					top:0px
					left:0px
					z-index:0
					width:6px
					height:100%
					cursor:pointer
					border-radius:2px
					background:url(../common/image/point.png) no-repeat center
					&:hover
						background: #525252 url(../common/image/point.png) no-repeat center
			.dynamicmodel
				height:100%
				overflow:auto
				.fade-enter-active,.fade-leave-active
					transition: opacity 0s
				.fade-enter,.fade-leave-active
					opacity: 0
		.main-wrapper-expend
			left:16px
	.foot
		height:20px
		line-height:20px
		font-size:12px
		color:#ddd
		padding:0px 12px 0px 8px
		.systeminfo
			float:left
			.icon:hover
				color:#B2B2B2
		.userinfo
			float:right
			.icon:hover
				color: #b6d06c
				
	.lock
		position:fixed
		left:0
		right:0
		top:0
		bottom:0
		width:100%
		height:100%
		z-index:1000
		background:#111
		opacity: 0.8
		.lockmain
			margin:auto
			margin-top:150px
			width:483px
			height:262px
			padding-top:150px
			background:url(../common/image/lock_bg.png) center center no-repeat
			.userimage
				margin:auto
				width:78px
				height:78px
				background:url(../common/image/lock_user.png) center center no-repeat
			.locktexet
				color:#fff
				font-size:16px
				text-align:center
				padding:8px
			.loginform
				text-align:center
				height:38px
				line-height:38px
				
</style>
