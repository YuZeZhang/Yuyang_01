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
                bus:'bus',
                active:'active',
                iscontrolled:'is_controlled',
                P:"P[MW]",
                pf:'pf',
                Vset:'Vset[p,u]',
                Snom:'Snom[MVA]',
                Enom:'Enom[MWh]',
                max:'max_soc[p.u]',
                min:'min_soc[p.u]',
                soc:'soc_0[p.u]',
                charge:'charge_efficiency[p.u]',
                discharge:'discharge_efficiency[p.u]',
                dis:'discharge_per_cycle[p.u]',
                Qmin:'Qmin[MVAr]',
                Qmax:'Qmax[MVAr]',
                Pmin:'Pmin[MW]',
                Pmax:'Pmax[MW]',
                R1:'R1[p.u]',
                X1:'X1[p.u]',
                R0:'R0[p.u]',
                X0:'X0[p.u]',
                R2:'R2[p.u]',
                X2:'X2[p.u]',
                Cost:'Cost[e/MWh]',
                enabled_dispatch:'enabled_dispatch',
                mttf:'mttf[h]',
                mttr:'mttr[h]',
            },
        })
        const value = ref('')
        const options=[
            {value:'name'},
            {value:'idtag'},
            {value:'code'},
            {value:'bus'},
            {value:'active'},
            {value:'is_controlled'},
            {value:'P[MW]'},
            {value:'pf'},
            {value:'Vset[p,u]'},
            {value:'Snom[MVA]'},
            {value:'Qmin[MVAr]'},
            {value:'Qmax[MVAr]'},
            {value:'reactive_power_c'},
            {value:'Pmin[MW]'},
            {value:'Pmax[MW]'},
            {value:'R1[p.u]'},
            {value:'X1[p.u]'},
            {value:'R0[p.u]'},
            {value:'X0[p.u]'},
            {value:'mttf'},
            {value:'mttr'},
            {value:'Cost'},
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