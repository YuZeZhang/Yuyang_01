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
                busfrom:'bus_from',
                busto:'bus_to',
                active:'active',
                rate:'rate[MVA]',
                contingency:'contingency_factor[p.u]',
                contingencye:'contingency_enabled[p.u]',
                monitor:'monitor_loading',
                mttf:'mttf[h]',
                mttr:'mttr[h]',
                R1:'R1[p.u]',
                x1:'X1[p.u]',
                R0:'R0[p.u]',
                X0:'X0[p.u]',
                R2:'R2[p.u]',
                X2:'X2[p.u]',
                G0sw:'G0sw[p.u]',
                Beq:'Beq[p.u]',
                Beqmin:'Beq_min[p.u]',
                Beqmax:'Beq_max[p.u]',
                m:'m',
                mmax:'m_max',
                mmin:'m_min',
                theta:'theta[rad]',
                thetamax:'theta_max[rad]',
                thetamin:'theta_min[rad]',
                alpha1:'alpha1',
                alpha2:'alpha2',
                alpha3:'alpha3',
                k:'k[p.u/p.u.]',
                control:'control_mode',
                kdp:'kdp[p.u./p.u.]',
                pdc:'Pdc_set[MVAr]',
                Qac_set:'Qac_set[MVAr]',
                Vac_set:'Vac_set[p.u.]',
                Cost:'Cost[e/MWh]'
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
            {value:'mttf'},
            {value:'mttr'},
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