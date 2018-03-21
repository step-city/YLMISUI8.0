
<template>
<div class="panel">
    <div class="header">
        <div class="left">
			    <div class="logowrapper">
					<img class="logo" src="../common/image/zgztlogo.png"  />
				</div>
				<div class="title">{{systemTitleName}}</div>
		</div>
		<div class="right">
			<ul>
			    <li @click="_loginout"><i class="icon-switch2  icon"></i><span>注销登录</span></li>
			</ul>
			
		</div> 
    </div>
    <div class="body">
        <div class="userInfo">
            <div class="username row">
                <span>当前用户：</span>{{userInfo.user.realName}}
            </div>
            <div class="OrgList row">
                <span>权限范围：</span>
                <el-select  v-model="formModel.orgId"  
                        placeholder="请选择权限范围" 
                        style="width:230px">
                    <el-option
                        v-for="item in userInfo.userDataRanges"
                        :key="item.id"
                        :label="item.text"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="RoleList row">
                <span>用户角色：</span>
                <el-select  
                            v-model="formModel.roleId"  
                            placeholder="请选择角色" 
                            style="width:230px"
                            size=""
                            @change="_roleChange"
                            >
                    <el-option
                        v-for="item in userInfo.userRoles"
                        :key="item.id"
                        :label="item.text"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
           
        </div>
       <hr/>
        <div class="systemList">
            <div class="sysBlock" v-for="item in systemList" :key="item.id"
                    @click="_goSystem(item)"
            >
                    <i :class="item.appIcon"></i>
                    <span>{{item.appName}}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/babel">
import util from 'common/js/util.js';
import fetch from 'api/fetch.js';
import {
    requestUpdateCurrentUserInfo,
    requestGetCurrentLoginInformations
}from 'api/login';
export default {
    data(){
        return{
                systemTitleName:window.getClientObj().sysConf.titleName,
                formModel:{
                    roleId:'',
                    orgId:'',
                },
                systemList:[]
            }   
    },
    computed:{
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
    methods:{
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
         _roleChange(node){
             let params={
                        procType: 0, 
                        firstKeys: "RoleId", 
                        firstValues: node,
                        secondKeys: "", 
                        secondOperates: "", 
                        secondValues: "",
                        procName: "Sys_GetMenuAppByRole" 
                        
                    }
             this.commonSqlExcute(params).then(
                 data=>{
                     this.systemList=data.items[0];
                 }
             )
          },
          _goSystem(item){
              document.title=item.appName;
              util.setCookie('appCode',JSON.stringify(item),1);
               let params={};
                    params=this.formModel;
                    requestUpdateCurrentUserInfo(params).then(data=>{
                         if(data.success){
                            requestGetCurrentLoginInformations().then( 
                                        data=>{
                                            if(data.success){
                                                // this.getUserInfo(data.result);
                                                util.setCookie('userInfo',JSON.stringify(data.result),1);
                                                this.$router.push({ path:'/home'});
                                            }
                                })
                         }
                         else {
                             this.$message.error('失败！'+data.error.message);
                         }
                    }).catch(function(error){
                    })
             
          },
    },
    mounted(){
        this.formModel.roleId=this.userInfo.user.roleId;
        this.formModel.orgId=this.userInfo.user.manageOrgId;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .panel
        display flex
        width 100%
        height 100%
        flex-direction column
        .header
            height 55px
            width 100%
            display flex
            flex-direction row
            background-color #1f2d3d
            box-shadow 0 2px 0 grey
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
                        height:52px
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
        .body
            flex 1
            display flex
            flex-direction column
            padding 20px
            .userInfo
                background-color #fff
                border 2px dotted #ddd
                border-radius 4px
                height 120px
                font-size:13px
                padding 10px
                .row
                    height 40px
                    line-height 35px
            .systemList
                background-color #fff
                border 1px dashed #ddd
                flex 1
                padding 10px
                display flex
                .sysBlock
                    width 200px
                    height 80px
                    margin-right 15px
                    border 2px solid  #eee
                    border-radius 4px
                    background #20A0FF
                    color #fff
                    font-size:18px
                    text-align center
                    line-height 80px
                    box-shadow 2px 2px 0px #eee
                .sysBlock:hover 
                    background #58B7FF
                    border 1px solid #eee
                    cursor Pointer
</style>