<template>
  <div >
    <div  class="Setting_form">
      <el-form ref="Setting_form" :model="Setting_form" label-width="80px" label-position="top">
      <el-form-item>
        项目名称(可编辑):
        <div class="static"><el-input v-model="Setting_form.name" clearable></el-input></div>
      </el-form-item>
      <el-form-item>
        项目描述(可编辑):
        <div class="static">
          <el-input v-model="Setting_form.description" clearable  type="textarea" :rows="2" placeholder="请输入描述内容"></el-input>
        </div>
      </el-form-item>
    </el-form>
    <div style="font-size:14px;">
      数据源(不可编辑)：
      <div class="static"><el-tag>{{dataSourceValue}}</el-tag></div>
    </div>
    <div style="font-size:14px">
      数据处理(不可编辑)：
      <div class="static"><el-tag type="success">{{dataProcessingValue}}</el-tag></div>
    </div>
    <div style="font-size:14px">
      问题类型(不可编辑)：
      <div class="static"><el-tag type="warning">{{problemValue}}</el-tag></div>
    </div>
    <div style="font-size:14px">
      求解器(算法)：
      <div class="static"><el-tag type="danger">{{algorithmValue}}</el-tag></div>
    </div>
    <el-button type="info" @click="projectSettingclick" style="width: 200px;position:relative;left:0px;margin: 20px 0;">项目配置</el-button>
    </div>
    <el-dialog :visible.sync="projectConfiguration" title="项目配置" >      
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="数据源配置" name="first">
          <div style="height:300px">
            <span>数据源选择:</span>
            <el-select v-model="dataSourceValue" value="选项1">
              <el-option
                v-for="item in dataSourceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="height: 200px" v-if="dataSourceValue==='选项1'">
              <p>Base power:</p>
              <el-input></el-input>
              <p>Frequency:</p>
              <el-input></el-input>
            </div>
            <div style="height: 250px;border: 1px solid;position:relative;top:5px;" v-else></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据处理" name="second">
          <div style="height:300px">
            <span>数据处理方法选择:</span>
            <el-select v-model="dataProcessingValue">
              <el-option
                v-for="item in dataProcessingOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-tab-pane>
        <el-tab-pane label="问题配置" name="third">
          <div style="width: 350px;margin: 0 auto;">
            <el-form label-width="120px">
              <el-form-item label="问题选择:">
                <el-select v-model="problemValue"  @change="problemchange(problemValue)">
                  <el-option
                    v-for="item in problemOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="求解器:">
                <el-select v-model="algorithmValue"  @change="solverchange(algorithmValue)">
                  <el-option
                    v-for="item in algorithmOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div style="top:5px;" v-if="algorithmValue=='LACPF'">
              <el-form label-width="120px">
                <el-form-item label="verbose:">
                  <el-select v-model="verboseValue"  @change="verbosechange(verboseValue)">
                    <el-option label="True" value="True"></el-option>
                    <el-option label="Flase" value="Flase"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="tolerance:">
                  <el-input v-model="toleranceValue"  @change="tolerancechange(toleranceValue)" style="width:217px">
                  </el-input>
                </el-form-item>
                <el-form-item label="max_iter:">
                  <el-input v-model="max_iterValue"  @change="max_iterchange(max_iterValue)"  style="width:217px">
                </el-input>
                </el-form-item>
                <el-form-item label="control_q:">
                  <el-select v-model="control_qValue"  @change="control_qchange(control_qValue)">
                    <el-option label="True" value="True"></el-option>
                    <el-option label="Flase" value="Flase"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div style="top:5px;" v-if="algorithmValue=='Simple_OPF'">
              <el-form label-width="120px">
                <el-form-item label="verbose:">
                  <el-select v-model="verboseValue"  @change="verbosechange(verboseValue)">
                    <el-option label="True" value="True"></el-option>
                    <el-option label="Flase" value="Flase"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="tolerance:">
                  <el-input v-model="toleranceValue"  @change="tolerancechange(toleranceValue)" style="width:217px">
                  </el-input>
                </el-form-item>
                <el-form-item label="lodf_tolerance:">
                  <el-input v-model="lodf_toleranceValue"  @change="lodf_tolerancechange(lodf_toleranceValue)"  style="width:217px">
                </el-input>
                </el-form-item>
                <el-form-item label="max_iter:">
                  <el-input v-model="max_iterValue"  @change="max_iterchange(max_iterValue)"  style="width:217px">
                </el-input>
                </el-form-item>
                <el-form-item label="control_q:">
                  <el-select v-model="control_qValue"  @change="control_qchange(control_qValue)">
                    <el-option label="True" value="True"></el-option>
                    <el-option label="Flase" value="Flase"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer">
        <el-button type="primary" @click="handelConfigurationConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectConfiguration:false,     //项目配置弹窗可见
      activeName: 'first',      //项目配置列表（数据源配置、数据处理、问题配置）
      dataSourceOptions: [{     //数据源配置选项
          value: '静态数据源',
          label: '静态数据源'
        }, {
          value: '实时数据源',
          label: '实时数据源'
        }],
      dataSourceValue:"静态数据源",     //数据源配置选择
      dataProcessingOptions: [{     //数据处理方法选项
          value: '数据滤波',
          label: '数据滤波'
        }, {
          value: '异常值处理',
          label: '异常值处理'
        }],
      dataProcessingValue:"数据滤波",     //数据处理方法选择
      problemOptions: [{     //问题选项
          value: 'Powerflow',
          label: 'Powerflow'
        },{
          value: 'OptimalPowerflow',
          label: 'OptimalPowerflow'
        },
      ],
      problemValue:"Powerflow",     //问题选择
      algorithmOptions: [{     //算法选项
          value: 'Simple_OPF',
          label: 'Simple_OPF'
        }, {
          value: '选项2',
          label: '算法2'
        }],
      algorithmValue:"LACPF",     //算法选择
      verboseValue:'True',
      toleranceValue: '1.0',
      lodf_toleranceValue:'0.001',
      max_iterValue:'25',
      control_qValue:'True',
      Setting_form:{
        name: 'aaa项目',
        description: ''
      },
      // dataSource:"仅展示信息，不可编辑",      //数据源
      // dataProcessing:"仅展示信息，不可编辑",      //数据处理
      // programType:"仅展示信息，不可编辑",       //问题类型
      // algorithm:"仅展示信息，不可编辑",     //求解器(算法)
    }
  },
  created(){
    this.getMethodslist()
  },
  methods: {
    async getMethodslist() {
      // 像后端发起get获取列表
      const { data: res} = await this.$http.get('http://127.0.0.1:5000/algorithm')
      // console.log(res)
      let resdata = []
      let value = ''
      res.forEach((item)=>{
        value=item.name
        resdata.push({'value':value,'label':value})
        
      })
      this.algorithmOptions=resdata
    },
    projectSettingclick(){
      this.projectConfiguration=true
      this.getMethodslist()
    },
    async handelConfigurationConfirm() {      //项目配置确认函数
      this.projectConfiguration=false
    },
    handleClick(tab, event) {     //切换项目配置弹窗标签
      // console.log(tab, event);
    },
    problemchange(problemValue) {//问题更新到vuex
      this.$store.commit('change_problemValue',problemValue)
      // console.log(this.$store.state.problemValue)
    },
    solverchange(algorithmValue) {//求解器更新到vuex
      this.$store.commit('solverchange',algorithmValue)
      // console.log(this.$store.state.algorithmValue)
    },
    verbosechange(verboseValue) {//求解器更新到vuex
      this.$store.commit('verbosechange',verboseValue)
      // console.log(this.$store.state.verboseValue)
    },
    tolerancechange(toleranceValue) {//求解器更新到vuex
      this.$store.commit('tolerancechange',toleranceValue)
      // console.log(this.$store.state.toleranceValue)
    },
    lodf_tolerancechange(lodf_toleranceValue){//求解器更新到vuex
      this.$store.commit('lodf_tolerancechange',lodf_toleranceValue)
      // console.log(this.$store.state.lodf_toleranceValue)
    },
    max_iterchange(max_iterValue){//求解器更新到vuex
      this.$store.commit('max_iterchange',max_iterValue)
      // console.log(this.$store.state.lodf_toleranceValue)
    },
    control_qchange(control_qValue){//求解器更新到vuex
      this.$store.commit('control_qchange',control_qValue)
      // console.log(this.$store.state.lodf_toleranceValue)
    }
  }
}
</script>

<style lang="less" scoped>
  .Setting_form {
    width: 200px;
    float: left;
    padding-right: 10px;
    .static{
      background-color: rgb(240, 240, 240);
      padding: 10px 10px;
      margin: 5px 0;
    }
  }

</style>