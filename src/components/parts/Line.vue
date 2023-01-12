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
                                    <el-option label="True" value="TRUE" />
                                    <el-option label="False" value="FALSE" />
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
                      @click="summitData(scope.row)"
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
    data(){
      return{
        tableData:[],
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
            prop: "B2",
            label: "B2[p.u.]",
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
            prop: "length",
            label: "length[Km]",
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
                prop: "r",
                label: "r_fault[p.u.]",
                editable: false,
                type: "input"
            },
            {
                prop: "x",
                label: "x_fault[p.u.]",
                editable: false,
                type: "input"
            },
            {
                prop: "fault",
                label: "fault_pos[p.u.]",
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
        order:0,
        value:'',
        options:[
            {value:'name'},
            {value:'idtag'},
            {value:'code'},
            {value:'bus'},
            {value:'active'},
            {value:'is_controlled'},
            {value:'mttf'},
            {value:'mttr'},
        ]
      }
    },
    methods: {
      async getAndsendData(){
        let Data=[]
        this.tableData.forEach((item)=>{
          Data.push({'name':item.name,'bus_from':item.busfrom,'bus_to':item.busto,'active':item.active,
        'rate':item.rate,'mttf':item.mttf,'mttr':item.mttr,'R':item.R,'X':item.X,'G':'0','B':item.B,
        'tap_module':item.alpha,'angle':'0','is_transformer':item.monitor})
        })
        const { data: res} = await this.$http.post('http://127.0.0.1:5000/algorithm/pf-opf/branch',Data)
        if(res.success!==0){
        return this.$message.error('branch模块更新失败!')
      }
      // console.log(this.addmethodsForm)
      this.$message.success('branch模块更新成功!')
      },
      onAddItem(){
        this.tableData.push({
            name:'branch '+this.order,
            id:'',
            code:'nan',
            busfrom:'Bus '+this.order +' HV',
            busto:'Bus '+this.order +' HV',
            active:'TRUE',
            rate:'0.0',
            contingency:'1.0',
            contingency1:'TRUE',
            monitor:'TRUE',
            mttf:'0.0',
            mttr:'0.0',
            R:'0.0',
            X:'0.0',
            B:'0.0',
            R0:'1e-20',
            X0:'1e-20',
            B0:'1e-20',
            R2:'1e-20',
            X2:'1e-20',
            B2:'1e-20',
            tolerance:'0.0',
            length:'1.0',
            temp_base:'20.0',
            temp_oper:'20.0',
            alpha:'0.0033',
            cost:'0.0',
            r:'0.0',
            x:'0.0',
            fault:'0.5',
            template:'Branch Template',
            editable:false
            })
        this.order=this.order+1
        this.getAndsendData()
      },
      indexMethod(index){
        return index * 1
      },
      deleteRow(index){
        this.tableData.splice(index, 1)
        this.getAndsendData()
      },
      summitData(row){
        row.editable=false
        this.getAndsendData()
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