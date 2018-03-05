import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/v-body/v-goods'
import ratings from '../components/v-body/v-ratings'
import seller from '../components/v-body/v-seller'
Vue.use(Router)

export default new Router({
  // mode:"history",
  routes: [
    {
      path:"/",
      redirect:{name:"goods"}
    },
    {
     name:"goods",
      path: '/goods',
      component:goods
    },
    {
      path: '/ratings',
      component:ratings

    },
    {
      path: '/seller',
      component:seller
    }
  ]
})
