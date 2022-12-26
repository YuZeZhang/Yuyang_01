<template>
  <div>
  <div>
      <el-dropdown class="action" style="left: 0px;" @command="handleCommand">
          <el-button  style="background-color: white; color: black;">操作</el-button>
          <template #dropdown>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="enlarge">放大</el-dropdown-item>
                  <el-dropdown-item command="narrow">缩小</el-dropdown-item>
                  <el-dropdown-item command="center"> 居中显示</el-dropdown-item>
                  <el-dropdown-item command="selfadapt">自适应布局</el-dropdown-item>
              </el-dropdown-menu>
          </template>
      </el-dropdown>
  </div>
  <div class="common-layout">
      <el-container>
          <el-container style="display: flex;">
              <div  class="curr-contents_left" ref="outerDiv_left">
                <el-aside width="220px">
                  <div class="show-areas" v-show="openflags_left">
                    <!-- <div class="name">模型名称（可编辑）</div> -->
                    <!-- 组件列表 -->
                    <!-- <div class="component">
                        <p draggable="true"><i class="icon iconfont icon-sami-select">Bus</i></p>
                        <p><i class="icon iconfont icon-Batteryveryhigh">Battery</i></p>
                        <p><i class="icon iconfont icon-object-Photovoltaic-generator">Generator</i></p>
                        <p><i class="icon iconfont icon-falling">Load</i></p>
                        <p><i class="icon iconfont icon-object-Station-transformer">Transformer</i></p>
                    </div> -->
                    <Name></Name>
                  </div>
                  <div class="pack-ups_left" ref="packUps_left" @click="handlePack_left">
                    <i class="el-icon-arrow-right"></i>
                  </div>
              </el-aside>
              </div>
              <!-- 可视化区域 -->
              <el-main style="padding: 0; border:1px solid;height: 700px;" @dragover.prevent>
                  <div :style="{fontSize:size+'px'}" :class="{'active':isActive ,'adaptactive':isadaptActive}">
                      main
                  </div>
              </el-main>
             <div class="curr-contents_right" ref="outerDiv_right">
              <el-aside width="220px" style="margin-left: 2px;">
                <div class="pack-ups_right" ref="packUps_right" @click="handlePack_right">
                  <i class="el-icon-arrow-left"></i>
                </div>
                <div class="show-areas_right" v-show="openflags_right">
                  <Setting></Setting>
                </div>
              </el-aside>
             </div>
          </el-container>
          <el-footer style="height: 40px; padding: 0;" class="footer">
              <el-button @click="pictModel">图形</el-button>
              <el-button @click="formModel">表格</el-button>
          </el-footer>
      </el-container>
  </div>
</div>
</template>

<script>


import { ref, toRefs } from 'vue'
import Setting from '../components/Setting1.vue'
import Name from './moubanname.vue'
export default{
  name:"Desktop",
  data() {
    return {
      liConWidth_left:230, // 左边容器的宽度
      openflags_left:true,
      liConWidth_right:200, // 左边容器的宽度
      openflags_right:true,
    }
  },
  methods: {
      formModel(){
          this.$router.push('/model2')
      },
      pictModel(){
          this.$router.push('/desktop')
      },
      // 点击展开 折叠
      handlePack_left(){
        this.openflags_left=!this.openflags_left
        const liCon = this.$refs.outerDiv_left
        let packUps_left=this.$refs.packUps_left
        if (this.openflags_left) { // 展开
          // console.log(liCon.target);
          liCon.style.width = 'auto'
          liCon.style.width = this.liConWidth_left + 'px'
          packUps_left.style.position='absolute'
          packUps_left.style.left='auto'
          packUps_left.style.right='0'
        } else { // 收起
          liCon.style.width = 18 + 'px'
          packUps_left.style.position='absolute'
          packUps_left.style.right='auto'
          packUps_left.style.left='0'
        }
      },
      handlePack_right(){
      this.openflags_right=!this.openflags_right
      const liCon = this.$refs.outerDiv_right
      let packUps=this.$refs.packUps_right
      if (this.openflags_right) { // 展开
        liCon.style.width = 'auto'
        liCon.style.width = this.liConWidth_right + 'px'
        packUps.style.position='absolute'
        packUps.style.right='auto'
        packUps.style.left='0'
        // packUps.style.height='100'
      } else { // 收起
        liCon.style.width = 0 + 'px'
        packUps.style.position='absolute'
        packUps.style.left='auto'
        packUps.style.right='0'
        // packUps.style.height='700'+ 'px'
      }
    }
  },
  components: {
    Setting,
    Name
},
  // computed: {
  //     size: ref(15),
  //     isActive: ref(false),
  //     isadaptActive: ref(false)
  // },
  setup(){
      const size = ref(15)
      const enlarge = () => {
          size.value =size.value+5
          if (size.value>30){
              alert("尺寸超过上限")
              size.value=30
          }
          
      }
      const narrow=()=>{
          size.value=size.value-5
          
      }
      const isActive = ref(false)
      const isadaptActive=ref(false)
      const center=()=>{
         isActive.value=true
         isadaptActive.value=false
      }
      const selfadapt=()=>{
          isActive.value=false
          isadaptActive.value=true
      }
      function handleCommand(command) {
          switch(command){
              case 'enlarge':
                  enlarge()
                  break;
              case 'narrow':
                  narrow()
                  break;
              case 'center':
                  center()
                  break;
              case 'selfadapt':
                  selfadapt()
                  break;
          }
      }
      return{
          enlarge,
          narrow,
          size,
          center,
          isActive,
          selfadapt,
          isadaptActive,
          handleCommand
      }
  }

 
}
</script>

<style lang="less" scoped>
*{
  padding: 1px;
  margin: 0;
}
.el-container{
  overflow: hidden;
  position: relative;
}
.el-aside{
  // border: 1px solid;
}
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
.footer .el-button{
  width: 220px;
  color: black;
  // border: 1px solid;
}

.active{
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%,-50%);
}
.adaptactive{
  flex-grow: 1;
}
.curr-contents_left{
    width: 220px;
    position: relative;
    // background: lightpink;
    transition: all .5s ease-in-out;
    /* transition: height .3s; */
    left: 0;
  }
.curr-contents_left .pack-ups_left{
    height: 100%;
    // background: lightcyan;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .5s ease-in-out;
  }
.show-areas{
    transition: all .5s ease-in-out;
}
.curr-contents_right{
    width: 200px;
    position: relative;
    /* background: lightpink; */
    transition: all .5s ease-in-out;
    padding: 0 10px;
    /* transition: height .3s; */
  }
.pack-ups_right {
  height: 100%;
  position: absolute;
  right: 200px;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .5s ease-in-out;
}
</style>