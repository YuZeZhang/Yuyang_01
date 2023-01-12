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
                            <template v-if="item.type === 'select'">
                                <el-select 
                                size="small"
                                v-model="scope.row[item.prop]"
                                :placeholder="`请输入${item.label}`"
                                @change="handleEdit(scope.$index, scope.row)">
                                    <el-option label="True" value="True" />
                                    <el-option label="False" value="False" />
                                </el-select>
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
                      <el-button type="danger" size="small" @click.prevent="deleteRow(scope.$index,scope.row)">删除</el-button>
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
    name:"Area",
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
            prop: "code",
            label: "code",
            editable: false,
            type: "input"
          },
          {
            prop: "busfrom",
            label: "bus_from",
            editable: false,
            type: "input"
          },
          {
            prop: "busto",
            label: "bus_to",
            editable: false,
            type: "input"
          },
          {
            prop: "active",
            label: "active",
            editable: false,
            type: "select"
          },
          {
            prop: "hv",
            label: "HV[kv]",
            editable: false,
            type: "input"
          },
          {
            prop: "lv",
            label: "LV[kv]",
            editable: false,
            type: "input"
          },
          {
            prop: "rate",
            label: "rate[MVA]",
            editable: false,
            type: "input"
          },
          {
            prop: "contingency",
            label: "contingency_fator[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "contingency1",
            label: "contingency_enabled",
            editable: false,
            type: "select"
          },
          {
            prop: "monitor",
            label: "monitor_loading",
            editable: false,
            type: "select"
          },
          {
                prop: "mttf",
                label: "mttf[h]",
                editable: false,
                type: "input"
            },
            {
                prop: "mttr",
                label: "mttr[h]",
                editable: false,
                type: "input"
            },
            {
            prop: "R",
            label: "R[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "X",
            label: "X[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "G",
            label: "G[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "B",
            label: "B[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "R0",
            label: "R0[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "X0",
            label: "X0[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "G0",
            label: "G0[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "B0",
            label: "B0[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "R2",
            label: "R2[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "X2",
            label: "X2[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "G2",
            label: "G2[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "B2",
            label: "B2[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "conn",
            label: "conn",
            editable: false,
            type: "input"
          },
          {
            prop: "tolerance",
            label: "tolerance[%]",
            editable: false,
            type: "input"
          },
          {
            prop: "tap",
            label: "tap_module",
            editable: false,
            type: "input"
          },
          {
            prop: "tapmax",
            label: "tap_module_max",
            editable: false,
            type: "input"
          },
          {
            prop: "tapmin",
            label: "tap_module_min",
            editable: false,
            type: "input"
          },
          {
            prop: "angle",
            label: "angle[rad]",
            editable: false,
            type: "input"
          },
          {
            prop: "anglemax",
            label: "angle_max[rad]",
            editable: false,
            type: "input"
          },
          {
            prop: "anglemin",
            label: "angle_min[rad]",
            editable: false,
            type: "input"
          },
          {
            prop: "control",
            label: "control_mode",
            editable: false,
            type: "input"
          },
          {
                prop: "vset",
                label: "vset[p.u.]",
                editable: false,
                type: "input"
            },
            {
                prop: "pset",
                label: "Pset[p.u.]",
                editable: false,
                type: "input"
            },
          {
            prop: "temp_base",
            label: "temp_base[℃]",
            editable: false,
            type: "input"
          },
          {
            prop: "temp_oper",
            label: "temp_oper[℃]",
            editable: false,
            type: "input"
          },
          {
            prop:'alpha',
            label: "alpha[1/℃]",
            editable: false,
            type: "input"
          },
          {
                prop: "cost",
                label: "Cost[e/MWh]",
                editable: false,
                type: "input"
            },
            {
                prop: "template",
                label: "template",
                editable: false,
                type: "data"
            },
            ],
            order:0
        })
        const value = ref('')
        const options=[
            {value:'name'},
            {value:'idtag'},
            {value:'code'},
            {value:'bus'},
            {value:'active'},
            {value:'mttf'},
            {value:'mttr'},
            {value:'Cost'},
        ]
        const onAddItem=()=>{
            tableData.value.push({
                name:'branch '+data.order,
                id:'',
                code:'nan',
                busfrom:'Bus '+data.order +' HV',
                busto:'Bus '+data.order +' HV',
                active:'True',
                hv:'0.0',
                lv:'0.0',
                rate:'0.0',
                contingency:'1.0',
                contingency1:'True',
                monitor:'True',
                mttf:'0.0',
                mttr:'0.0',
                R:'0.0',
                X:'0.0',
                G:'1e-20',
                B:'0.0',
                R0:'1e-20',
                X0:'1e-20',
                G0:'1e-20',
                B0:'1e-20',
                R2:'1e-20',
                X2:'1e-20',
                G2:'1e-20',
                B2:'1e-20',
                conn:'GG',
                tap:'0.0',
                tolerance:'0.0',
                tapmax:'1.2',
                tapmin:'0.5',
                angle:'0.0',
                anglemax:'6.28',
                anglemin:'-6.28',
                control:'0:Fixed',
                vset:'1.0',
                pset:'0.0',
                temp_base:'20.0',
                temp_oper:'20.0',
                alpha:'0.0033',
                cost:'0.0',
                template:'None',
                editable:false
            })
            data.order=data.order+1
        }
        const indexMethod = (index) => {
            return index * 1
        }
        const deleteRow = (index) => {
            tableData.value.splice(index, 1)
        }
        return {
            ...toRefs(data),
            tableData,
            onAddItem,
            options,
            value,
            indexMethod,
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