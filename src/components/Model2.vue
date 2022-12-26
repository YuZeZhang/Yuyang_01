<template>
    <div>
        <div>
        <!-- <Action></Action> -->
    </div>
    <div class="common-layout">
        <el-container>
            <el-container>
                <el-aside width="220px" style="border: 0;">
                    <div class="name">模型名称（可编辑）</div>
                    <div class="component">
                        <el-menu class="el-menu-vertical-demo" router active-text-color="rgb(78, 147, 217)">
                            <el-menu-item index="/bus">Bus</el-menu-item>
                            <el-menu-item index="/load">Load</el-menu-item>
                            <el-menu-item index="/static">Static Generator</el-menu-item>
                            <el-menu-item index="/grid">External grid</el-menu-item>
                            <el-menu-item index="/generator">Generator</el-menu-item>
                            <el-menu-item index="/battery">Battery</el-menu-item>
                            <el-menu-item index="/shunt">Shunt</el-menu-item>
                            <el-menu-item index="/line">Line</el-menu-item>
                            <el-menu-item index="/dc">DC line</el-menu-item>
                            <el-menu-item index="/tran">Transformer</el-menu-item>
                            <el-menu-item index="/trans">Transformer 3W</el-menu-item>
                            <el-menu-item index="/hcl">HVDC Line</el-menu-item>
                            <el-menu-item index="/vsc">VSC</el-menu-item>
                            <el-menu-item index="/upfc">UPFC</el-menu-item>
                            <el-menu-item index="/sub">Substation</el-menu-item>
                            <el-menu-item index="/zone">Zone</el-menu-item>
                            <el-menu-item index="/area">Area</el-menu-item>
                            <el-menu-item index="/country">Country</el-menu-item>
                        </el-menu>
                    </div>
                </el-aside>
                <el-main style="padding: 0;">
                    <div><router-view></router-view></div>
                </el-main>
                <el-aside width="220px" style="margin-left: 2px;">
                <Setting></Setting>
                </el-aside>
            </el-container>
            <el-footer style="height: 40px; padding: 0;" class="footer">
                <el-button @click="pictModel">图形</el-button>
                <el-button>表格</el-button>
            </el-footer>
        </el-container>
  </div>
    </div>
</template>

<script>

import { ref } from 'vue'
// import Action from './Action.vue'
import Setting from '../components/Setting.vue'

export default{
    name:'model2',
    methods: {
        pictModel(){
            this.$router.push('/desktop')
        }
    },
    components:{
        Setting,
    }
}
</script>


<style lang="less" scoped>
.component {
    // border: 2px solid;
    .el-menu-vertical-demo{
    .el-menu-item {
        height: 40px;
        line-height: 40px;
        // border: 2px solid;
        color: black;
    }
    .el-menu-item:hover{
        // background-color:rgb(204, 204, 204);
        background-color:rgb(78, 147, 217);
        color:white;
    }
}
}

.name{
    background-color:rgb(78, 147, 217);
    padding: 10px 20px;
}
</style>