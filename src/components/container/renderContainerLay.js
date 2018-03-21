import fetch from 'api/fetch';
import util from 'common/js/util';
export default{
    
    data(){
        return {
        }
    },
    props: {
        options:{
            type:Array,
            default:function(){
                return []
            }
        },
    },
    methods:{
            renderItem(conf){
                    return conf.map((itemData,index)=>{
                        if(itemData.isLeaf){
                            //子节点
                            if(itemData.panelZone===undefined){
                            return  <el-col span={itemData.position.spanNum} style={itemData.style}>
                                        <yl-containercoms     
                                            option={itemData.option}
                                            outParams={itemData.outParams}
                                            on-init={this._initContainerComs}
                                        >
                                        </yl-containercoms>
                                    </el-col>
                            }else{
                                return <el-col span={itemData.position.spanNum} style={itemData.style}>
                                                <yl-panelpage 
                                                    titleName={itemData.panelZone.titleName} 
                                                    icon={itemData.panelZone.icon} 
                                                    fullScreenIsShow={itemData.panelZone.fullScreenIsShow}
                                                    helpIsShow={itemData.panelZone.helpIsShow}
                                                    isZone={itemData.panelZone.isZone}
                                                    reloadIsShow={itemData.panelZone.reloadIsShow} 
                                                    theme={itemData.panelZone.theme} 
                                                    heightNum={itemData.panelZone.heightNum} 
                                                    widthNum={itemData.panelZone.widthNum}
                                                    linkUrl={itemData.panelZone.linkUrl}
                                                >
                                                <div slot="content">
                                                    <yl-containercoms     
                                                        option={itemData.option}
                                                        outParams={itemData.outParams}
                                                        on-init={this._initContainerComs}
                                                    >
                                                    </yl-containercoms>
                                                </div>
                                            </yl-panelpage>
                                    </el-col>
                            }
                        }else{
                            return  <el-col span={itemData.position.spanNum} style={itemData.style}>
                                    {
                                        this.renderItem(itemData.childContent)
                                    }
                                    </el-col>
                        }
                        
                    })  
         },
         _initContainerComs(_coms){
            let _this=this,option=_coms.option;
            if(option.eventConf!=undefined){
                if(option.eventConf.isOn){
                    if(option.eventConf.init!=undefined){
                            option.eventConf.init(_this,option);
                    }
                }  
            }
        },
    },
    computed:{
        fetchObject:{
            get(){
                return fetch;
            }
                },
        utilObject:{
            get(){
                return util;
            }
        },
        globConf:{
                get(){
                    return util.getLocalStorage('SysGlobConf');
                }
            },
    },
    components:{
    },
    mounted(){
    },
    render: function(h){
        let conf=this.options;
        if(conf.length>0){
          return  <el-row>
                     { 
                          this.renderItem(conf)
                     }
                 </el-row>
        }
    }
}