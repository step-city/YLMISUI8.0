## 容器组件

> 业务组件包含具体的业务逻辑，根据具体的业务场景使用。


## 数据选择框配置

> 数据选择框主要提供数据过滤和向制定模块插入数据功能，配置主要包含：基本信息配置、api配置、过滤器配置、表信息配置、功能信息配置

  数据选择框配置和模块配置再各项配置上结构相似，一次在文档中不会详细说明，只列出具体的配置结构和说明。

## 基本信息配置

配置说明：包含弹出层的Dialog配置和布局配置

```json
 {
  "baseInfo": {  //基本信息
     "dialogConf": { //弹出层配置
      "size": "small", //弹框大小
      "top": "10%",   //距上部位置
      "title": "常用材料选材框",  //选材框名称
      "modalAppendToBody": false,  
      "closeOnClickModal": false, 
      "afterAddClose": true,//是否每次选择数据后关闭dialog
      "style":"height:450px",
      "dataType":0  //选材框类型 
    },
    "layout": {   //布局参考模块配置
     "columnlay": {  
        "hiddenLeft": false, 
        "upToolFilter": {
          "visiable": true
        },
        "downToolFilter": {
          "visiable": false
        },
        "toolFunction": {
          "visiable": true
        }
      }
    }
  }
}
```

### API配置

配置说明：数据选择框所用到的API

```json
{
  "apiConf": {
    "getMainPageList": {
      "url": "/api/services/app/gHConfig/getMainPageList",
      "method": "post",
      "data": {}
    },
  }
}
```

注意： 所有的选材框内部调用方法名统一为`getMainPageList`,如果与俱来的方法名称不符合，配置时请采用`getMainPageList`更换配置中的路径和参数。

### 过滤器配置

配置说明：过滤器配置和模块配置的过滤器相同，参照模块配置

### 表信息配置

配置说明：表信息配置和模块配置相同，参照模块配置，只包含

### 功能信息配置

通常情况下，数据选择框的功能按钮包含 查询、选中确认功能；

#### 查询按钮

一般用于重新触发数据过滤，不需要额外操作，直接调用`_this._reload();`即可；

#### 选中确认按钮

一般用于对选中的数据进行处理，在click中提供了`_this._getSelectRows();`,该方法一般要求和tableEdit控件搭配使用。
如果是数据选中框单独使用，则需要在click事件中自定义逻辑实现需求，其中`_this.selectRows`可以获取到选中数据集；

---