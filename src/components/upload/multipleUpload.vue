<template>
            <el-upload  
                        :action="fileAction" 
                        :headers="headers"
                        :show-file-list="true"
                        :multiple="true"
                        :on-success="_onSuccess"
                        :on-remove="_removeFile"
                        :on-error="_onError"
                        :drag="drag"
                        :file-list="fileList"
                        :list-type="listType"
                        :before-upload="_beforeUpload"
                        style="width:100%;">
                        <el-button  :loading="loading" > <i class="icon-upload3"></i>上传文件</el-button>
            </el-upload>
</template>

 <script type="text/babel">
 import store from '../../vuex/store';
 import fetch from 'api/fetch';
export default {
    data(){
        return {
            loading:false,
            file:{},
            fileAction:'',
            headers:{Authorization:''},
        }
    },
    props:{
        allowFormat:{
            type:String,
            default:""
         },
        moduleName:{
            type:String,
            required: true,
            default:""
         },
        allowSize:{
            type:Number,
            default:1024*1024*10
         },
        action:{
            type:String,
            required: true,
            default:window.getClientObj().sysConf.url+"/api/upload/uploadFile",
         },
         drag:{
             type:Boolean,
             required:true,
             default:false,
         },
         listType:{
             type:String,
             required:true,
             default:'',
         },
         fileList:{
             type:Array,
             default:function(){
                 return []
             },
         }
    },
    computed:{

    },
    methods:{
        _removeFile(file, fileList){
                if(file.response!=undefined){
                        fetch({
                            url:window.getClientObj().sysConf.url+"/api/upload/DeleteFile?fileName="+file.response,
                            methods:"get"
                        }).then(
                            data=>{
                            if(data.success){
                                console.log('删除成功！');
                            }
                            }
                        ).catch(
                            err=>{
                                console.log(err);
                            }
                        )
                }
        },
        _beforeUpload(file){
            this.loading=true;
            //上传之前拦截
            const sizeOK = file.size < this.allowSize;
            let formatOK = true;
            if(this.allowFormat!=''){
                let Arr=file.name.split(".");
                let fileFormat=Arr[Arr.length-1].toUpperCase();
                if(this.allowFormat.toUpperCase().indexOf(fileFormat)<0){
                    formatOK=false;
                    this.$message({ message: '上传文件的格式有误！只能上传后缀为'+this.allowFormat+'的文件！',type: 'warning'});
                    this.loading=false;
                }
            }
            if(!sizeOK){
                 this.$message({ message: '上传的文件大小不能超过'+this.allowSize/1024/1024+'M！',type: 'warning'});
                 this.loading=false;
            }
            return sizeOK&&formatOK;
        },
        _onSuccess(response, file, fileList){
                this.file=file;
                this.$emit('change',fileList);
                this.loading=false;
        },
        _onError(err, file, fileList){
                this.$emit('change',fileList);
                 this.loading=false;
        }
    },
    mounted(){
        this.fileAction=this.action+"?moduleName="+this.moduleName;
        this.headers.Authorization=store.getters.getToken;
    },
    watch:{
    }
}
</script>
<style lang="css" rel="stylesheet/css" scoped>
</style>