<!-- 登录页面 -->
<template>
  <div id="login">
    <div class="loginContent">
      <div class="loginWindow">
        <h1>茶叶溯源系统</h1>
        <el-form :model="loginForm" :rules="rules1" ref="loginForm" label-width="80px" class="demo-dynamic">
          <el-form-item prop="account" label="账号">
            <el-input v-model="loginForm.account"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- <a href="#/resetPassword">忘记密码？</a> -->
            <el-button class="forgetPsw" type="text" @click="getQuestion('loginForm')">忘记密码？</el-button>
            <el-dialog title="请回答问题" v-model="dialogFormVisible">
              <el-form :model="form" :rules="rules2" ref="form" label-width="60px" class="demo-dynamic">
                <!-- <el-form-item prop="account" label="账号" class="dialog">
                  <el-input v-model="form.account"></el-input>
                </el-form-item> -->
                <el-form-item prop="question" label="问题" class="dialog">
                  <el-select v-model="form.question" placeholder="请选择问题">
                    <el-option :label="form.question1" value="1"></el-option>
                    <el-option :label="form.question2" value="2"></el-option>
                    <el-option :label="form.question3" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="answer" label="答案" class="dialog">
                  <el-input v-model="form.answer"></el-input>
                </el-form-item>
                <el-form-item class="dialog"></el-form-item>
                <el-form-item class="dialog">
                  <el-button type="primary" @click="submitAnswer('form')">确 定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button type="primary" @click="jumpTo()">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../config'
  import axios from 'axios'
  import { Message } from 'element-ui'//信息提示框

  export default {
    data () {
      return {
        loginForm: {
          account:'',
          password:'',
        },
        rules1:{
          account:[{ required: true, message: '请输入用户账号', trigger: 'blur' }],
          // password:[{ required: true, message: '请输入密码', trigger: 'blur' }],
        },
        dialogFormVisible: false,
        form: {
          question:'',
          question1:'',
          question2:'',
          question3:'',
          answer:'',
        },
        rules2:{
          question:[{ required: true, message: '请选择您要回答的问题', trigger: 'blur' }],
          answer:[{ required: true, message: '请输入正确答案', trigger: 'blur' }],
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var querystring = require('querystring');//Json数据查询器
            let that = this
            axios.post(config.URL+'/user/loginByAccount',
                querystring.stringify({
                  account:this.loginForm.account,
                  password:this.loginForm.password,
                })
            )
                .then(function(res){
                  if(res.data.status == "success"){
                    // sessionStorage.setItem('tokennum',res.data[1].obj.tokennum);
                    sessionStorage.setItem('userID',res.data.obj.id);
                    sessionStorage.setItem('account',res.data.obj.account)
                    sessionStorage.setItem('create_time',res.data.obj.create_time)
                    sessionStorage.setItem('address',res.data.obj.address)
                    sessionStorage.setItem('email',res.data.obj.email)
                    sessionStorage.setItem('phone',res.data.obj.phone)
                    sessionStorage.setItem('type',res.data.obj.type)
                    sessionStorage.setItem('legal_person',res.data.obj.legal_person)
                    sessionStorage.setItem('sessionid',res.data.obj.sessionid)
                    sessionStorage.setItem('comeBack',that.$route.path)
                    if(res.data.obj.name!=null){
                      sessionStorage.setItem('userName',res.data.obj.name)
                    }else{
                      sessionStorage.setItem('userName','未知名');
                    }
                    that.$router.push({name: 'account', params:{account:sessionStorage.getItem('account')}});
                    // that.$router.push({path:'/userIndex'});
                  }else{
                    Message.error(res.data.msg)
                  }
                })
                .catch(function(error){
                  Message.error('账号不存在或者密码错误，也有可能是服务器的问题');
                });
          } else {
            console.log('提交错误!请保存您的信息！');
            return false;
          }
        })
      },
      getQuestion(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var querystring = require('querystring');//Json数据查询器
            let that = this
            axios.post(config.URL+'/userQuestion/getQuestions',
                querystring.stringify({
                  account:this.loginForm.account,
                })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
            )
                .then(function(res){
                  if(res.data.status == 'success'){
                    that.form.question1 = res.data.obj.question1;
                    that.form.question2 = res.data.obj.question2;
                    that.form.question3 = res.data.obj.question3;
                    sessionStorage.setItem('sessionid',res.data.obj.sessionid);
                    that.dialogFormVisible = true;
                  }else{
                    Message.error(res.data.msg);
                  }
                })
                .catch(function(error){
                  console.error(error);
                  Message.error(error.data.msg);
                });
          }else{
            Message.error('请先填写您的账号！');
            console.log('未能成功获取用户设置的问题!');
            return false;
          }
        });
      },
      submitAnswer(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var querystring = require('querystring');//Json数据查询器
            let that = this
            axios.post(config.URL+'/userQuestion/isCorrect?sessionid='+sessionStorage.getItem('sessionid'),
                querystring.stringify({
                  type: that.form.question,
                  answer: that.form.answer,
                })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
            )
                .then(function(res){
                  if(res.data.status == 'success'){
                    that.$router.push({path: '/resetPassword'});
                  }else{
                    Message.error(res.data.msg);
                  }
                })
                .catch(function(error){
                  console.error(error);
                  Message.error(error.data.msg);
                });
          }else{
            Message.error('请完成您的回答！');
            console.log('未能成功提交!');
            return false;
          }
        });
      },
      jumpTo() {
        this.$router.push({path: '/signUp'});
      },
    },
  }

</script>

<style scoped>
  #login{
    text-align: center;
    overflow: hidden !important;
    margin: 0 auto;
    width: 100%;
    min-height: 560px;
    position:absolute;
    top:10%;
    background-image: url(./../assets/login.jpg);
    background-repeat: no-repeat;
  }
  .loginContent{
    width: 450px;
    height: 500px;
    float: right;
    margin-right: 20%;
  }
  .loginWindow{
    width: 90%;
    height: 300px;
    background: rgba(255,255,255, 0.8);
    border-radius: 15px;
    margin-top: 50px;
    padding: 20px 70px 50px 50px;
    -ms-filter:progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 8 */
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 5.5 - 7 */
    -moz-box-shadow: -5px 0px 15px #D0D0D0,
    5px 0px 15px #D0D0D0;/* for firefox */
    -webkit-box-shadow: -5px 0px 15px #D0D0D0,
    5px 0px 15px #D0D0D0;/* for safari or chrome */
    box-shadow: -5px 0px 15px #D0D0D0,
    5px 0px 15px #D0D0D0;/* for opera or ie9 */
  }
  h1{
    color: #005D40;
    letter-spacing: 5px;
  }
  .el-form-item{
    margin-top: 25px;
  }
  .el-button{
    float: left;
    margin-left: 5%;
    margin-right: 8%;
    width: 100px;
  }
  .forgetPsw{
    float: right;
    text-decoration: none;
    color: #005D40;
  }
  .dialog{
    width: 45%;
    margin-left: 15px;
    margin-bottom: 35px;
    float: left;
  }
  .dialog .el-select{
    width: 75%;
    float: left;
  }
  .dialog .el-input{
    width: 75%;
    float: left;
  }
  .dialog .el-button{
    margin-bottom: 30px;
    float: right;
  }
</style>