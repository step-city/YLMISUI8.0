
<template>
<div>
	<div class="row">
		<div class="col-xs-12">
				<input type="file" class="form-control" id="file"  @change="_change" />
		</div>
	</div>
		<div class="row"><div class="col-xs-12">
			<button  class="btn btn-success" @click="_export">导出</button>
		</div>
	</div>
	
</div>
</template>

<script>
import xlsx from 'common/js/js-xlsx.js';
//import execl from 'common/js/execl.js';
export default {
	data() {
		return {
			data: [],
			exportData:[
				"SheetJS".split(""), "1234567".split("")
			],
			SheetJSFT:{}
	    };     
	},
	methods: {
		_change(evt) {
			const files = evt.target.files;
			if(files && files[0]){
				xlsx.importToJsonData(files[0],(data)=>{
					this.data=data;
				});
			}
		},
		_export(){
			//exceljs.exportForExecl(this.exportData)
			let Str=`
			<table style=\"border: 1px solid black;\">
				<tr>
					<td align=\"center\"  colspan=\"14\" height=\"40\"> <span style=\"font-size: 20px;\"><b><u>&nbsp;&nbsp;&nbsp;&nbsp; 钢筋需用计划&nbsp;&nbsp;&nbsp;&nbsp;</u></b></span></td>
				</tr>
				<tr>
					<td nowrap colspan=\"3\"> 计划单位:</td>
					<td nowrap colspan=\"5\" align=\"left\">计划日期:</td>
					</td><td nowrap align=\"left\" colspan=\"6\">设计编号：</td>
				</tr>
			</table>
			`;
			execlhelper.exportHtmlToExcel(Str,{withDate:false});
		}
	},
	mounted(){
	}
};
</script>