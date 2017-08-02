<template>
  <div id="account">
    <!-- 标题 -->
    <div class="headline">
      <img src="./../assets/home1.png" width="30px" height="30px" align="top">
      <h3>首页</h3>
    </div>
    <!-- 首页内容——用户信息 -->
    <div class="userInfo">
      <div class="userLogo"><img src="./../assets/home1.png" height="100%" width="100%;"></div>
      <p><b>{{ userName }}</b>，您好！
        <el-button type="text" @click="gotoSetQues()" v-show="remind">您尚未设置问题，请前往设置问题，以便忘记密码时可进行信息验证</el-button></p>
      <p>用户类型：{{ type }}</p>
      <p>注册时间：{{ createTime }}</p>
    </div>
    <!-- 首页内容——网站介绍 -->
    <div class="webIntro">
      此处填充网站介绍
    </div>
  </div>
</template>

<script>
  import config from './../config'
  import axios from 'axios'
  import { Message } from 'element-ui'//信息提示框

  export default {
    data () {
      return {
        userName:'',
        type:'',
        createTime:'',
        remind:'',
      }
    },

    methods: {
      Logined(){
        if(sessionStorage.getItem('account')!=null){
          this.userName=sessionStorage.getItem('userName');
          this.createTime=sessionStorage.getItem('create_time');
          if(sessionStorage.getItem('type')==1){
            this.type='生产商'
          }else if(sessionStorage.getItem('type')==2){
            this.type='加工厂家'
          }else if(sessionStorage.getItem('type')==3){
            this.type='物流公司'
          }else if(sessionStorage.getItem('type')==4){
            this.type='销售商'
          }else if(sessionStorage.getItem('type')==5){
            this.type='监管部门'
          }else{
            this.type='未知'
          }
          var querystring = require('querystring');//Json数据查询器
          let that = this
          axios.post(config.URL+'/userQuestion/getQuestions',
              querystring.stringify({
                account: sessionStorage.getItem('account'),
              })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
          )
              .then(function(res){
                if(res.data.status == 'success'){
                  that.remind = false;
                }else{
                  that.remind = true;
                }
              });
        }else{
          alert("您尚未登录！");
          this.$router.push({path: '/login'});
        }
      },
      gotoSetQues(){
        this.$router.push({name: 'setQuestions', params:{account: sessionStorage.getItem('account')}});
      },
    },
    created(){
      this.Logined();
    }
  }

</script>

<style scoped>
  #account{
    height: 100%;
    width: 100%;
    /*border: 1px solid red;*/
    /*margin-left: 180px;*/
    /*padding: 20px 20px 20px 0px;*/

  }
  .headline{
    padding: 5px 0px 5px 10px;

    border-bottom: 1px solid #188E7F;
  }
  .headline h3{
    display: inline-block;
    margin-top: 5px;
    color: #585858;
  }
  .userInfo{
    padding: 25px 25px;
    border-bottom: 1px solid #188E7F;
  }
  .userLogo{
    border: 1px solid gray;
    width: 95px;
    height: 95px;
    float: left;
    margin: -14px 25px 0px 0px;
  }
  .userInfo p b{
    color: #188E7F;
    letter-spacing: 2px;
    font-size: 1.3em;
  }
  .webIntro{
    text-align: center;
    /*width: 1000px;*/
    height: 400px;
    margin: 30px auto;
    border: 1px dashed gray;
    font-size: 2em;
    color: gray;
    line-height: 400px;
  }
  .el-button{
    color: #188E7F;
    padding-bottom: 0px;
  }
</style>