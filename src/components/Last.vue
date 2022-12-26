<template>
  <el-container class="container">
  <el-header class="header_top">
    <el-dropdown @command="menuCommand" class="dropdown">
        <el-button type="text" class="button_top">文件</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">新建项目</el-dropdown-item>
          <el-dropdown-item command="b">打开文件</el-dropdown-item>
          <el-dropdown-item command="c">保存</el-dropdown-item>
          <el-dropdown-item command="d">另存为</el-dropdown-item>
          <el-dropdown-item command="e">导入模型</el-dropdown-item>
          <el-dropdown-item command="f">导出模型图</el-dropdown-item>
          <el-dropdown-item command="g">导出结果</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="helpCommand" class="dropdown">
        <el-button type="text" class="button_top">帮助</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">在线文档</el-dropdown-item>
          <el-dropdown-item command="b">关于</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown  class="dropdown">
        <el-button type="text" class="button_top">设置</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">语言</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-popover
    placement="bottom"
    width="200"
    trigger="click">
    <div><img src="../assets/images/avatar.png" class="avatar"><div class="username"> {{showUserName}}</div></div>
    <el-button type="primary" round @click="showUserinfo">用户信息</el-button>
    <el-button type="info" round @click="logout">注销</el-button>
    <el-button slot="reference" type="text" class="button_user button_top iconfont icon-zhanghu">用户---{{showUserName}}</el-button>
      </el-popover>
  </el-header>

  <el-header class="header_second">
    <!--工具栏-->
    <el-button  @click="createProject" type="text" class="button_second">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-xinjian"></use>
    </svg>
    <br></br>
      新建项目
    </el-button>
    <el-button  @click="openProject" type="text" class="button_second">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-shangchuan"></use>
    </svg>
    <br></br>
      上传文件
    </el-button>
    <el-button  @click="saveProject" type="text" class="button_second">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-baocun"></use>
    </svg>
    <br></br>
      保存</el-button>
    <el-button  v-if="!running" @click="changeState" type="text" class="button_second">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-yunhang"></use>
    </svg>
    <br></br>
    运行</el-button>
    <el-button  v-else @click="changeState" type="text" class="button_second">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-daochu1024-16"></use>
    </svg>
    <br></br>
    停止</el-button>
  </el-header>

  <el-main class="main_body">
    <div>
    <el-tabs v-model="activeName_model" type="card">
    <el-tab-pane label="模型" name="model" class="eltabs">
      <!-- 路由占位符 -->
      <router-view></router-view>
    </el-tab-pane>
    <el-tab-pane label="结果" name="result" class="eltabs"><Result></Result></el-tab-pane>
    <el-tab-pane label="日志" name="log" class="eltabs">日志</el-tab-pane>
    <el-tab-pane label="管理" name="manage" class="eltabs">
      <div class="basic_setting_div">
        <div style="margin-bottom: 20px">基本设置</div>
        <el-select v-model="language" placeholder="语言">
          <el-option label="中文" value="中文"></el-option>
        </el-select>
      </div>
      <el-tabs type="border-card" class="basic_setting_tabs">
        <el-tab-pane label="算法管理">
          <!-- 搜索与添加区域 -->
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input placeholder="请输入内容" clearable v-model="methods_search">
              <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="addmethodseditdialogVisible = true">添加算法</el-button>
            </el-col>
          </el-row>
          <!-- 算法列表区域 -->
          <el-table ref="methodstable" :data="methodstable" border>
            <el-table-column prop="name" label="算法名称"></el-table-column>
            <el-table-column prop="description" label="算法描述"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showmethodsEditDialog(scope.row.name)">编辑</el-button>
                <!-- 删除按钮 -->
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeMethodsById(scope.row.name)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    </el-tabs>
    <el-dialog
    title="算法编辑"
    :visible.sync="methodseditdialogVisible"
    >
    </el-dialog>
    <el-dialog 
    title="添加算法" 
    :visible.sync="addmethodseditdialogVisible"
    >
    <!-- 内容主体区域 -->
    <el-form v-model="addmethodsForm" label-width="70px">
      <el-form-item label="算法名称">
        <el-input v-model="addmethodsForm.name"></el-input>
      </el-form-item>
      <el-form-item label="算法描述">
        <el-input v-model="addmethodsForm.description"></el-input>
      </el-form-item>
    </el-form>
     <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
        <el-button @click="addmethodseditdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMethods()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </el-main>

  <!-- dialog专区 -->
  <!-- 用户弹窗 -->
  <el-dialog :visible.sync="userinfodialogVisible" width="1000px">
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <el-form :model="EditinfoForm">
          <el-form-item label="用户名">
            <el-input v-model="EditinfoForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="EditinfoForm.email" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="EditinfoForm.phonenumber" clearable></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="EditinfoForm.newpassword"  show-password clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveEdit">保存修改</el-button>
            <el-button @click="resetEdit">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="权限管理" :disabled="flag">
        <el-tabs type="border-card" class="right_manage">
          <el-tab-pane label="角色组管理">
            <div class="header_usermanage">
              <el-button type="info" icon="el-icon-refresh"></el-button>
              <el-button type="primary" icon="el-icon-plus" @click="addrightclick">添加</el-button>
              <el-button type="warning" icon="el-icon-edit">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete">删除</el-button>
              <el-button icon="el-icon-search" class="search" @click="search_right"></el-button>
              <el-input placeholder="请输入内容" clearable v-model="searchinfo_right"></el-input>
            </div>
            <div class="body_usermanage">
              <!-- 表格 -->
              <tree-table :data="rightlist" :columns="rightcolumns"></tree-table>
              <!-- 分页区域 -->
              <el-pagination
                @size-change="handleSizeChange_rightlist"
                @current-change="handleCurrentChange_rightlist"
                :current-page="rightqueryInfo.pagenum"
                :page-sizes="[3, 5, 10, 15]"
                :page-size="rightqueryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="righttotal">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="会员管理">
            <div class="header_vipmanage">
              <el-button type="info" icon="el-icon-refresh"></el-button>
              <el-button type="primary" icon="el-icon-plus" @click="addvipclick">添加</el-button>
              <el-button type="warning" icon="el-icon-edit">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete">删除</el-button>
              <el-button icon="el-icon-search" class="search"></el-button>
              <el-input placeholder="请输入内容"></el-input>
            </div>
            <div class="body_usermanage">
              <!-- 用户列表 -->
              <el-table :data="userlist" :border="true" stripe>
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" label="ID"></el-table-column>
                <el-table-column label="用户名" prop=""></el-table-column>
                <el-table-column label="分组" prop=""></el-table-column>
                <el-table-column label="头像" prop=""></el-table-column>
                <el-table-column label="邮箱" prop=""></el-table-column>
                <el-table-column label="手机号" prop=""></el-table-column>
                <el-table-column label="最后登录" prop=""></el-table-column>
                <el-table-column label="创建时间" prop=""></el-table-column>
                <el-table-column label="状态" prop=""></el-table-column>
                <el-table-column label="操作" prop=""></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
  <el-dialog title="添加" :visible.sync="adddialogVisible" width="30%">
    <el-form ref="addrightformRef" :model="addrightform">
      <el-form-item label="上级分组" prop="fomerright">
        <el-select v-model="addrightform.fomerright" placeholder="点击选择" style="width:70%">
          <el-option label="超级管理组" value="超级管理组"></el-option>
          <el-option label="一级管理员" value="一级管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组别名称" prop="rightname">
        <el-input v-model="addrightform.rightname" placeholder="请输入组别名称" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="right">
        <el-checkbox-group v-model="addrightform.right">
          <el-checkbox label="权限管理" name="type"></el-checkbox>
          <el-checkbox label="会员管理" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="addrightform.status">
          <el-radio label="禁用" border></el-radio>
          <el-radio label="启用" border></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelright">取 消</el-button>
      <el-button type="primary" @click="addright">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog title="添加" :visible.sync="addvipdialogVisible" width="30%">
    <el-form ref="addvipformRef" :model="addvipform">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addvipform.username" placeholder="请输入用户名" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="分组" prop="group">
        <el-select v-model="addvipform.group" placeholder="点击选择" style="width:70%">
          <el-option label="超级管理组" value="超级管理组"></el-option>
          <el-option label="一级管理员" value="一级管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addvipform.email" placeholder="请输入邮箱" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phonenumber">
        <el-input v-model="addvipform.phonenumber" placeholder="请输入密码" style="width:70%" type="password"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="addvipform.status">
          <el-radio label="禁用" border></el-radio>
          <el-radio label="启用" border></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!--导入文件弹窗-->
  <el-dialog :visible.sync="importFileVisible" title="导入文件">      
      <el-upload 
      action="http://127.0.0.1:8010"
      :file-list="updateFilefileList">
        <span>上传文件：</span>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div slot="footer">
        <el-button @click="importFileVisible=false">取消</el-button>
        <el-button type="primary" @click="handelFileConfirm">确定</el-button>
      </div>
    </el-dialog>
  
  <!--导入模型弹窗-->
  <el-dialog :visible.sync="importModelVisible" title="导入文件">      
    <el-upload 
    action="http://127.0.0.1:8010"
    :file-list="modelList">
    <span>导入模型：</span>
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <div slot="footer">
      <el-button @click="importModelVisible=false">取消</el-button>
      <el-button type="primary" @click="handelModelConfirm">确定</el-button>
    </div>
  </el-dialog>

  <!--项目配置弹窗-->
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
</el-container>
</template>


<script>
import '../assets/fonts/iconfont.js'
import Cookie from 'js-cookie'
import Result from './Result.vue'
export default {
  data() {
    return {
      projectOpening:true,    //是否有项目已打开
      importFileVisible:false,      //导入文件弹窗可见
      importModelVisible:false,     //导入模型弹窗可见
      projectConfiguration:false,     //项目配置弹窗可见
      running:false,      //运行
      rules: {},      //导入文件弹窗数据输入规则
      updateFilefileList: [],     //导入文件列表
      modelList:[],
      projectName:"项目名称(可编辑)",     //项目名称(可编辑)
      nameEdit:false,     //编辑项目名称
      projectDescription:"项目描述(可编辑)",      //项目描述(可编辑)
      descriptionEdit:false,      //编辑项目描述
      dataSource:"仅展示信息，不可编辑",      //数据源
      dataProcessing:"仅展示信息，不可编辑",      //数据处理
      programType:"仅展示信息，不可编辑",       //问题类型
      algorithm:"仅展示信息，不可编辑",     //求解器(算法)
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
      userinfodialogVisible: false,
        adddialogVisible: false,
        addvipdialogVisible: false,
        userinfoForm: {
          username: 'admin',
          email: 'xxx',
          phonenumber:'136xxxx',
          newpassword: 'XXX'
        },
        EditinfoForm: {
          username: 'admin',
          email: 'xxx',
          phonenumber:'136xxxx',
          newpassword: 'XXX'
        },
        // 角色组管理列表
        rightlist: [],
        // 角色组管理列表查询条件
        rightqueryInfo:{
          type:3,
          pagenum:1,
          pagesize:5
        },
        // 总数据条数
        righttotal: 0,
        // table列标签
        rightcolumns: [{
          label: '分类名称',
          prop: 'cat_name'
        }
        // 待补充
        ],
        // 添加角色权限的列表
        addrightform: {
          fomerright: '',
          rightname: '',
          right:[],
          status:''
        },
        // 搜索输入框
        searchinfo_right: '',
        // 用户列表数据
        userlist: [],
        // 添加vip角色的列表
        addvipform: {
          username: '',
          group:[],
          email: '',
          phonenumber: '',
          password: '',
          status: ''
        },
        // 设置功能
        activeName_model: 'model',
        language: '中文',
        methods_search: '',
        methodstable: [],
        methodseditdialogVisible: false,
        addmethodseditdialogVisible: false,
        addmethodsForm: {
          name:'',
          description: ''
        }
    }
  },
  methods: {
    showUserinfo(){
      // 获取角色权限列表
      this.getRightlist()
      this.userinfodialogVisible = true
    },
    saveEdit(){
      this.userinfodialogVisible = false
      this.userinfoForm=this.EditinfoForm
    },
    resetEdit(){
      this.EditinfoForm=this.userinfoForm
    },
    // logout
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    // 获取角色权限列表数据
    async getRightlist() {
      const { data: res } = await this.$http.get('categories', { params :this.rightqueryInfo})
      if(res.meta.status !== 200) {
        console.log(res)
        return this.$message.error('获取列表失败')
      }
      console.log(res.data)
      // 把数据列表,赋值给rightlist
      this.rightlist = res.data.result
      // 为总数据条数赋值
      this.righttotal = res.data.total
    },
    handleSizeChange_rightlist(newSize){
      this.rightqueryInfo.pagesize = newSize
      this.getRightlist()
    },
    handleCurrentChange_rightlist(newPage){
      this.rightqueryInfo.pagenum = newPage
      this.getRightlist()
    },
    addrightclick () {
      this.adddialogVisible= true
    },
    cancelright() {
      this.$refs.addrightformRef.resetFields(),
      this.adddialogVisible=false
    },
    addright() {
      // TODO:像api接口发送post请求，向数据库中添加数据
      adddialogVisible = false
    },
    search_right() {
      // TODO： 先搜索 重新发起列表获取 然后刷新列表
    },
    addvipclick() {
      this.addvipdialogVisible = true
    },
    menuCommand(command){     //菜单选项
      switch(command){
        case "a":this.createProject();break;
        case "b":this.openProject();break;
        case "c":this.saveProject();break;
        case "d":this.saveAs();break;
        case "e":this.importModel();break;
        case "f":this.exportModel();break;
        case "g":this.exportResult();break;
      }
    },
    createProject(){      //新建项目，先判断是否有项目运行，再判断是否新建
      if (this.projectOpening){
        this.$confirm('是否关闭当前项目并新建项目', '项目正在运行', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '新建项目'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '停留在当前项目'
          });          
        });
      }
    },
    openProject(){      //打开文件，先判断是否有项目运行，再判断是否打开文件
      if (this.projectOpening){
        this.$confirm('是否关闭当前项目并打开新项目', '项目正在运行', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '打开新项目'
          });
          this.importFileVisible=true;
          //console.log(this.importFileVisible)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '停留在当前项目'
          });          
        });
      }
    },
    saveProject(){},
    saveAs(){},
    importModel(){
      this.importModelVisible=true
    },
    exportModel(){},
    exportResult(){},
    helpCommand(command){     //帮助选项
      switch(command){
        case "a":this.onlineDocumentation();break;
        case "b":this.versionInformation();break;
      }
    },
    onlineDocumentation(){
      window.open("https://element.eleme.cn/#/zh-CN/component/message-box")
    },
    versionInformation(){
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h(
          'p', null, [
            h('span', null, '当前版本'),
            h('i', null, '。。。')
          ],
          'p', null,[
            h('span', null, '版本更新')
          ]
        ),
        showCancelButton: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
    },
    onClose() {     //导入文件弹窗关闭并清空数据
      this.$refs['elForm'].resetFields()
    },
    handelFileConfirm() {     //导入文件确认函数
      // this.$refs['elForm'].validate(valid => {
      //   if (!valid) return
        console.log(this.updateFilefileList)
        this.importFileVisible=false
      // })
    },
    handelModelConfirm() {     //导入文件确认函数
      // this.$refs['elForm'].validate(valid => {
      //   if (!valid) return
        console.log(this.modelList)
        this.importModelVisible=false
      // })
    },
    changeState(){      //改变项目运行/停止函数
      if(!this.running){
        this.$message({
          message: '项目启动成功！',
          type: 'success'
        });
      } else {
        this.$message({
          message: '项目运行完毕！',
          type: 'success'
        });
      }
      this.running=!this.running
    },
    async handelConfigurationConfirm() {      //项目配置确认函数
      this.projectConfiguration=false
    },
    handleClick(tab, event) {     //切换项目配置弹窗标签
        console.log(tab, event);
    },
    // 算法编辑框
    showmethodsEditDialog (id) {
      this.methodseditdialogVisible = true
      // 根据id发起参数编辑请求
    },
    // 算法删除
    async removeMethodsById(name) {
      // 弹框询问用户是否删除算法
      const confirmResult = await this.$confirm('此操作将永久删除该算法, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果用户确认删除,则返回值为字符串 confirm
      // 如果用户取消删除,则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除!')
      }
      // console.log('确认了删除')
      // const { data: res } = await this.$http.delete(`users/${id}`)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('删除用户失败!')
      // }
      const { data: res } = await this.$http.get('http://127.0.0.1:5000/algorithm/delete',{ params: {"name":name} })
      if(res.success!==0){
        return this.$message.error('删除失败!')
      }
      // console.log(res)
      this.$message.success('删除用户成功!')
      this.getMethodslist()
    },
    async addMethods() {
      // 向后端发起post请求
      const { data: res} = await this.$http.post('http://127.0.0.1:5000/algorithm/add', this.addmethodsForm)
      // console.log(res)
      if(res.success!==0){
        return this.$message.error('添加失败!')
      }
      // console.log(this.addmethodsForm)
      this.$message.success('添加成功!')
      this.addmethodseditdialogVisible = false
      this.getMethodslist()
    },
    async getMethodslist() {
      // 像后端发起get获取列表
      const { data: res} = await this.$http.get('http://127.0.0.1:5000/algorithm')
      // console.log(res)
      this.methodstable = res
    }  
  },
  computed: {
    showUserName() {
      return Cookie.get('username')
    },
    flag () {
      return Cookie.get('username')!=='admin'
    }
  },
  components:{Result},
  created() {
    this.getMethodslist()
  }
}
</script>

<style lang="less" scoped>
.icon {
  width: 30px;
  height: 30px;
  vertical-align: -0.15*30px;
  fill: currentColor;
  overflow: hidden;
}
.button_top {
  height: 50px;
  background-color: #b0acac;
  color: #fff;
  font-size: 16px;
  border-radius: 0px;
  // border-bottom:2px solid rgb(44, 62, 80);
  font-weight: 600;
}
.button_top:focus{
  background-color: #b0acac;
  color: #ffd04b;
  border-radius: 0px;
  border-bottom:2px solid #ffd04b;
}
.button_top:hover{
  background-color: #b0acac;
  color: #ffd04b;
  border-radius: 0px;
  border-bottom:2px solid #ffd04b;
}
.button_second {
  color: rgb(20, 20, 20);
}
.container {
  width: 100%;
  padding: 0 auto;
}
.header_top {
  // border-top: 2px solid;
  // border-left: 2px solid;
  // border-right: 2px solid;
  background-color: #b0acac;
  width: 100%;
  height: 50px !important;
  float: left;
  left: 0px;
  .dropdown{
    float: left;
    left: 10px;
    margin: 0px 30px;
  }
}

.header_second {
  // border-top: 2px solid;
  // border-left: 2px solid;
  // border-right: 2px solid;
  background-color: #f0f0f0;
  width: 100%;
  height: 80px !important;
  float: left;
  left: 0px;
  .el-button {
    float: left;
    margin: 0px 20px;
  }
}
.main_body  {
  // border: 2px solid;
  height: calc(100vh - 130px);
}
#projectConfiguration {
  float: right;
  right: 20px;
  // border: 2px solid;
  width: 200px;
  height: 600px;
  max-height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
  // position: absolute;
  // left: 1160px;
  // top: 100px;
}

#projectConfiguration .project_span {
border: 1px solid;
width: 180px;
max-width: 180px;
max-height: 70px;
position: relative;
left: 10px;
word-wrap: break-word;
}

#projectConfiguration .projectName {
  border: 1px solid;
  width: 180px;
  max-width: 180px;
  height: 54px;
  position: relative;
  top: 10px;
  left: 10px;
  text-align: center;
}

#projectConfiguration .projectDescription {
  border: 1px solid;
  width: 180px;
  max-width: 180px;
  height: 100px;
  max-height: 100px;
  overflow-y: auto;
  position: relative;
  top: 15px;
  left: 10px;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  word-wrap: break-word;
}

#projectConfiguration::-webkit-scrollbar {
  height: 0;
  width: 0;
}

.button_user {
  float: right;
  right: 20px;
}
.avatar {
      width: 28px;
      height: 28px;
      border-radius: 14px;
    }
    .username {
      display: inline;
      height: 20px;
      font-size: 18px;
    }
    .right_manage {
      height: 600px;
      .el-tab-pane {
        height: 500px;
      }
      .header_usermanage {
      .el-button{
        float: left;
      }
      .el-input{
        width: 40%;
        float: right;
      }
      .search {
        float: right;
      }
    }
    .header_vipmanage {
      .el-button{
        float: left;
      }
      .el-input{
        width: 40%;
        float: right;
      }
      .search {
        float: right;
      }
    }
    .body_usermanage{
        position: relative;
        top: 50px;
    }
    }
  .eltabs {
    // height: 80vh;
  }
  .basic_setting_div {
    float: left;
    // border: 2px solid;
    width: 15%;
    height: 90%;
    max-height: 90%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .basic_setting_tabs{
    float: right;
    width: 82%;
    height: 90%;
  }
</style>
