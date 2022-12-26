<template>
  <div>
    <div>
      <el-row><el-button>name</el-button><el-button>导出</el-button><el-button>样式设置</el-button>
     <el-input
    placeholder="查询框">
    </el-input>
    </el-row>
    </div>
    <div class="common-layout">
      <el-container>
        <el-container>
          <el-aside width="220px" style="border: 0;height: 50vh;">  <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-caret-bottom"></i>Power Flow</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">Bus voltage module</el-menu-item>
          <el-menu-item index="1-2">Bus voltage angle</el-menu-item>
          <el-menu-item index="1-3">Bus active power</el-menu-item>
          <el-menu-item index="1-22">Bus reactive power</el-menu-item>
          <el-menu-item index="1-4">Branch active power "from"</el-menu-item>
          <el-menu-item index="1-5">Branch reactive power "from"</el-menu-item>
          <el-menu-item index="1-6">Branch active power "to"</el-menu-item>
          <el-menu-item index="1-7">Branch reactive power "to"</el-menu-item>
          <el-menu-item index="1-8">Branch active current "from"</el-menu-item>
          <el-menu-item index="1-9">Branch reactive current "from"</el-menu-item>
          <el-menu-item index="1-10">Branch active current "to"</el-menu-item>
          <el-menu-item index="1-11">Branch reactive current "to"</el-menu-item>
          <el-menu-item index="1-12">Branch tap module</el-menu-item>
          <el-menu-item index="1-13">Branch tap angle</el-menu-item>
          <el-menu-item index="1-14">Branch Bep</el-menu-item>
          <el-menu-item index="1-15">Branch loading</el-menu-item>
          <el-menu-item index="1-16">Transfer tap module</el-menu-item>
          <el-menu-item index="1-17">Branch active losses</el-menu-item>
          <el-menu-item index="1-18">Branch reactive losses</el-menu-item>
          <el-menu-item index="1-19">Branch voltage drop</el-menu-item>
          <el-menu-item index="1-20">Branch voltage angles</el-menu-item>
          <el-menu-item index="1-21">HVDC losses</el-menu-item>
          <el-menu-item index="1-21">HVDC power "from"</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-caret-bottom"></i>Opyimal power flow</template>
      </el-submenu>
          </el-menu>
        </el-aside>
          <el-main  style="padding: 0; border:1px solid;"><el-table>
      </el-table></el-main>
          <el-aside width="220px" style="margin-left: 2px;"><Setting></Setting></el-aside>
        </el-container>
        <el-footer><el-button  plain>图形</el-button>
        <el-button plain>表格</el-button></el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
import Setting from './Setting.vue'
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components:{
      Setting
    }
  }
 

</script>

<style lang="less" scoped>
.el-container{
    overflow: hidden;
    position: relative;
}
</style>