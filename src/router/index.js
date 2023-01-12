import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
// import Home from '../components/Home.vue'
import Setting from '../components/Setting.vue'
// import Index from '../components/index.vue'
// import Methods from '../components/Setting_button.vue'
import Last from '../components/Last.vue'
import Canvas from '../components/Canvas.vue'
// import Desktop from '../components/Desktop.vue'
import Sensuolan from '../components/Shensuolan.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/',redirect: 'login'},
    { path: '/login', component: Login,  meta: {title: '登录'}},
    { path: '/register', component: Register, meta: {title: '注册'}},
    { path: '/canvas',component: Canvas, meta: {title:'画布'}},
    { path: '/last', component: Last, meta: {title: '最终版本'},
      redirect: '/desktop',
      children:[
      {
        path:'/desktop',
        name:'desktop',
        component:Sensuolan,
        meta: {title: '主页'}
      },
      {
        path:'/model2',
        name:'model2',
        component:()=>import("../components/Model2.vue"),
        children:[{
          path:'/bus',
          name:'bus',
          component:()=>import("../components/parts/Bus.vue")
        },
        {
          path:'/area',
          name:'area',
          component:()=>import("../components/parts/Area.vue")
      },
      {
          path:'/zone',
          name:'zone',
          component:()=>import("../components/parts/Zone.vue")
      },
      {
          path:'/country',
          name:'country',
          component:()=>import("../components/parts/Country.vue")
      },
      {
          path:'/sub',
          name:"substation",
          component:()=>import("../components/parts/Substation.vue")
      },
      {
          path:'/load',
          name:"load",
          component:()=>import("../components/parts/Load.vue")
      },
      {
          path:'/static',
          name:"static",
          component:()=>import("../components/parts/StaticGenertor.vue")
      },
      {
          path:'/grid',
          name:"grid",
          component:()=>import("../components/parts/Grid.vue")
      },
      {
          path:'/generator',
          name:"generator",
          component:()=>import("../components/parts/Genertor.vue")
      },
      {
          path:'/battery',
          name:"battery",
          component:()=>import("../components/parts/Battery.vue")
      },
      {
          path:'/shunt',
          name:"shunt",
          component:()=>import("../components/parts/Shunt.vue")
      },
      {
          path:'/line',
          name:"line",
          component:()=>import("../components/parts/Line.vue")
      },
      {
          path:'/dc',
          name:"dc",
          component:()=>import("../components/parts/Dc.vue")
      },
      {
          path:'/tran',
          name:"tran",
          component:()=>import("../components/parts/Transformer.vue")
      },
      {
          path:'/trans',
          name:"trans",
          component:()=>import("../components/parts/Transformer3.vue")
      },
      {
          path:'/hcl',
          name:"hcl",
          component:()=>import("../components/parts/Hvdc.vue")
      },
      {
          path:'/upfc',
          name:"upfc",
          component:()=>import("../components/parts/Upfc.vue")
      },
      {
          path:'/vsc',
          name:"vsc",
          component:()=>import("../components/parts/Vsc.vue")
      }
        ],
        meta: {title: '表格'}
      },
      ]}
  ]
})

// 挂载路由导航守卫
// 跳转验证token
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数,表示放行
  // next() 放行 next('/login') 强制跳转
  if (to.path === '/login') return next()
  if (to.path === '/register') return next()
  // 获取token
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/login')
  next()
})

// 跳转修改title
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
      document.title = to.meta.title;
  }
  next();
})

export default router
