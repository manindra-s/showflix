import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Details from '@/views/Details'
import PageNotFound from '@/views/PageNotFound'

Vue.use(VueRouter)

const routes = [
  {path: '/', name:'Home', component: Home},
  {path: '/details/:showId', name: 'Details', component: Details},
  {path: '*', name:'PageNotFound', component: PageNotFound}
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }}
})


export default router;