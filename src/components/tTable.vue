<template>
<div id="container">
  <div>
    <el-button @click="onSearch(true)" type="primary" class="searchButton" style="margin-left:0.5em;margin-right:1em;float:right;">{{searchObj.label}}</el-button>
    <el-input v-model="searchInput" @keydown.enter="onSearch(true)" :placeholder="searchObj.placeholder" class="searchInput" icon="search" style="width: 15em;float:right;">
    </el-input>
  </div>

  <!--表格-->
  <!--tableObj表格对象-->
  <div class="tableCon">
    <el-table :data="tData"
              style="width: 100%"
              border
              :fit="true"
              min-height="280"
              highlight-current-row
              :default-sort="{prop: 'order', order: 'ascending'}"
              @select="handleSelect"
              @select-all="handleSelectAll"
              v-loading="loading">
      <el-table-column
              fixed
              type="selection"
              width="50">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        v-for="head of tHeads"
        :label="head.label"
        :prop="head.prop"
        :sortable="head.sortable">
      </el-table-column>

      <el-table-column prop="operation" fixed="right" label="操作" width="120">
        <template scope="scope">
          <el-button
                  @click="onEdit(scope.row)"
                  v-if="tableObj.operate.update"
                  type="text" size="mini">
            {{tableObj.operate.update.label}}
          </el-button>
          <span>|</span>
          <el-button
                  @click="delConfirm(scope.row)"
                  v-if="tableObj.operate.deleteIt"
                  type="text"
                  :disabled="(scope.row.canBeDeleted!==undefined)&&(!scope.row.canBeDeleted)"
                  size="mini">
            {{tableObj.operate.deleteIt.label}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!--<el-dialog :title="dialogTitle1" v-model="dialogVisible1" @close="dialogClose1" style="width:80rem;">-->
    <!--<hr/>-->
    <!--<el-form :model="customerForm" :rules="rules1" label-position="right" label-width="150px" style="margin-top:2rem;" ref="customerForm">-->
      <!--<el-form-item label="客户类型" prop="type">-->
        <!--<el-select v-model="customerForm.type" placeholder="请选择客户类型">-->
          <!--&lt;!&ndash;1.批发商、2.大型商场、3.农贸市场、4.普通散户、5.专卖店、6.其他客户&ndash;&gt;-->
          <!--<el-option :label="type" :value="index+1" v-for="(type,index) of customerTypes"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="所属公司" prop="company">-->
        <!--<el-input v-model="customerForm.company" auto-complete="off"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="联系人" prop="contact">-->
        <!--<el-input v-model="customerForm.contact" auto-complete="off"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="联系电话" prop="phone">-->
        <!--<el-input v-model="customerForm.phone"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="传真" prop="fax">-->
        <!--<el-input v-model="customerForm.fax"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="地址" prop="address">-->
        <!--<el-input v-model="customerForm.address"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="等级" prop="grade">-->
        <!--<el-radio-group v-model="customerForm.grade">-->
          <!--<el-radio :label="index+1" v-for="(grade,index) in customerGrades">{{grade}}</el-radio>-->
        <!--</el-radio-group>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="备注" prop="remark">-->
        <!--<el-input type="textarea" v-model="customerForm.remark" auto-complete="off"></el-input>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer" style="margin:-2rem 14rem 0rem 0rem;">-->
      <!--<el-button type="primary" @click="submitForm1">确 定</el-button>-->
      <!--<el-button @click="dialogClose1">取 消</el-button>-->
    <!--</div>-->
  <!--</el-dialog>-->

  <!--分页-->
  <!--operateObj操作对象和pageObj分页对象-->
  <div class="block">
    <el-button @click="onBuild()" type="primary" v-if="operateObj.add" class="btnCon">{{operateObj.add.label}}</el-button>
    <el-button @click="onOutput()" type="primary" v-if="operateObj.exportIt" class="btnCon">
      {{operateObj.exportIt.label}}
      <!-- 导出功能的真正下载元素 -->
      <a id="outputLink" href="" download style="display:none;"></a>
    </el-button>
    <el-button @click="onLoading()" type="primary" v-if="operateObj.upload" class="btnCon">{{operateObj.upload.label}}</el-button>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="pageObj.sizes"
                   :page-size="pageSize"
                   :page-count="pageCount"
                   layout="sizes, prev, pager, next, jumper"
                   style="float:right;">
    </el-pagination>
  </div>

  </el-tab-pane>

  <el-dialog v-model="uploadDialogVisible" :title="uploadDialogTitle" @close="handleUploadClose">
    <el-upload  class="upload-area"
                ref="upload"
                :action="uploadURL"
                :show-file-list="true"
                drag
                name="excel"
                :multiple="false"
                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                :on-error="failedUpload"
                :on-success="successUpload"
                :auto-upload="true">
      <i class="el-icon-upload"></i>
      <div class="el-upload-text">将文件拖到此处，或<span>点击上传</span></div>
      <div class="el-upload-tip" slot="tip">只能上传Excel文件，该Excel表必须的列<span>严格依次</span>为：<br/><span>{{columnsTip}}</span></div>
    </el-upload>
  </el-dialog>
</div>
</template>
<script>
  import { Message } from 'element-ui';
  import config from '../config';
  import qs from 'querystring';
  import axios from 'axios';
  export default{
//    tabLabel:'',//对应table所在的el-tab-pane的label
//    active:true,//tab父组件通过active指定当前table是否active，亦指table所在el-tab-pane是否active
//
//    searchObj:{
//      placeholder:'',//搜索框的placeholder
//      label:'',//搜索按钮上的文字
//      suburl:''//搜索请求的子路径
//    },
//
//    pageObj:{
//      suburl:'',//向后台请求分页数据的子路径
//      sizes:[],//对应el-pagination组件的pageSizes属性
//    },
//
//    operateObj:{
//      add:{
//        label:'新建',//表格左下角的操作按钮上的文字
//        suburl:''//操作对应的请求的子路径
//      },
//      upload:{
//        label: '导入',//上传按钮的label
//        suburl: '',//后台接口子路径
//        dialogTitle:'导入客户信息',//上传dialog的title
//        dialogTip:'客户类型、所属公司、联系人、联系电话、传真、地址、等级、备注',//上传dialog的文字tips
//      },
//      exportIt:{
//        label: '导出',
//        suburl: customerURL + '/exportExcel',
//      }
//    },
//
//    tableObj:{
//      heads:[//el-table的表头信息
//        {
//          prop:'',//对应el-table-column的prop,
//          label:'',//对应el-table-column的label
//          sortable:true,//对应el-table-column的sortable
//          width:'20',//对应el-table-column的width
//        }
//      ],
//      operate:{
//        update:{
//          label:'编辑',//表格每行的操作按钮的label
//          suburl:'',//操作对应的后台接口子路径
//        },
//        deleteIt: {
//          label: '删除',
//          suburl: '',//后台接口子路径
//        }
//      },
//    },
    props:['searchObj','pageObj','operateObj','tableObj','tabLabel','active'],
    data(){
      return{
        tData:[],
        searchInput:'',
        selection:[],

        pageSize:5,
        currentPage:1,
        pageCount:1,

        uploadDialogTitle:'',
        uploadURL:'',
        columnsTip:'',
        uploadDialogVisible:false,

        outputLink:null,
        loading:false,
      }
    },
    computed:{
      tHeads(){
        return this.tableObj.heads;
      }
    },
    watch:{
      active(newVal){
        console.log('newVal',newVal);
        if(newVal && this.tData.length == 0 )
          this.getPage();
//        if(!newVal)
//          this.resetSelfData();
      },
      tHeads(newVal){
        this.resetSelfData();
        this.getPage();
      }
    },
    methods:{
      handleSelectAll(selection){
        let notDelNum = 0;
//      在数组遍历时会对数组进行删除元素操作，元素下标会随时变化，采用从后向前遍历的方式，可以避免下标变化带来的影响
        for(let i = selection.length-1; i >= 0; i--){
          if(!selection[i].canBeDeleted) {
            notDelNum++;
            selection.splice(i, 1);
          }
        }
        if(notDelNum>0){
          Message.warning(`其中${notDelNum}条${this.tabLabel}不能被删除`);
        }
        this.selection = selection;
      },
      handleSelect(selection,row){
        if(!row.canBeDeleted){
          let index = selection.indexOf(row);
          selection.splice(index,1);
          Message.error(`该条${this.tabLabel}不能被删除！`);
        }
        else
          this.selection = selection;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        // 似乎改动currentPage会调用handleCurrentChange()函数，但currentPage是1时，currentPage=1不触发handleCurrentChange()函数，要额外调用
        this.currentPage == 1 ? this.handleCurrentChange(1):(this.currentPage = 1);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.searchInput === ''?this.getPage():this.onSearch();
        console.log(`当前页：${val}`);
        // this.multipleSelection = val;
      },
      onSearch(bool) {
        let that = this;
        if(bool){
          that.handleCurrentChange(1);
        }else{
          that.loading = true;
          axios.post(config.URL + this.searchObj.suburl + '?sessionid=' + sessionStorage.getItem('sessionid'),
              qs.stringify({
                page: that.currentPage,
                pageSize: that.pageSize,
                content: that.searchInput
              })
          ).then((res)=>{
            that.tData = [];
            that.$handleRes(res)
          }).catch((error) => {
            that.loading = false;
            Message.error(error.message);
          })
        }
      },
      getPage() {
        let that = this;
        that.loading = true;
        axios.post(config.URL + that.pageObj.suburl + '?page=' +
            that.currentPage + '&pageSize=' + that.pageSize + '&sessionid=' + sessionStorage.getItem('sessionid')
        ).then(
            that.$handleRes
        ).catch(function(error) {
          that.loading = false;
          Message.error(error.message);
        })
      },
      $handleRes(res) {
        let data = res.data;
        this.loading = false;
        if (data.status == 'fail') {
          Message.warning(data.msg);
          return;
        }
        let itemsArr = data.obj;
        this.pageCount = data.page.totalPages;
        if (itemsArr != null) {
          this.tData = itemsArr;
        }
      },
      //      对话框表单相关方法，新建和编辑
      onEdit(row) {
        let form = this.customerForm;
        for (let p in row) {
          if (p in form) {
            form[p] = row[p];
          }
        }
        form['type'] = this.customerTypes.indexOf(row['type']) + 1;
        form['grade'] = this.customerGrades.indexOf(row['grade']) + 1;
        this.dialogTitle1 = '编辑客户信息';
        this.dialogMethod1 = 'update';
        this.dialogVisible1 = true;
      },
      onBuild() {
        this.dialogTitle1 = '新建客户信息';
        this.dialogMethod1 = 'add';
        this.dialogVisible1 = true;
      },
      submitForm() {
        let that = this;
        this.$refs['customerForm'].validate((valid) => {
          if (valid) {
            axios.post(config.URL + `/saleInforCustomer/${that.dialogMethod1}?sessionid=` + sessionStorage.getItem('sessionid'),
                queryStr.stringify(that.customerForm)
            ).then((res) => {
              let data = res.data;
              if (data.status == 'fail') {
                Message.error(data.msg);
              } else {
                Message.success(data.msg);
                this.getPage();
              }
            }).catch((error) => {
              console.log(error);
              Message.error(error.message);
            })
            that.dialogVisible1 = false;
          }
        })
      },
      dialogClose() {
        this.dialogVisible1 = false;
        this.$refs['customerForm'].resetFields();
        for (let p in this.customerForm)
          this.customerForm[p] = undefined;
        this.dialogMethod1 = '';
        this.dialogTitle1 = '';
      },


      //删除提醒
      delConfirm(row) {
        console.log('row',row);
        let that = this;
        let num, delItems;
        if(that.selection.length > 0){
          num = that.selection.length;
          delItems = that.selection;
        }else{
          num = 1;
          delItems = [row];
        }
        this.$confirm(`将永久删除这 ${num} 条信息, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (var item of delItems) {
            that.deleteTd( this.tableObj.operate.deleteIt.suburl, item, that.tData );
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteTd(subURL, delItem, items) {
        axios.post(`${config.URL}${subURL}?sessionid=${sessionStorage.getItem('sessionid')}`,
            qs.stringify({
              ids: delItem.id
            })
        ).then((res) => {
          let data = res.data;
          if (data.status == 'fail') {
            Message.error(data.msg);
          } else {
            Message.success(data.msg);
            let index = items.indexOf(delItem);
            items.splice(index, 1);
          }
        }).catch((error) => {
          Message.error(error.message);
        })
      },

      onLoading() {
        this.uploadDialogTitle = this.operateObj.upload.dialogTitle;
        this.uploadURL = config.URL + this.operateObj.upload.suburl +'?sessionid='+sessionStorage.getItem('sessionid');
        this.columnsTip = this.operateObj.upload.dialogTip;
        this.uploadDialogVisible = true;
      },
      onOutput() {
        let link = this.outputLink || (this.outputLink = document.getElementById('outputLink'));
        link.setAttribute('href',config.URL + this.operateObj.exportIt.suburl+'?sessionid='+sessionStorage.getItem('sessionid'));
        let clickEv = new MouseEvent('click');
        link.dispatchEvent(clickEv);
        clickEv = null;
      },
      // 上传/导入的相关方法
      successUpload(res,file,fileList){
        if(res.status === 'success'){
          Message.success(res.msg);
          this.uploadDialogVisible = false;
          this.currentPage = 1;
        }
        else{
          this.$refs['upload'].clearFiles();
          Message.error(res.msg);
        }
      },
      handleUploadClose(){
        console.log('close upload');
        this.$refs['upload'].clearFiles();
      },
      failedUpload(err,file,filelist){
        console.log(err);
      },
      resetSelfData(){
        this.tData = [];
        this.selection = [];
        this.searchInput = '';
        this.pageSize = 5;
        this.currentPage = 1;
        this.pageCount = 1;
        this.loading = false;
      }
    },

  }
</script>
<style scoped>
  #container {
    min-height: 600px;
    text-align: left;
    background-color: white;
    padding: 10px 25px;
  }
  .searchInput {
    width: 8em;
    float: left;
    margin-left: 1em;
  }
  .btnCon {
    float: left;
    /*margin-top: 0.5em;*/
  }
  .tableCon {
    position: relative;
    top: 1em;
  }
  .block {
    margin-top: 2em;
    /*float: right;*/
  }
  .upload-area{
    text-align: center;
  }
  .el-upload-text{
    color:gray;
  }
  .el-upload-text>span{
    color: #20a0ff;
  }
  .el-upload-tip{
    color:gray;
    font-size: 13px;
  }
  .el-upload-tip>span{
    color: rgb(250,0,0);
  }
</style>