<template>
  <div>
    <div class="name">模型名称（可编辑）</div>
<!-- 组件列表 -->
<div class="component">
    <p draggable="true"><i class="icon iconfont icon-sami-select">Bus</i></p>
    <p><i class="icon iconfont icon-Batteryveryhigh">Battery</i></p>
    <p><i class="icon iconfont icon-object-Photovoltaic-generator">Generator</i></p>
    <p><i class="icon iconfont icon-falling">Load</i></p>
    <p><i class="icon iconfont icon-object-Station-transformer">Transformer</i></p>
</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.name{
  // border: 1px solid;
  height: 25px;
  width: 210px;
  text-align: center;
  background-color:rgb(78, 147, 217);
  // padding: 10px 20px;
}
.component{
  // border:1px solid;
  height:464px;
  margin-top: 1px;
}
</style>