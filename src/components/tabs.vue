<template>
  <div id="container">
    <!-- 标题 -->
    <div class="headline">
      <i class="el-icon-menu" style="padding:15px; color:#005D40;"></i>{{title}}
    </div>

    <!-- 标签页 -->
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" style="background-color: white;">
        <el-tab-pane v-for="tab of tabs" :label="tab.label" :name="tab.name">
          <tTable
                  :searchObj="tab.content.searchObj"
                  :pageObj="tab.content.pageObj"
                  :operateObj="tab.content.operateObj"
                  :tableObj="tab.content.tableObj"
                  :tabLabel="tab.label"
                  :active="activeName == tab.name">
          </tTable>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import tTable from './tTable'
  import tablesInfo from './../tablesInfo/main'
  //路由解析出对应路由下的table的信息，同时纠正错误的路由
  let getTableInfo = (to,from,vm)=>{


    let {func,subFunc,tab} = to.params;
    console.log(func,subFunc,tab);
    if(func && tablesInfo[func]){
      if(subFunc && tablesInfo[func][subFunc]){//subFunc是否存在
        let {func:func1,subFunc:subFunc1} = from.params;
        if(func==func1 && subFunc==subFunc1) {//说明在同一个subFunc下，即tab标签页之间的切换，无须重新触发跳转来获取table信息
          console.log('同一个tab下');
          return;
        }
        if(tab){//tab是否为空
          let hasTab = tablesInfo[func][subFunc].tabs.some(each=>each.name == tab);
          if(hasTab){//tab是否存在
            vm.title = tablesInfo[func][subFunc].title;
            vm.tabs = tablesInfo[func][subFunc].tabs;
            vm.activeName = tab;
          }else{//不存在，则强制跳转到/index/func/subFunc/这种格式的路由下
            vm.$router.push(`/index/${func}/${subFunc}/`);
          }
        }else {
          vm.title = tablesInfo[func][subFunc].title;
          vm.tabs = tablesInfo[func][subFunc].tabs;
          vm.activeName = vm.tabs[0].name;
        }

      }else{
        vm.$router.push('/index'+tablesInfo[func].mainURL);
      }
    }else{
      vm.$router.push('/login');
      console.log('/login');
    }

  };
  export default {
    name:'tabs',
    data() {
      return {
        title:'',
        activeName:'',
        tabs:[],
      };
    },
    components:{
      tTable:tTable
    },
    methods: {
      handleClick(tab, event) {
        let {func,subFunc} = this.$route.params;
        this.$router.push(`/index/${func}/${subFunc}/${tab.name}`);
      }
    },
    created(){
      let {tab} = this.$route.params;
      this.activeName = tab?this.tabs[0].name:tab;
    },
    beforeRouteEnter(to,from,next){
      next(getTableInfo.bind(null,to,from));
    },
    beforeRouteUpdate(to,from,next){
      getTableInfo(to,from,this);
      next();
        //      let tabData = tablesInfo[func][subFunc][tab];
//        vm.tabs = [];
//        for(let p in subFuncObj){
//          if(p != 'title')
//            vm.tabs.push(subFuncObj[p]);
//        }
//        console.log(subFuncObj);
//      next(fn.bind(this));
    }
  };
</script>
<style scoped>
  #container {
    min-height: 600px;
    text-align: left;
    background-color: white;
    /*margin-top: 10px;*/
    /*padding-left:5px;*/
    /*margin-left:10px;*/
  }
  /*#container>div{*/
    /*border-left:5px solid white;*/
  /*}*/
</style>