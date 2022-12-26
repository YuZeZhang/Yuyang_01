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
                <el-aside width="220px" style="border: 0;">
                    <div class="name">模型名称（可编辑）</div>
                    <!-- 组件列表 -->
                    <div class="component">
                        <p draggable="true"><i class="icon iconfont icon-sami-select">Bus</i></p>
                        <p><i class="icon iconfont icon-Batteryveryhigh">Battery</i></p>
                        <p><i class="icon iconfont icon-object-Photovoltaic-generator">Generator</i></p>
                        <p><i class="icon iconfont icon-falling">Load</i></p>
                        <p><i class="icon iconfont icon-object-Station-transformer">Transformer</i></p>
                    </div>
                    <div class="pack-ups" ref="packUps" @click="handlePack">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </el-aside>
                <!-- 可视化区域 -->
                <el-main style="padding: 0; border:1px solid;flex: 1;" @dragover.prevent>
                    <div :style="{fontSize:size+'px'}" :class="{'active':isActive ,'adaptactive':isadaptActive}">
                        main
                    </div>
                </el-main>
                <el-aside width="220px" style="margin-left: 2px;"><Setting></Setting></el-aside>
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
import Setting from '../components/Setting.vue'
export default{
    name:"Desktop",
    methods: {
        formModel(){
            this.$router.push('/model2')
        },
        pictModel(){
            this.$router.push('/desktop')
        },
    },
    components: {
        Setting
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
    text-align: center;
    background-color:rgb(78, 147, 217);
    padding: 10px 20px;
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
</style>