<!--  -->
<template>
  <!-- 一定要有一个div -->
  <div id="sidebar">
    <el-menu
            default-active=""
            :default-openeds="[0]"
            :unique-opened="true"
            theme="dark">
      <el-submenu
              v-for="(mainItem,mainIndex) in mainItems"
              :index="mainIndex+''">
        <template slot="title">
          <i class="el-icon-menu"></i>{{mainItem}}
        </template>
        <el-menu-item
                v-for="(subItem,subIndex) in subItems[mainIndex]"
                :index="mainIndex+'-'+subIndex">
          <router-link
                  :to="routeTo[mainIndex][subIndex]"
                  class="link-div">
            {{subItem}}
          </router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'tNav',
    data () {
      return {
        mainItems: ['种 植 管 理', '采 收 管 理', '加 工 管 理', '物 流 管 理', '销 售 管 理'],
        subItems: [
          ['基础信息管理', '种植批次管理', '种植检测管理', '农事管理', '施肥管理', '病虫害管理', '生产计划管理'],
          ['采收批次管理', '采收检测管理', '外购批次管理'],
          ['加工批次管理', '基础信息管理', '出库单管理'],
          ['物流批次管理', '基础信息管理'],
          ['基础信息管理', '入库管理', '销售订单管理', '销售商品库'],
        ],
        routeTo: [
          /*种植管理*/  ['/index/plant/info', '/index/plant/batch', '/index/plant/detect', '/index/plant/farm', '/index/plant/fertilize', '/index/plant/insect', '/index/plant/plan'],
          /*采收管理*/  ['/index/harvest/batch', '/index/harvest/detect', '/index/harvest/outBuyBatch'],
          /*加工管理*/  ['/index/machining/batch', '/index/machining/info', '/index/machining/outgo'],
          /*物流管理*/  ['/index/logistics/batch', '/index/logistics/info'],
          /*销售管理*/  ['/index/sale/info', '/index/sale/ingo', '/index/sale/outgo', '/index/sale/store']
        ]
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

  #sidebar {
    float: left;
    height: 800px;
    width: 180px;
    background-color: #152631;
  }

  .link-div {
    display: inline-block;
    width: 100%;
    padding: inherit;
    margin-left: -40px;
    text-decoration: none;
    color: #bfcbd9;
  }
</style>
