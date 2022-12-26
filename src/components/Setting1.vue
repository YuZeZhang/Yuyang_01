<template>
  <div class="Setting_form">
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
      <div class="static"><el-tag>{{dataSource}}</el-tag></div>
    </div>
    <div style="font-size:14px">
      数据处理(不可编辑)：
      <div class="static"><el-tag type="success">{{dataProcessing}}</el-tag></div>
    </div>
    <div style="font-size:14px">
      问题类型(不可编辑)：
      <div class="static"><el-tag type="warning">{{programType}}</el-tag></div>
    </div>
    <div style="font-size:14px">
      求解器(算法)：
      <div class="static"><el-tag type="danger">{{algorithm}}</el-tag></div>
    </div>
    <el-button type="info" @click="projectConfiguration=true" style="width: 200px;position:relative;left:0px;margin: 20px 0;">项目配置</el-button>
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
          <div style="height: 300px;">
            <span>问题选择:</span>
            <el-select v-model="problemValue">
              <el-option
                v-for="item in problemOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <p></p>
            <span>算法选择:</span>
            <el-select v-model="algorithmValue">
              <el-option
                v-for="item in algorithmOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="height:195px;border:1px solid;position:relative;top:5px;"></div>
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
          value: '选项1',
          label: '静态数据源'
        }, {
          value: '选项2',
          label: '实时数据源'
        }],
      dataSourceValue:"选项1",     //数据源配置选择
      dataProcessingOptions: [{     //数据处理方法选项
          value: '选项1',
          label: '数据滤波'
        }, {
          value: '选项2',
          label: '异常值处理'
        }],
      dataProcessingValue:"选项1",     //数据处理方法选择
      problemOptions: [{     //问题选项
          value: '选项1',
          label: '问题1'
        }, {
          value: '选项2',
          label: '问题2'
        }],
      problemValue:"选项1",     //问题选择
      algorithmOptions: [{     //算法选项
          value: '选项1',
          label: '算法1'
        }, {
          value: '选项2',
          label: '算法2'
        }],
      algorithmValue:"选项1",     //算法选择
      Setting_form:{
        name: 'aaa项目',
        description: ''
      },
      dataSource:"仅展示信息，不可编辑",      //数据源
      dataProcessing:"仅展示信息，不可编辑",      //数据处理
      programType:"仅展示信息，不可编辑",       //问题类型
      algorithm:"仅展示信息，不可编辑",     //求解器(算法)
    }
  },
  methods: {
    async handelConfigurationConfirm() {      //项目配置确认函数
      this.projectConfiguration=false
    },
    handleClick(tab, event) {     //切换项目配置弹窗标签
      // console.log(tab, event);
    }
  }
}
</script>

<style lang="less" scoped>
  .Setting_form {
    width: 200px;
    float: left;
    .static{
      background-color: rgb(240, 240, 240);
      padding: 10px 10px;
      margin: 5px 0;
    }
  }

</style>