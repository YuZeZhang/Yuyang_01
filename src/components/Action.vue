<template>
    <div>
        <el-dropdown class="action">
            <el-button  style="background-color: white; color: black; border-color: black;">操作</el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item >放大</el-dropdown-item>
                    <el-dropdown-item >缩小</el-dropdown-item>
                    <el-dropdown-item>居中显示</el-dropdown-item>
                    <el-dropdown-item>自适应布局</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script>

import { ref } from 'vue'

export default{
    name:"Action",
}
</script>

<style>
</style>