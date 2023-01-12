import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    problemValue: 'Powerflow',
    algorithmValue: 'LACPF',
    verboseValue: 'True',
    toleranceValue: '1.0',
    lodf_toleranceValue: '0.001',
    max_iterValue:'25',
    control_qValue:'True',
    bus:[],
    // algorithmOptions:[{     //算法选项
    //   value: 'Simple_OPF',
    //   label: 'Simple_OPF'
    // }, {
    //   value: '选项2',
    //   label: '算法2'
    // }]
  },
  getters: {
  },
  mutations: {
    change_problemValue(state,problemValue) {
      // 变更状态
      state.problemValue=problemValue
    },
    solverchange(state,algorithmValue){
      // 变更状态
      state.algorithmValue=algorithmValue
    },
    verbosechange(state,verboseValue) {
      // 变更状态
      state.verboseValue=verboseValue
    },
    tolerancechange(state,toleranceValue){
      // 变更状态
      state.toleranceValue=toleranceValue
    },
    lodf_tolerancechange(state,lodf_toleranceValue){
      // 变更状态
      state.lodf_toleranceValue=lodf_toleranceValue
    },
    max_iterchange(state,max_iterValue){
      // 变更状态
      state.max_iterValue=max_iterValue
    },
    control_qchange(state,control_qValue){
      // 变更状态
      state.control_qValue=control_qValue
    },
    busaddobj(state,objdata){
      // 传递对象，添加新数据
      state.bus=objdata
    }
    // algorithmOptionschange(state,algorithmOptions){
    //   state.algorithmOptions=algorithmOptions
    // }
  },
  actions: {
  },
  modules: {
  }
})
