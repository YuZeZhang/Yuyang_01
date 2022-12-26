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
                    <el-button @click="searchList"><el-icon><Search /></el-icon></el-button>
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
            >
                <el-table-column  type="index" :index="indexMethod" fixed="left" />
                <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-for="(item, index) in tableHeader"
                    :key="item.prop"
                >
                <template #default="scope">
                        <div
                        v-show="item.editable || scope.row.editable"
                        class="editable-row"
                        >
                            <template v-if="item.type === 'input'">
                                <el-input
                                size="small"
                                v-model="scope.row[item.prop]"
                                :placeholder="`请输入${item.label}`"
                                @change="handleEdit(scope.$index, scope.row)"
                                />
                            </template>
                        </div>
                        <div
                        v-show="!item.editable && !scope.row.editable"
                        class="editable-row"
                        >
                            <span class="editable-row-span">{{ scope.row[item.prop] }}</span>
                        </div>
                    </template> 
                </el-table-column>
                <el-table-column fixed="right" label="Operations" width="160">
                <template #default="scope">
                    <el-button type="primary" size="small" 
                    @click="scope.row.editable = true"
                    v-show="!scope.row.editable"
                    >编辑</el-button>
                    <el-button
                    v-show="scope.row.editable"
                    size="small"
                    type="success"
                    @click="scope.row.editable = false"
                    >确定</el-button>
                        <el-button type="danger" size="small" @click.prevent="deleteRow(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>


<script>

import { onMounted, ref, toRefs, reactive } from 'vue'
// import { ElTable } from 'element-plus'
export default{
    name:"Substation",
    setup(){
        const tableData=ref([])
        const data=reactive({
            tableHeader: [
                {
                    prop: "name",
                    label: "name",
                    editable: false,
                    type: "input",
                },
                {
                    prop: "id",
                    label: "idtag",
                    editable: false,
                    type: "data"
                },
                {
                    prop: "long",
                    label: "longitude[deg]",
                    editable: false,
                    type: "input"
                },
                {
                    prop: "lati",
                    label: "latitude[deg]",
                    editable: false,
                    type: "input"
                }
            ]
        })
        const indexMethod = (index) => {
            return index * 1
        }
        const value = ref('')
        const options=[
            {value:'name'},
            {value:'idtag'},
            {value:'longitude'},
            {value:'latitude'},
        ]
        const onAddItem=()=>{
            tableData.value.push({
                name:'Default',
                id: '',
                long:'0.0',
                lati:'0.0',
                editable:false
            })
        }
        const deleteRow = (index) => {
            tableData.value.splice(index, 1)
        }
        const searchList=()=>{}
        return {
            ...toRefs(data),
            tableData,
            onAddItem,
            options,
            value,
            indexMethod,
            searchList,
            deleteRow
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