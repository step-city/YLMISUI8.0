<template>
	 <yl-panelpage v-if="isRender"
		:titleName="homePageConf.configPage.panelpage.titleName" 
		:icon="homePageConf.configPage.panelpage.icon"
		:fullScreenIsShow="homePageConf.configPage.panelpage.fullScreenIsShow"
		:helpIsShow="homePageConf.configPage.panelpage.helpIsShow"
		>
		<div slot="content">
			<renderContainerLay
				:options="homePageConf.configPage.content"
			>
			</renderContainerLay>		
		</div>
	</yl-panelpage>
</template>

<script type="text/babel">
import fetch from 'api/fetch';
import util from 'common/js/util';
import renderContainerLay from 'components/container/renderContainerLay'
export default {
	data(){
		return {
			isRender:false,
			homePageConf:{}
		}
	},
	props:{
	},
	computed:{
                VersionNum:{
                    get(){
                        return util.getLocalStorage('SysGlobConf').versionNum;
                    }
                }
              },
	methods:{
        init(){
            	this.isRender=false;
				let moduleCode=this.$route.params.tableName;
				let inputArr=[
					{dataField:"RoleId", op:'EQ', dataValue:this.guidOfNull()},
					{dataField:"VersionNum", op:'EQ', dataValue:this.VersionNum},
					{dataField:"IsEnable", op:'EQ', dataValue:1}
					],params={};
                params.queryConditionItem=inputArr;
                fetch({
                     url: '/api/services/app/homePageConf/getMainObjectForEdit',
                     method: 'post',
                     data: params
                }).then((data)=>{
                      if(data.success){
						  if(data.result.order!=null){
								this.homePageConf=JSON.parse(data.result.order.homePageConf,util.dealFunction);
								this.isRender=true;
							}else{
								this.$router.push({ path:'/pages/Page404'});
							}
                      } 
                      else {
                          this.$message.error('失败！'+data.error.message);
                      }
                });
        },
	},
	mounted(){
		this.init();
    },
	components:{
		renderContainerLay
	},
	watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>