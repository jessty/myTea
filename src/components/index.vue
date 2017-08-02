<template>
  <div id="index">
    <el-row>
      <el-col :span="24">
        <tHeader></tHeader>
      </el-col>
    </el-row>
    <el-row :gitter="5">
      <el-col :sm="4" :lg="3" class="navWrapper">
        <tNav class="nav"></tNav>
      </el-col>
      <el-col :sm="20" :lg="21" class="contentWrapper">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import tHeader from './tHeader';
  import tNav from './tNav';
  export default {
    name: 'index',
    components:{
      tHeader:tHeader,
      tNav:tNav
    }
  }
</script>

<style>
  #index {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }
  .nav{
    width:100% !important;
  }
  .navWrapper{
    overflow: hidden;
  }
  .contentWrapper{
    padding: 15px;
  }
</style>