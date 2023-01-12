<template>
    <div>
        <!-- 表头功能 -->
    <div class="demo">
        <div class="header">
            <el-select v-model="value" placeholder="">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :value="item.value"
                    :disabled="item.disabled"
                />
            </el-select>
            <el-input placeholder="请输入目标名称"  class="search" v-model="keywords">
                <template #append>
                    <el-button><el-icon><Search /></el-icon></el-button>
                </template>
            </el-input>
            <el-button @click="onAddItem" type="primary">添加</el-button>
            <el-button type="primary">导出</el-button>
        </div>
    </div>
    <!-- 表格内容 -->
    <div class="context">
            <el-table 
            :data="tableData" border 
            style="width: 100%;" 
            class="table"
            height="700"
            >
                <el-table-column
                    :prop="index"
                    :label="item"
                    v-for="(item, index) in tableHeader"
                    :key="index"
                >
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>


<script>

import { onMounted, ref, toRefs, reactive } from 'vue'
// import { ElTable } from 'element-plus'
export default{
    name:"Area",
    setup(){
        const tableData=ref([])
        const data=reactive({
            tableHeader: {
                name: "name",
                id:'idtag',
                code:'code',
                bus1:'bus1',
                bus2:'bus2',
                bus3:'bus3',
                active:'active',
                v1:'V1[KV]',
                v2:'V2[KV]',
                v3:'V3[KV]'

            },
        })
        const value = ref('')
        const options=[
            {value:'name'},
            {value:'idtag'},
            {value:'code'},
            {value:'bus1'},
            {value:'bus2'},
            {value:'bus3'},
            {value:'active'},
            {value:'V1[KV]'},
            {value:'V2[KV]'},
            {value:'V3[KV]'},
        ]
        const onAddItem=()=>{
            alert("This object does not support table-like additon. use the schematic instead")
        }
        return {
            ...toRefs(data),
            tableData,
            onAddItem,
            options,
            value,
        }
    }
}
</script>


<style>
.header .el-select{
    width:100px;
}
.header{
    float: left;
    white-space: nowrap;
}
.header .search{
    width: 200px;
    margin-right: 485px;
}
.header .el-button{
    border-color: black;
}
.el-table{
    font-size: 1px;
    height: 450px;
}
.el-table .cell{
    padding:0;
}
</style>