<template>
         <div class="camera">
            <object :id="configs.id" 
                    :width="configs.i_Col2" 
                    height="180" 
                    classid="clsid:A3FC6E0D-1B70-4338-B506-4F96779996CC"  
                    codebase="activex/IPCamera.cab">
            </object>
         <div class="title">{{configs.v_Col8}}</div>  
  </div>
</template>

<script type="text/babel">
import util from 'common/js/util'
export default {
   data(){
        return{
            status:'E99',
        }
   },
   props:{
       configs:{},
       desCode:{
           type:String,
           default:''
       }
   },
   methods:{
       _cameraInit(){
            console.log('初始化摄像头')
            //IP摄像头IP、端口和账号
            let initConf=this.configs;
            let code=util.base64Decrypt(this.desCode); 
            this.status=this.IPCamera.init(initConf.v_Col9,initConf.i_Col1,initConf.v_Col10,initConf.v_Col11,code);
            //this.status=this.IPCamera.init("192.168.20.91", 8000, "admin", "a1234567", "041062");
            if(this.status!="E00"){
                 this.$message.error('['+this.configs.v_Col8+']摄像头初始化失败！');
            }
            this.IPCamera.setSize(this.configs.i_Col2,180);
       },
       getImginfo(){
            if(this.status=="E00"){
                let result={};
                result.info=this.configs;
                result.Base64=this.IPCamera.snap();
                //result.Base64=this.IPCamera.GetImgDataByBase64();
                //处理字符
                //result.Base64=result.Base64.substring(0,result.Base64.indexOf('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'));
                return result;
            }else{
                    this.$message.error('['+this.configs.v_Col8+']摄像头抓怕异常！');
                    let result={};
                    result.info=this.configs;
                    result.Base64='';
                    return result;
            }
       }
   },
   computed: {
        IPCamera:{
            get(){
                return document.getElementById(this.configs.id);
            }
        }
    },
   components:{
   },
   mounted(){
       this._cameraInit();
   },
   beforeDestroy() {
        console.log('正在销毁摄像机连接')
        this.IPCamera.destroy();
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" rel="stylesheet/css" scoped>
.title {background-color: #333;width:100%;height:20px;color:aliceblue;font-size:12px;line-height:20px;padding-left:5px;}
</style>
