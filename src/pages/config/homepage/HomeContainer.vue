<template>
	 <yl-panelpage v-if="type===1"
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
			type:0,
		}
	},
	props:{
		homePageConf:{
			type:Object,
			default:function(){
				return {}
			}
		}
	},
	methods:{
		_init(){
			this.type=this.homePageConf.homeType;
			this.linkToPage();
		},
		linkToPage(){
			if(this.type===0){	
				this.$router.push({ path:this.homePageConf.modulePage.routerUrl});
			}
		}
	},
	mounted(){
		this._init();
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
