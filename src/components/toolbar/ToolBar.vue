<template>
<div class="toolbar" v-if="isShow"> 
    <slot>
    </slot>
</div>
</template>

<script type="text/babel">
export default {
    data(){
		return {
            isShow:true,
		}
    },
    mounted(){
        // let dom=this.$children[0].$el;
        // if(dom.className=='el-button-group'){
        //     this.isShow=!(dom.clientHeight===0);
        // }
        
    },
    watch:{
        
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .toolbar
        background: url(../../common/image/search_bg.png);
        padding-left: 10px
        height: 34px
        display: flex
        align-items: center
</style>
