<template>
    <renderContainerLay
        :options="options.content"
		:outParams="outParams"
    >
    </renderContainerLay>	
</template>

<script type="text/babel">
import fetch from 'api/fetch';
import util from 'common/js/util';
import renderContainerLay from './renderContainerLay'
export default {
	data(){
		return {
			
		}
	},
	props:{
		options:{
			type:Object,
			default:function(){
				return {}
			}
		},
		outParams:{
                require:true,
                type:Object,
                default:function(){
                        return {
                        }
                }
            }
	},
	methods:{
	},
	mounted(){
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
