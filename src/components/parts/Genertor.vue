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
            prop: "bus",
            label: "bus",
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
            prop: "iscontrolled",
            label: "is_controlled",
            editable: false,
            type: "select"
          },
          {
            prop: "p",
            label: "P[MW]",
            editable: false,
            type: "input"
          },
          {
            prop: "pf",
            label: "pf",
            editable: false,
            type: "input"
          },
          {
            prop: "vset",
            label: "Vset[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "snom",
            label: "Snom[MVA]",
            editable: false,
            type: "input"
          },
          {
            prop: "Qmin",
            label: "Qmin[MVAr]",
            editable: false,
            type: "input"
          },
          {
            prop: "Qmax",
            label: "Qmax[MVAr]",
            editable: false,
            type: "input"
          },
          {
            prop: "use",
            label: "use_reactive_power_curve",
            editable: false,
            type: "select"
          },
          {
            prop: "pmin",
            label: "Pmin[MW]",
            editable: false,
            type: "input"
          },
          {
            prop: "pmax",
            label: "Pmax[MW]",
            editable: false,
            type: "input"
          },
          {
            prop: "R1",
            label: "R1[p.u.]",
            editable: false,
            type: "input"
          },
          {
            prop: "X1",
            label: "X1[p.u.]",
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
                prop: "cost",
                label: "Cost[e/MWh]",
                editable: false,
                type: "input"
            },
            {
            prop: "enabled_dispatch",
            label: "enabled_dispatch",
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
                prop: "technology",
                label: "technology",
                editable: false,
                type: "input"
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
            {value:'is_controlled'},
            {value:'P[MW]'},
            {value:'pf'},
            {value:'Vset[p,u]'},
            {value:'Snom[MVA]'},
            {value:'Qmin[MVAr]'},
            {value:'Qmax[MVAr]'},
            {value:'use_reactive_power_curve'},
            {value:'Pmin[MW]'},
            {value:'Pmax[MW]'},
            {value:'R1[p.u]'},
            {value:'X1[p.u]'},
            {value:'R0[p.u]'},
            {value:'X0[p.u]'},
            {value:'R2[p.u]'},
            {value:'X2[p.u]'},
            {value:'mttf'},
            {value:'mttr'},
            {value:'Cost'},
            {value:'enabled_diapatch'},
            {value:'technology'},
        ]
        const onAddItem=()=>{
            tableData.value.push({
                name:'gen '+data.order,
                id:'',
                code:'nan',
                bus:'Bus '+data.order+' HV',
                active:'True',
                iscontrolled:'True',
                p:'0.0',
                pf:'0.8',
                vset:'1.0',
                snom:'9999.0',
                Qmin:'0.0',
                Qmax:'0.0',
                use:'False',
                pmin:'0.0',
                pmax:'9999.0',
                R1:'1e-20',
                X1:'1e-20',
                R0:'1e-20',
                X0:'1e-20',
                R2:'1e-20',
                X2:'1e-20',
                cost:'1.0',
                enabled_dispatch:'True',
                mttf:'0.0',
                mttr:'0.0',
                technology:'Combined cycle',
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