import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['@/pages/trip/index'], resolve);
const Preview = resolve => require(['@/pages/trip/preview'], resolve);
const Detail = resolve => require(['@/pages/trip/detail'], resolve);
const Diray = resolve => require(['@/pages/trip/diray'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path:'/preview/:travelId',
      name:'preview',
      component:Preview,
      meta:{
        KeepAlive:true
      }
    },
    {
      path:'/detail/:poiId',
      name:'detail',
      component:Detail
    },{
      path:'/diray/:dayId',
      name:'diray',
      component:Diray
    }
  ]
})
