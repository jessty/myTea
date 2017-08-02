<!-- 头部导航 -->
<template>
  <div id="navigation">
    <!-- logo -->
    <div>
      <img src="">
    </div>

    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">


      <el-menu-item class="word" index="4" @click="logout()">
        <img src="./../assets/exit.png" width="25px" height="25px">
        退出
      </el-menu-item>

      <router-link class="word" to="/help">
        <el-menu-item index="3">
          <img src="./../assets/help.png" width="25px" height="25px">
          帮助
        </el-menu-item>
      </router-link>

      <router-link class="word" :to="{name:'modify', params:{account: this.account}}">
        <el-menu-item index="2">
          <img src="./../assets/user.png" width="25px" height="25px">
          {{userName}}
        </el-menu-item>
      </router-link>

      <router-link class="word" :to="{name:'account', params:{account: this.account}}">
        <el-menu-item index="1">
          <img src="./../assets/home.png" width="25px" height="25px">
          首页
        </el-menu-item>
      </router-link>

    </el-menu>
  </div>

</template>

<script>
  import config from '../config'
  import axios from 'axios'
  import { Message } from 'element-ui'//信息提示框
  import qs from 'querystring';
  export default {
    name:'tHeader',
    data () {
      return {
        userName:'star',
        account:'',
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      Logined(){
        if(sessionStorage.getItem('account')!=null){
          this.userName=sessionStorage.getItem('userName');
          this.account=sessionStorage.getItem('account');
        }
      },
      logout(){
        var qs = require('querystring');//Json数据查询器
        let that = this
        axios.post(config.URL+'/user/logout?sessionid='+sessionStorage.getItem('sessionid'),
            qs.stringify({

            })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
        )
            .then(function(res){
              if(res.data.status == 'success'){
                Message.success('成功退出');
//              that.$router.push({path: '/login'})
//              sessionStorage.setItem('sessionid',undefined);
              }else{
//              console.error(res.data.msg);
                Message.error('注销失败！');

              }
            })
            .catch(function(error){
//            console.error(error);
              Message.error(error.data.msg);
            });
//        that.$router.push({path: '/login'});
        sessionStorage.clear();
      },
      // LoginOut(){
      //   let that = this
      //   sessionStorage.removeItem('account');
      // sessionStorage.removeItem('tokennum');
      // localStorage.removeItem('create_time');
      // localStorage.removeItem('headPhoto');
      // localStorage.removeItem('isRealName');
      // localStorage.removeItem('userID');
      // localStorage.removeItem('userName');
      // },
    },
    created(){
      this.Logined();
    }
  }

</script>

<style scoped>
  #navigation{
    width: 100%;
    background-color: #22C8B2;
    -ms-filter:progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 8 */
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 5.5 - 7 */
    -moz-box-shadow: 0px 3px 5px #199787;/* for firefox */
    -webkit-box-shadow: 0px 3px 5px #199787;/* for safari or chrome */
    box-shadow: 0px 3px 5px #199787;/* for opera or ie9 */
  }

  .word{
    text-decoration: none;
  }

  .el-menu{
    width: 1210px;
    margin: 0 auto;
    background-color:  #22C8B2;
    font-weight: bold;
  }

  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
    color: #FFFFFF;

  }
  .el-menu-item.is-active:hover{
    color: #22C8B2;
  }
  .el-menu--horizontal .el-menu-item{
    color: #FFFFFF;
    padding-top: 10px;
    float: right;
    height: 72px;
    line-height: 58px;
    margin: 0;
    cursor: pointer;
    font-size: 16px ;
    position: relative;
    box-sizing: border-box;
    border-bottom: 5px solid transparent;
  }
  .el-menu--horizontal .el-menu-item:hover{
    color: #22C8B2;
    border-bottom: 5px solid #188E7F;
  }
</style>
