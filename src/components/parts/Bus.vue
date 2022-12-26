<template>
    <div class="demo">
        <!-- 表头功能 -->
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
        <!-- 表格表单 -->
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
                    @click="scope.row.editable=true"
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
import { computed, ref, toRefs, reactive } from 'vue'
// import { ElTable } from 'element-plus'
export default{
    name:'bus',
    setup(){
        const tableData=ref([])
        const keywords = ref('')
        const data=reactive({
            keywords:'',
            
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
            type: "data"
          },
          {
            prop: "active",
            label: "active",
            editable: false,
            type: "select"
          },
          {
            prop: "isslack",
            label: "is_slack",
            editable: false,
            type: "select"
          },
          {
            prop: "isdc",
            label: "is_dc",
            editable: false,
            type: "select"
          },
          {
            prop: "vnom",
            label: "Vnom[Kv]",
            editable: false,
            type: "input"
          },
          {
            prop: "vm0",
            label: "Vm0[p.u]",
            editable: false,
            type: "input"
          },
          {
            prop: "vmin",
            label: "Vmin[p.u]",
            editable: false,
            type: "input"
          },
          {
            prop: "vmax",
            label: "Vmax[p.u]",
            editable: false,
            type: "input"
          },
          {
            prop: "va0",
            label: "Va0[rad.]",
            editable: false,
            type: "input"
          },
          {
            prop: "anglemin",
            label: "angle_min[rad.]",
            editable: false,
            type: "input"
          },
          {
            prop: "anglemax",
            label: "angle_max[rad.]",
            editable: false,
            type: "input"
          },
          {
            prop: "rfault",
            label: "r_fault[p.u]",
            editable: false,
            type: "input"
          },
          {
            prop: "xfault",
            label: "x_fault[p.u]",
            editable: false,
            type: "input"
          },
          {
            prop: "x",
            label: "x[px]",
            editable: false,
            type: "input"
          },
          {
            prop: "y",
            label: "y[px]",
            editable: false,
            type: "input"
          },
          {
            prop: "h",
            label: "h[px]",
            editable: false,
            type: "input"
          },
          {
            prop: "w",
            label: "w[px]",
            editable: false,
            type: "input"
          },
          {
            prop: "country",
            label: "country",
            editable: false,
            type: "input"
          },
          {
            prop: "area",
            label: "area",
            editable: false,
            type: "input"
          },
          {
            prop: "zone",
            label: "zone",
            editable: false,
            type: "input"
          },
          {
            prop: "sub",
            label: "substation",
            editable: false,
            type: "input"
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
            ],
        })
        const indexMethod = (index) => {
            return index * 1
        }
        const value = ref('')
        const options=[
            {value:'name'},
            {value:'idtag'},
            {value:'code'},
            {value:'active'},
            {value:'is_slack'},
            {value:'is_dc'},
            {value:'Vnom'},
            {value:'Vm0'},
            {value:'Vmin'},
            {value:'Vmax'},
            {value:'Va0'},
            {value:'angle_min'},
            {value:'angle_max'},
            {value:'r_fault'},
            {value:'x_fault'},
            {value:'x'},
            {value:'y'},
            {value:'h'},
            {value:'w'},
            {value:'country'},
            {value:'area'},
            {value:'zone'},
            {value:'substation'},
            {value:'longitude'},
        ]
        const onAddItem=()=>{
            tableData.value.push({
                name:'Bus 1',
                id: '',
                code:'',
                active:'True',
                isslack:'False',
                isdc:'False',
                vnom:'10',
                vm0:'1',
                vmin:'0.9',
                vmax:'1.1',
                va0:'0',
                anglemin:'-6.28',
                anglemax:'6.28',
                rfault:'0.0',
                xfault:'0.0',
                x:'0',
                y:'0',
                h:'0',
                w:'0',
                count:'Default country',
                area:'Default area',
                zone:'Default zone',
                sub:'Default substation',
                long:'0.0',
                lati:'0.0',
                editable:false
            })
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
            keywords,
            deleteRow,
        }
    }
}
</script>


<style lang="less" scoped>
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
    // border-color: black;
}
.table{
    font-size: 1px;
    height: 760px;
}
.el-table .cell{
    padding:0;
}
</style>